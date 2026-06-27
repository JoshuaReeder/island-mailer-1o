import type { Metadata } from "next"
import IslandHub from "@/components/island-hub"
import { bigIslandAreas, islandConfigs } from "@/lib/area-data"

const config = islandConfigs["hawaii"]
const areas = config.areaSlugs.map((s) => bigIslandAreas[s])

export const metadata: Metadata = {
  title: config.hubTitle,
  description: config.hubMetaDesc,
}

/* Big Island ≈ large rounded triangle, north up. Regions placed to match real
   geography: North/South Kohala (NW), Hamakua (N coast), Hilo (E),
   Puna (SE), Ka'u (S point), North Kona (W), South Kona (SW). */
const BigIslandMap = (
  <svg viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map of the Big Island divided into seven Island Mailer areas">
    <ellipse cx="450" cy="320" rx="400" ry="270" fill="rgba(22,66,104,.25)" />
    {/* rounded-triangle Big Island silhouette: north point near Kohala, broad east
        (Hilo/Puna) side, south point (Ka'u/South Point), west (Kona) coast */}
    <path
      d="M 430,90
         C 500,96 560,128 612,178
         C 672,234 724,300 752,372
         C 776,434 770,492 720,520
         C 672,546 604,548 540,544
         C 470,540 404,548 344,532
         C 280,514 224,476 196,418
         C 170,364 172,300 200,244
         C 230,184 282,138 344,110
         C 372,98 402,90 430,90 Z"
      fill="rgba(163,124,79,.10)"
      stroke="#C29A63"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    <g stroke="#A37C4F" strokeWidth="1.6" strokeDasharray="6 8" fill="none" opacity=".82">
      <path d="M 455,330 L 430,120" />
      <path d="M 455,330 L 620,200" />
      <path d="M 455,330 L 720,360" />
      <path d="M 455,330 L 640,500" />
      <path d="M 455,330 L 420,535" />
      <path d="M 455,330 L 235,415" />
      <path d="M 455,330 L 220,260" />
    </g>
    {/* SOUTH KOHALA (NW) */}
    <a href="/south-kohala-hawaii-advertising" aria-label="South Kohala - Big Island">
      <ellipse className="hot" cx="392" cy="172" rx="104" ry="52" />
      <circle className="pin" cx="392" cy="140" r="5" />
      <text className="lbl" x="392" y="174">South Kohala</text>
      <text className="sub" x="392" y="196">WAIMEA · KOHALA COAST</text>
    </a>
    {/* HAMAKUA (N coast) */}
    <a href="/hamakua-hawaii-advertising" aria-label="Hamakua - Big Island">
      <ellipse className="hot" cx="582" cy="222" rx="96" ry="46" />
      <circle className="pin" cx="582" cy="192" r="5" />
      <text className="lbl" x="582" y="224">Hamakua</text>
      <text className="sub" x="582" y="246">HONOKAA · WAIPIO</text>
    </a>
    {/* HILO (E) */}
    <a href="/hilo-hawaii-advertising" aria-label="Hilo - Big Island">
      <ellipse className="hot" cx="688" cy="360" rx="78" ry="78" />
      <circle className="pin" cx="688" cy="318" r="5" />
      <text className="lbl" x="688" y="360">Hilo</text>
      <text className="sub" x="688" y="384">HILO · KEAAU</text>
    </a>
    {/* PUNA (SE) */}
    <a href="/puna-hawaii-advertising" aria-label="Puna - Big Island">
      <ellipse className="hot" cx="612" cy="490" rx="92" ry="52" />
      <circle className="pin" cx="612" cy="456" r="5" />
      <text className="lbl" x="612" y="492">Puna</text>
      <text className="sub" x="612" y="516">PAHOA · VOLCANO</text>
    </a>
    {/* KA'U (S point) */}
    <a href="/kaau-hawaii-advertising" aria-label="Ka'u - Big Island">
      <ellipse className="hot" cx="420" cy="498" rx="92" ry="48" />
      <circle className="pin" cx="420" cy="466" r="5" />
      <text className="lbl" x="420" y="500">Ka&apos;u</text>
      <text className="sub" x="420" y="524">NAALEHU · PAHALA</text>
    </a>
    {/* SOUTH KONA (SW) */}
    <a href="/south-kona-hawaii-advertising" aria-label="South Kona - Big Island">
      <ellipse className="hot" cx="262" cy="410" rx="78" ry="64" />
      <circle className="pin" cx="262" cy="370" r="5" />
      <text className="lbl" x="262" y="412">South Kona</text>
      <text className="sub" x="262" y="436">KEALAKEKUA · HONAUNAU</text>
    </a>
    {/* NORTH KONA (W) */}
    <a href="/north-kona-hawaii-advertising" aria-label="North Kona - Big Island">
      <ellipse className="hot" cx="250" cy="262" rx="80" ry="58" />
      <circle className="pin" cx="250" cy="222" r="5" />
      <text className="lbl" x="250" y="264">North Kona</text>
      <text className="sub" x="250" y="288">KAILUA-KONA · HOLUALOA</text>
    </a>
    {/* compass */}
    <g opacity=".7">
      <circle cx="845" cy="78" r="26" fill="none" stroke="#A37C4F" strokeWidth="1.5" />
      <path d="M845,60 L851,82 L845,77 L839,82 Z" fill="#C29A63" />
      <text x="845" y="123" textAnchor="middle" fill="#D5C1AA" fontSize="13" letterSpacing="2" fontFamily="-apple-system, sans-serif">N</text>
    </g>
  </svg>
)

export default function BigIslandPage() {
  return <IslandHub config={config} areas={areas} map={BigIslandMap} />
}
