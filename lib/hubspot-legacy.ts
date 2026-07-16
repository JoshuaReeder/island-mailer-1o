/*
 * hubspot.ts (v21 + v23) — shared HubSpot contact upsert for all lead forms,
 * plus v23 auto-deal creation for advertiser-intent forms (doc 12 automation).
 * A1 (form → CRM) implemented on HubSpot while GHL is not yet activated.
 * WHEN GHL GOES LIVE: swap the fetch below for the GHL contacts endpoint (or
 * add it alongside) — every caller passes the same normalized payload.
 *
 * Never throws; always non-blocking for the caller (fire and .catch inside).
 * Custom properties (im_form / im_island / im_area / im_notes) must exist as
 * single-line text contact properties in HubSpot. If they're missing, the
 * upsert automatically retries with standard properties only, so the contact
 * ALWAYS lands.
 */

export interface HubSpotLead {
  email: string
  name?: string
  phone?: string
  company?: string
  /** Which form: "Waitlist" | "Advertiser Contact" | "Mailing List" | "Nomination" | "Local Rep" | "Pricing Reveal" | "Advertiser Intake" */
  form: string
  island?: string
  area?: string
  /** v24: resident home ZIP — lands in HubSpot standard `zip` (Postal Code) for segmentation */
  zip?: string
  notes?: string
  /** lifecyclestage: "subscriber" for residents, "lead" (default) for businesses, "opportunity" for intake */
  lifecycle?: string
  /**
   * v23 (doc 12): also create a deal in the advertiser pipeline, stage
   * "New Lead" (internal id appointmentscheduled), associated to the contact.
   * ONLY set true for advertiser-intent forms (Advertiser Intake + Advertiser
   * Contact). Dedup-safe: skipped if the contact already has an open deal.
   */
  createDeal?: boolean
}

/** Advertiser pipeline stage ids (audited Jul 6 2026 — see doc 12) */
const DEAL_STAGE_NEW_LEAD = "appointmentscheduled" // labeled "New Lead"
const CLOSED_STAGES = new Set(["closedlost", "closedwon"])

async function ensureDealForContact(token: string, contactId: string, lead: HubSpotLead): Promise<void> {
  const auth = { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
  try {
    // Dedup: does this contact already have an OPEN deal?
    const assocRes = await fetch(
      `https://api.hubapi.com/crm/v4/objects/contacts/${contactId}/associations/deals?limit=100`,
      { headers: auth }
    )
    if (assocRes.ok) {
      const assoc = (await assocRes.json()) as { results?: { toObjectId: number }[] }
      const dealIds = (assoc.results ?? []).map((r) => String(r.toObjectId))
      if (dealIds.length > 0) {
        const readRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals/batch/read", {
          method: "POST",
          headers: auth,
          body: JSON.stringify({ inputs: dealIds.map((id) => ({ id })), properties: ["dealstage"] }),
        })
        if (readRes.ok) {
          const deals = (await readRes.json()) as { results?: { properties?: { dealstage?: string } }[] }
          const hasOpen = (deals.results ?? []).some(
            (d) => d.properties?.dealstage && !CLOSED_STAGES.has(d.properties.dealstage)
          )
          if (hasOpen) {
            console.log("[island-mailer] Deal skipped — contact already has an open deal:", lead.email)
            return
          }
        }
      }
    }

    // Create the deal in "New Lead", associated to the contact (deal→contact typeId 3)
    const dealName = `${lead.company || lead.name || lead.email} — Website ${lead.form}`
    const createRes = await fetch("https://api.hubapi.com/crm/v3/objects/deals", {
      method: "POST",
      headers: auth,
      body: JSON.stringify({
        properties: {
          dealname: dealName.slice(0, 250),
          dealstage: DEAL_STAGE_NEW_LEAD,
          pipeline: "default",
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
          },
        ],
      }),
    })
    if (createRes.ok) {
      console.log(`[island-mailer] Deal created in New Lead (${lead.form}):`, dealName)
    } else {
      console.error("[island-mailer] Deal creation failed:", await createRes.text())
    }
  } catch (err) {
    console.error("[island-mailer] Deal creation error (non-fatal):", err)
  }
}

export async function upsertHubSpotContact(lead: HubSpotLead): Promise<void> {
  const token = process.env.HUBSPOT_API_KEY
  if (!token || !lead.email) return

  const nameParts = String(lead.name ?? "").trim().split(/\s+/)
  const firstname = nameParts[0] ?? ""
  const lastname = nameParts.slice(1).join(" ")

  const standard: Record<string, string> = {
    email: lead.email,
    ...(firstname && { firstname }),
    ...(lastname && { lastname }),
    ...(lead.phone && { phone: lead.phone }),
    ...(lead.company && { company: lead.company }),
    ...(lead.zip && { zip: lead.zip }),
    hs_lead_status: "NEW",
    lifecyclestage: lead.lifecycle ?? "lead",
  }
  const custom: Record<string, string> = {
    im_form: lead.form,
    ...(lead.island && { im_island: lead.island }),
    ...(lead.area && { im_area: lead.area }),
    ...(lead.notes && { im_notes: lead.notes.slice(0, 500) }),
  }

  const send = async (properties: Record<string, string>) =>
    fetch("https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inputs: [{ idProperty: "email", id: lead.email, properties }],
      }),
    })

  try {
    let contactId: string | undefined
    let res = await send({ ...standard, ...custom })
    if (!res.ok) {
      const text = await res.text()
      if (text.includes("PROPERTY_DOESNT_EXIST") || text.includes("does not exist")) {
        // Custom props missing in this portal — land the contact with standard props.
        res = await send(standard)
        if (!res.ok) console.error("[island-mailer] HubSpot upsert failed (standard):", await res.text())
        else {
          console.log("[island-mailer] HubSpot upserted (standard props only):", lead.email)
          contactId = await extractContactId(res)
        }
      } else {
        console.error("[island-mailer] HubSpot upsert failed:", text)
      }
    } else {
      console.log(`[island-mailer] HubSpot upserted (${lead.form}):`, lead.email)
      contactId = await extractContactId(res)
    }

    // v23: advertiser-intent forms also create a pipeline deal (dedup-safe)
    if (lead.createDeal && contactId) {
      await ensureDealForContact(token, contactId, lead)
    }
  } catch (err) {
    console.error("[island-mailer] HubSpot upsert error (non-fatal):", err)
  }
}

async function extractContactId(res: Response): Promise<string | undefined> {
  try {
    const json = (await res.json()) as { results?: { id?: string }[] }
    return json.results?.[0]?.id
  } catch {
    return undefined
  }
}
