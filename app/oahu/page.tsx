import type { Metadata } from "next"
import IslandHub from "@/components/island-hub"
import { islandConfigs, oahuAreas } from "@/lib/area-data"

const config = islandConfigs["oahu"]
const areas = config.areaSlugs.map((s) => oahuAreas[s])

export const metadata: Metadata = {
  title: config.hubTitle,
  description: config.hubMetaDesc,
}

/* Oahu ≈ diagonal (SW–NE) rounded shape, north up. Regions placed to match real
   geography: North Shore (top/NW), Windward (right/E coast), Honolulu (south),
   Leeward (left/SW), Central (middle). */
const OahuMap = (
  <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of Oahu divided into five Island Mailer areas">
    <ellipse cx="450" cy="305" rx="400" ry="245" fill="rgba(22,66,104,.25)" />
    {/* Oahu silhouette: NW point (Kaena), broad north coast, Windward bulge on the
        east, narrowing to a southern tail toward Diamond Head / Koko Head */}
    <path
      d="M 180,210
         C 230,168 300,150 372,156
         C 470,164 560,150 640,170
         C 712,188 760,232 760,288
         C 760,338 728,378 686,406
         C 650,430 632,460 626,498
         C 620,528 596,548 562,544
         C 520,538 492,508 470,472
         C 452,442 426,424 388,420
         C 322,414 256,396 210,356
         C 168,320 150,272 158,240
         C 162,226 170,218 180,210 Z"
      fill="rgba(163,124,79,.10)"
      stroke="#C29A63"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <g stroke="#A37C4F" strokeWidth="1.8" strokeDasharray="7 9" fill="none" opacity=".85">
      <path d="M 250,230 C 360,210 470,210 600,212" />
      <path d="M 430,300 C 520,300 610,320 690,360" />
      <path d="M 360,330 C 420,360 470,400 520,470" />
      <path d="M 300,300 C 280,340 270,380 280,410" />
    </g>
    {/* NORTH SHORE (top / NW) */}
    <a href="/north-shore-oahu-advertising" aria-label="North Shore - Oahu">
      <ellipse className="hot" cx="400" cy="205" rx="180" ry="46" />
      <circle className="pin" cx="400" cy="178" r="5" />
      <text className="lbl" x="400" y="208">North Shore</text>
      <text className="sub" x="400" y="232">HALEIWA · KAHUKU</text>
    </a>
    {/* WINDWARD (right / east coast) */}
    <a href="/windward-oahu-advertising" aria-label="Windward - Oahu">
      <ellipse className="hot" cx="650" cy="305" rx="92" ry="92" />
      <circle className="pin" cx="650" cy="258" r="5" />
      <text className="lbl" x="650" y="305">Windward</text>
      <text className="sub" x="650" y="329">KAILUA · KANEOHE</text>
    </a>
    {/* CENTRAL (middle) */}
    <a href="/central-oahu-advertising" aria-label="Central - Oahu">
      <ellipse className="hot" cx="420" cy="310" rx="86" ry="66" />
      <circle className="pin" cx="420" cy="270" r="5" />
      <text className="lbl" x="420" y="312">Central</text>
      <text className="sub" x="420" y="336">MILILANI · WAHIAWA</text>
    </a>
    {/* LEEWARD (left / SW) */}
    <a href="/leeward-oahu-advertising" aria-label="Leeward - Oahu">
      <ellipse className="hot" cx="248" cy="320" rx="80" ry="78" />
      <circle className="pin" cx="248" cy="276" r="5" />
      <text className="lbl" x="248" y="322">Leeward</text>
      <text className="sub" x="248" y="346">KAPOLEI · EWA</text>
    </a>
    {/* HONOLULU (south tail) */}
    <a href="/honolulu-oahu-advertising" aria-label="Honolulu - Oahu">
      <ellipse className="hot" cx="540" cy="470" rx="100" ry="58" />
      <circle className="pin" cx="540" cy="436" r="5" />
      <text className="lbl" x="540" y="472">Honolulu</text>
      <text className="sub" x="540" y="496">WAIKIKI · KAHALA</text>
    </a>
    {/* compass */}
    <g opacity=".7">
      <circle cx="845" cy="78" r="26" fill="none" stroke="#A37C4F" strokeWidth="1.5" />
      <path d="M845,60 L851,82 L845,77 L839,82 Z" fill="#C29A63" />
      <text x="845" y="123" textAnchor="middle" fill="#D5C1AA" fontSize="13" letterSpacing="2" fontFamily="-apple-system, sans-serif">N</text>
    </g>
  </svg>
)

export default function OahuPage() {
  return <IslandHub config={config} areas={areas} map={OahuMap} />
}
