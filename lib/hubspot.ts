/*
 * hubspot.ts (Aug 3 2026 — GHL ONLY, dual-write removed)
 *
 * Every website form still imports { upsertHubSpotContact } from this file —
 * that contract is unchanged (file name is historical). HubSpot is RETIRED:
 * leads are written ONLY to GoHighLevel (lib/ghl.ts), the system of record.
 *
 * The v29 dual-write safety net (lib/hubspot-legacy.ts) is no longer called.
 * hubspot-legacy.ts can be deleted at final HubSpot account closure.
 */

import { upsertGHLContact, type CrmLead } from "./ghl"

export type HubSpotLead = CrmLead

export async function upsertHubSpotContact(lead: HubSpotLead): Promise<void> {
  // Never throws; always await (Vercel lambdas freeze fire-and-forget work).
  await upsertGHLContact(lead)
}
