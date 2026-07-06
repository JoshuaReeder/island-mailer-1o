/*
 * hubspot.ts (v21) — shared HubSpot contact upsert for all lead forms.
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
  notes?: string
  /** lifecyclestage: "subscriber" for residents, "lead" (default) for businesses, "opportunity" for intake */
  lifecycle?: string
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
    let res = await send({ ...standard, ...custom })
    if (!res.ok) {
      const text = await res.text()
      if (text.includes("PROPERTY_DOESNT_EXIST") || text.includes("does not exist")) {
        // Custom props missing in this portal — land the contact with standard props.
        res = await send(standard)
        if (!res.ok) console.error("[island-mailer] HubSpot upsert failed (standard):", await res.text())
        else console.log("[island-mailer] HubSpot upserted (standard props only):", lead.email)
      } else {
        console.error("[island-mailer] HubSpot upsert failed:", text)
      }
    } else {
      console.log(`[island-mailer] HubSpot upserted (${lead.form}):`, lead.email)
    }
  } catch (err) {
    console.error("[island-mailer] HubSpot upsert error (non-fatal):", err)
  }
}
