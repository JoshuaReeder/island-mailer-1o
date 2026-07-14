/*
 * v27.2 — Auto-rolling issue month. No more hand-editing "July 2026".
 * Rule: the "current issue" is the mailer being reserved/dropped next —
 * today + 21 days (covers the drop-at-month-end cycle), Hawaii time.
 * Pages using this should set `export const revalidate = 86400` so the
 * label rolls over automatically without a deploy.
 */
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

export function currentIssueMonth(): { name: string; year: number; label: string } {
  // Hawaii is UTC-10, no DST
  const hstNow = Date.now() - 10 * 3600 * 1000
  const d = new Date(hstNow + 21 * 24 * 3600 * 1000)
  const name = MONTHS[d.getUTCMonth()]
  const year = d.getUTCFullYear()
  return { name, year, label: `${name} ${year}` }
}
