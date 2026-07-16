/*
 * hubspot.ts (v29 — GHL cutover shim, doc 18 Phase 4)
 *
 * Every website form still imports { upsertHubSpotContact } from this file —
 * that contract is unchanged. During the HubSpot → GoHighLevel transition this
 * shim DUAL-WRITES every lead:
 *   1. GoHighLevel (lib/ghl.ts) — the new system of record
 *   2. Legacy HubSpot (lib/hubspot-legacy.ts) — safety net, zero lead loss
 *
 * Phase 5 (after GHL verification window): delete the legacy call + file,
 * or simply revert this file to cut back to HubSpot instantly.
 */

import { upsertGHLContact, type CrmLead } from "./ghl"
import { upsertHubSpotContact as legacyHubSpotUpsert } from "./hubspot-legacy"

export type HubSpotLead = CrmLead

export async function upsertHubSpotContact(lead: HubSpotLead): Promise<void> {
  // Both implementations never throw; run in parallel, await both (Vercel
  // lambdas freeze fire-and-forget work — v23 lesson, always await).
  await Promise.all([upsertGHLContact(lead), legacyHubSpotUpsert(lead)])
}
