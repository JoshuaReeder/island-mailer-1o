/*
 * ghl.ts (v29 — GHL cutover, doc 18 Phase 4) — GoHighLevel contact upsert +
 * dedup-safe opportunity creation for all website lead forms.
 *
 * Mirrors the lib/hubspot.ts contract exactly: never throws, always resolves,
 * gracefully degrades (missing custom fields are skipped, tags carry the
 * segmentation as a fallback, a failed opportunity never blocks the contact).
 *
 * Runtime-resolved IDs (nothing hardcoded except env):
 *   - Pipeline: first stage (by position) of the pipeline whose name contains
 *     "Advertiser Sales" → new advertiser leads land in stage 1 of the
 *     8-stage "Island Mailer – Advertiser Sales" pipeline.
 *   - Custom fields: im_form / im_island / im_area / im_notes matched by
 *     fieldKey/name suffix via the customFields API; unresolved ones are
 *     dropped (values still reach GHL via tags).
 *
 * Env (Vercel): GHL_API_KEY (Private Integration token, scopes: contacts r/w,
 * opportunities r/w, customFields read) + GHL_LOCATION_ID.
 */

export interface CrmLead {
  email: string
  name?: string
  phone?: string
  company?: string
  form: string
  island?: string
  area?: string
  zip?: string
  notes?: string
  lifecycle?: string
  createDeal?: boolean
}

const API = "https://services.leadconnectorhq.com"
const VERSION = "2021-07-28"

function creds(): { token: string; locationId: string } | null {
  const token = process.env.GHL_API_KEY
  const locationId = process.env.GHL_LOCATION_ID
  if (!token || !locationId) return null
  return { token, locationId }
}

async function ghl<T>(token: string, path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Version: VERSION,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init?.headers ?? {}),
      },
    })
    if (!res.ok) {
      console.error(`[ghl] ${init?.method ?? "GET"} ${path} -> ${res.status}: ${(await res.text()).slice(0, 300)}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`[ghl] ${path} failed:`, err)
    return null
  }
}

/* ---------- runtime ID resolution (cached per lambda instance) ---------- */

let stageCache: { pipelineId: string; stageId: string } | null | undefined

async function advertiserNewLeadStage(token: string, locationId: string) {
  if (stageCache !== undefined) return stageCache
  type Pipelines = { pipelines?: { id: string; name: string; stages?: { id: string; name: string; position?: number }[] }[] }
  const data = await ghl<Pipelines>(token, `/opportunities/pipelines?locationId=${locationId}`)
  const pipeline = data?.pipelines?.find((p) => p.name.toLowerCase().includes("advertiser sales"))
  const first = pipeline?.stages?.slice().sort((a, b) => (a.position ?? 0) - (b.position ?? 0))[0]
  stageCache = pipeline && first ? { pipelineId: pipeline.id, stageId: first.id } : null
  if (!stageCache) console.error("[ghl] Advertiser Sales pipeline / first stage not found")
  return stageCache
}

let fieldCache: Record<string, string> | null | undefined

async function imFieldIds(token: string, locationId: string): Promise<Record<string, string>> {
  if (fieldCache !== undefined) return fieldCache ?? {}
  type Fields = { customFields?: { id: string; name?: string; fieldKey?: string }[] }
  const data = await ghl<Fields>(token, `/locations/${locationId}/customFields?model=contact`)
  const map: Record<string, string> = {}
  for (const want of ["im_form", "im_island", "im_area", "im_notes"]) {
    const hit = data?.customFields?.find(
      (f) => f.fieldKey?.toLowerCase().endsWith(want) || f.name?.toLowerCase().replace(/\s+/g, "_") === want
    )
    if (hit) map[want] = hit.id
  }
  fieldCache = map
  return map
}

/* ---------- opportunity (dedup-safe, mirrors v23 deal logic) ---------- */

async function ensureOpportunityForContact(token: string, locationId: string, contactId: string, lead: CrmLead) {
  try {
    type Search = { opportunities?: { id: string }[] }
    const existing = await ghl<Search>(
      token,
      `/opportunities/search?location_id=${locationId}&contact_id=${contactId}&status=open`
    )
    if ((existing?.opportunities?.length ?? 0) > 0) return // already has an open opportunity

    const stage = await advertiserNewLeadStage(token, locationId)
    if (!stage) return

    const who = lead.company || lead.name || lead.email
    await ghl(token, `/opportunities/`, {
      method: "POST",
      body: JSON.stringify({
        locationId,
        pipelineId: stage.pipelineId,
        pipelineStageId: stage.stageId,
        contactId,
        status: "open",
        name: `${who} — Website ${lead.form}`,
      }),
    })
  } catch (err) {
    console.error("[ghl] ensureOpportunityForContact failed:", err)
  }
}

/* ---------- main entry: contact upsert ---------- */

function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

export async function upsertGHLContact(lead: CrmLead): Promise<void> {
  const c = creds()
  if (!c) return
  try {
    const [firstName, ...rest] = (lead.name ?? "").trim().split(/\s+/)
    const fields = await imFieldIds(c.token, c.locationId)
    const customFields = (
      [
        ["im_form", lead.form],
        ["im_island", lead.island],
        ["im_area", lead.area],
        ["im_notes", lead.notes],
      ] as const
    )
      .filter(([k, v]) => v && fields[k])
      .map(([k, v]) => ({ id: fields[k], field_value: v as string }))

    const tags = ["website", `form-${slug(lead.form)}`]
    if (lead.area) tags.push(`area-${slug(lead.area)}`)
    if (lead.island) tags.push(`island-${slug(lead.island)}`)
    if (lead.lifecycle === "subscriber") tags.push("resident-subscriber")

    type Upsert = { contact?: { id?: string }; id?: string }
    const res = await ghl<Upsert>(c.token, `/contacts/upsert`, {
      method: "POST",
      body: JSON.stringify({
        locationId: c.locationId,
        email: lead.email,
        ...(firstName && { firstName }),
        ...(rest.length > 0 && { lastName: rest.join(" ") }),
        ...(lead.phone && { phone: lead.phone }),
        ...(lead.company && { companyName: lead.company }),
        ...(lead.zip && { postalCode: lead.zip }),
        tags,
        ...(customFields.length > 0 && { customFields }),
        source: "islandmailer.com",
      }),
    })

    const contactId = res?.contact?.id ?? res?.id
    if (lead.createDeal && contactId) {
      await ensureOpportunityForContact(c.token, c.locationId, contactId, lead)
    }
  } catch (err) {
    console.error("[ghl] upsertGHLContact failed:", err)
  }
}
