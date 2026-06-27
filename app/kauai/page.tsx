import type { Metadata } from "next"
import IslandHub from "@/components/island-hub"
import { islandConfigs, kauaiAreas } from "@/lib/area-data"

const config = islandConfigs["kauai"]
const areas = config.areaSlugs.map((s) => kauaiAreas[s])

export const metadata: Metadata = {
  title: config.hubTitle,
  description: config.hubMetaDesc,
}

/* Kauai ≈ roundish island, north up. Regions placed to match real geography:
   North Shore (top), East Side/Coconut Coast (right), Lihue (lower-right/SE),
   South Shore (bottom), West Side (left). */
const KauaiMap = (
  <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of Kauai divided into five Island Mailer areas">
    <ellipse cx="450" cy="305" rx="370" ry="250" fill="rgba(22,66,104,.25)" />
    {/* roundish Kauai silhouette */}
    <path
      d="M 430,95
         C 520,90 600,110 660,150
         C 720,188 762,236 778,300
         C 792,356 782,418 740,462
         C 700,504 636,532 560,540
         C 488,548 412,542 344,520
         C 270,496 206,456 172,398
         C 140,344 138,278 168,224
         C 198,170 252,134 318,112
         C 356,100 394,96 430,95 Z"
      fill="rgba(163,124,79,.10)"
      stroke="#C29A63"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* dashed dividers radiating from center */}
    <g stroke="#A37C4F" strokeWidth="1.8" strokeDasharray="7 9" fill="none" opacity=".85">
      <path d="M 455,310 L 470,120" />
      <path d="M 455,310 L 760,255" />
      <path d="M 455,310 L 660,490" />
      <path d="M 455,310 L 360,520" />
      <path d="M 455,310 L 180,330" />
    </g>
    {/* NORTH SHORE (top) */}
    <a href="/north-shore-kauai-advertising" aria-label="North Shore - Kauai">
      <ellipse className="hot" cx="455" cy="175" rx="150" ry="62" />
      <circle className="pin" cx="455" cy="140" r="5" />
      <text className="lbl" x="455" y="178">North Shore</text>
      <text className="sub" x="455" y="202">HANALEI · PRINCEVILLE</text>
    </a>
    {/* EAST SIDE (right / Coconut Coast) */}
    <a href="/east-side-kauai-advertising" aria-label="East Side - Kauai">
      <ellipse className="hot" cx="668" cy="290" rx="92" ry="86" />
      <circle className="pin" cx="668" cy="248" r="5" />
      <text className="lbl" x="668" y="290">East Side</text>
      <text className="sub" x="668" y="314">KAPAA · WAILUA</text>
    </a>
    {/* LIHUE (lower-right / SE hub) */}
    <a href="/lihue-kauai-advertising" aria-label="Lihue - Kauai">
      <ellipse className="hot" cx="618" cy="445" rx="92" ry="62" />
      <circle className="pin" cx="618" cy="408" r="5" />
      <text className="lbl" x="618" y="448">Lihue</text>
      <text className="sub" x="618" y="472">NAWILIWILI · PUHI</text>
    </a>
    {/* SOUTH SHORE (bottom) */}
    <a href="/south-shore-kauai-advertising" aria-label="South Shore - Kauai">
      <ellipse className="hot" cx="400" cy="470" rx="118" ry="58" />
      <circle className="pin" cx="400" cy="436" r="5" />
      <text className="lbl" x="400" y="473">South Shore</text>
      <text className="sub" x="400" y="497">POIPU · KOLOA</text>
    </a>
    {/* WEST SIDE (left) */}
    <a href="/west-side-kauai-advertising" aria-label="West Side - Kauai">
      <ellipse className="hot" cx="252" cy="320" rx="96" ry="98" />
      <circle className="pin" cx="252" cy="270" r="5" />
      <text className="lbl" x="252" y="322">West Side</text>
      <text className="sub" x="252" y="346">WAIMEA · HANAPEPE</text>
    </a>
    {/* compass */}
    <g opacity=".7">
      <circle cx="845" cy="78" r="26" fill="none" stroke="#A37C4F" strokeWidth="1.5" />
      <path d="M845,60 L851,82 L845,77 L839,82 Z" fill="#C29A63" />
      <text x="845" y="123" textAnchor="middle" fill="#D5C1AA" fontSize="13" letterSpacing="2" fontFamily="-apple-system, sans-serif">N</text>
    </g>
  </svg>
)

export default function KauaiPage() {
  return <IslandHub config={config} areas={areas} map={KauaiMap} />
}
