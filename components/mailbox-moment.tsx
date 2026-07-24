"use client"

/*
 * mailbox-moment.tsx (v32) — "The Mailbox Moment" scroll hero for /local-offers.
 * Brand-only scene (navy + gold, no landscape): the mailbox is the sole focus.
 * Scroll story: door swings open (gold light spills out, sparkles) → the REAL
 * 9×12 fall card slides out → fills the screen (Side One) → flips to Side Two →
 * flips back while docking beside the headline, chips and CTAs.
 * Card artwork: /images/mailer/side-one-fall.webp + side-two-fall.webp.
 * ?p=0..1 jumps the scrub for QA. Reduced-motion: static end state.
 */

import { useEffect, useRef } from "react"

const BOX_BACK_SVG = `<svg class="layer mbx-back" viewBox="0 0 460 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bodyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3A4A6B"/><stop offset=".28" stop-color="#2A3750"/><stop offset=".62" stop-color="#1D2739"/><stop offset="1" stop-color="#151D2B"/></linearGradient>
    <linearGradient id="postG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4A3A28"/><stop offset=".5" stop-color="#6B563B"/><stop offset="1" stop-color="#3A2E20"/></linearGradient>
    <radialGradient id="inGlow" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#EECB96" stop-opacity=".7"/><stop offset=".45" stop-color="#C9A36B" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <linearGradient id="coneG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#EECB96" stop-opacity=".5"/><stop offset="1" stop-color="#C9A36B" stop-opacity="0"/></linearGradient>
    <radialGradient id="floorG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#C9A36B" stop-opacity=".28"/><stop offset=".6" stop-color="#A37C4F" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  </defs>
  <ellipse cx="230" cy="560" rx="210" ry="34" fill="url(#floorG)"/>
  <ellipse cx="230" cy="562" rx="150" ry="18" fill="#0A0E15" opacity=".55"/>
  <rect x="208" y="404" width="44" height="158" rx="6" fill="url(#postG)"/>
  <rect x="208" y="404" width="44" height="158" rx="6" fill="none" stroke="#0F141D" stroke-width="2" opacity=".5"/>
  <path d="M216,412 v142 M236,410 v144" stroke="#2A2418" stroke-width="2" opacity=".6"/>
  <rect x="164" y="388" width="132" height="16" rx="4" fill="#54452F"/>
  <rect x="164" y="388" width="132" height="16" rx="4" fill="none" stroke="#0F141D" stroke-width="1.5" opacity=".4"/>
  <path d="M204,404 L176,452 M256,404 L284,452" stroke="#4A3A28" stroke-width="10" stroke-linecap="round"/>
  <path d="M85,215 C85,132 150,88 230,88 C310,88 375,132 375,215 L375,376 C375,384 369,390 361,390 L99,390 C91,390 85,384 85,376 Z" fill="url(#bodyG)"/>
  <path d="M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z" fill="#080C13"/>
  <path d="M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z" fill="url(#inGlow)" id="inGlowP" opacity="0"/>
  <path id="lightCone" d="M118,300 L342,300 L420,560 L40,560 Z" fill="url(#coneG)" opacity="0"/>
  <g id="sparkGrp" fill="#EECB96" opacity="0">
    <path d="M120,250 l3,8 8,3 -8,3 -3,8 -3,-8 -8,-3 8,-3 Z"/>
    <path d="M340,236 l2.6,7 7,2.6 -7,2.6 -2.6,7 -2.6,-7 -7,-2.6 7,-2.6 Z"/>
    <path d="M230,120 l2.4,6.4 6.4,2.4 -6.4,2.4 -2.4,6.4 -2.4,-6.4 -6.4,-2.4 6.4,-2.4 Z"/>
    <path d="M156,180 l2,5.4 5.4,2 -5.4,2 -2,5.4 -2,-5.4 -5.4,-2 5.4,-2 Z"/>
    <path d="M312,168 l2,5.4 5.4,2 -5.4,2 -2,5.4 -2,-5.4 -5.4,-2 5.4,-2 Z"/>
  </g>
</svg>`

const DOOR_SVG = `<svg viewBox="0 0 264 276" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="doorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#33425F"/><stop offset=".5" stop-color="#26334B"/><stop offset="1" stop-color="#1A2333"/></linearGradient>
  </defs>
  <path d="M4,272 L4,120 C4,46 60,6 132,6 C204,6 260,46 260,120 L260,272 Z" fill="url(#doorG)" stroke="#C9A36B" stroke-width="3.5"/>
  <g id="doorFace">
    <path d="M22,272 L22,126 C22,60 72,24 132,24 C192,24 242,60 242,126 L242,272 Z" fill="none" stroke="rgba(201,163,107,.45)" stroke-width="1.6"/>
    <circle cx="132" cy="82" r="13" fill="#C9A36B"/>
    <circle cx="132" cy="82" r="13" fill="none" stroke="#8F6C42" stroke-width="2.5"/>
    <rect x="47" y="138" width="170" height="30" rx="7" fill="rgba(20,28,40,.85)" stroke="rgba(201,163,107,.7)" stroke-width="1.5"/>
    <text x="132" y="159" text-anchor="middle" font-weight="700" font-size="13" letter-spacing="2.4" fill="#C9A36B">LOCAL RESIDENT</text>
    <rect x="102" y="214" width="60" height="10" rx="5" fill="rgba(201,163,107,.55)"/>
  </g>
</svg>`

const BOX_FRONT_SVG = `<svg class="layer mbx-front" viewBox="0 0 460 600" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="rimG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#43547A"/><stop offset=".3" stop-color="#33425F"/><stop offset=".7" stop-color="#232F45"/><stop offset="1" stop-color="#182031"/></linearGradient>
  </defs>
  <path fill-rule="evenodd" clip-rule="evenodd" fill="url(#rimG)" stroke="#C9A36B" stroke-width="3.5" d="M85,215 C85,132 150,88 230,88 C310,88 375,132 375,215 L375,376 C375,384 369,390 361,390 L99,390 C91,390 85,384 85,376 Z M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z"/>
  <path d="M100,222 C100,146 158,104 230,104 C302,104 360,146 360,222 L360,368 C360,373 356,377 351,377 L109,377 C104,377 100,373 100,368 Z" fill="none" stroke="rgba(201,163,107,.8)" stroke-width="2"/>
  <path d="M110,120 C142,100 186,92 230,92" stroke="rgba(245,244,239,.35)" stroke-width="5" stroke-linecap="round" opacity=".8"/>
  <g id="mmFlag" transform="rotate(112 374 214)">
    <rect x="368" y="118" width="11" height="98" rx="5.5" fill="#C9A36B"/>
    <path d="M379,118 L424,130 L379,150 Z" fill="#C9A36B"/>
    <circle cx="374" cy="214" r="10" fill="#8F6C42" stroke="#C9A36B" stroke-width="2.5"/>
  </g>
</svg>`

const COPY_HTML = `<span class="im-pill">Maui Local Offers &middot; Free To Your Mailbox</span>
<h1>The best of Maui, <em>delivered to your mailbox.</em></h1>
<p class="mm-lead">Seasonal mailers featuring trusted local businesses and real offers for Maui households. No apps. No accounts. Just neighbors supporting neighbors.</p>
<div class="mm-benefits">
  <span><svg viewBox="0 0 24 24"><path d="M4 10c0-3 2.5-5 6-5h4c3.5 0 6 2 6 5v8H4ZM4 18h16M8 21v-3M16 21v-3M20 8l1.5-.5"/></svg>Know when it lands in your area</span>
  <span><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>Outside the zone? Get the email edition</span>
  <span><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.6 6.3.8-4.6 4.3 1.2 6.1L12 16.9 6.4 19.8l1.2-6.1L3 9.4l6.3-.8Z"/></svg>Subscriber-only extra offers</span>
</div>
<div class="mm-ctas">
  <a class="btn" href="#offers">Get the Offers</a>
  <a class="btn ghost" href="#inside">See What's Inside</a>
</div>`

function clamp(v: number, a: number, b: number) { return v < a ? a : v > b ? b : v }
function easeFn(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

export default function MailboxMoment() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const $ = (id: string) => root.querySelector<HTMLElement>("#" + id)
    const stage = $("mmStage"), box = $("mmBox"), door = $("mmDoor"), sky = $("mmSky"),
      chip = $("mmChip"), cue = $("mmCue"), copy = $("mmCopy"), mailer = $("mmMailer"), flip = $("mmFlip")
    const flag = root.querySelector<SVGGElement>("#mmFlag")
    const glow = root.querySelector<SVGElement>("#inGlowP")
    const cone = root.querySelector<SVGElement>("#lightCone")
    const sparks = root.querySelector<SVGElement>("#sparkGrp")
    const doorFace = root.querySelector<SVGGElement>("#doorFace")
    if (!stage || !box || !door || !sky || !chip || !cue || !copy || !mailer || !flip || !flag || !glow || !cone || !sparks || !doorFace) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const seg = (p: number, a: number, b: number) => easeFn(clamp((p - a) / (b - a), 0, 1))

    let vw = 0, vh = 0, S0 = 0, S1 = 0, S2 = 0, S3 = 0, dockX = 0, dockY = 0, mobile = false
    function measure() {
      vw = window.innerWidth; vh = window.innerHeight
      mobile = vw <= 980
      const boxW = box!.getBoundingClientRect().width || 1
      const holeW = boxW * (260 / 460)
      S1 = holeW / 560
      S0 = S1 * 0.44
      const fullW = Math.min(0.92 * vw, vh * 0.86 * (12 / 9))
      S2 = fullW / 560
      const dockW = mobile ? Math.min(0.86 * vw, 470) : Math.min(0.46 * vw, 580)
      S3 = dockW / 560
      dockX = mobile ? 0 : 0.235 * vw
      dockY = mobile ? -0.245 * vh : 0.015 * vh
    }

    const T = { door: [0.03, 0.15], flag: [0.05, 0.17], em: [0.16, 0.5], gr: [0.5, 0.7], fl1: [0.7, 0.84], fl2: [0.84, 0.97], push: [0.52, 0.8], dk: [0.84, 0.96], cp: [0.86, 0.98] }

    function paint() {
      const r = stage!.getBoundingClientRect()
      const total = r.height - vh
      let p = total > 0 ? clamp(-r.top / total, 0, 1) : 1
      if (reduce) p = 1

      /* door, flag, interior light, sparkles */
      const d = seg(p, T.door[0], T.door[1])
      door!.style.transform = "rotateX(" + -104 * d + "deg)"
      door!.style.filter = "brightness(" + (1 - 0.42 * d) + ")"
      doorFace!.setAttribute("opacity", (1 - clamp((d - 0.72) / 0.18, 0, 1)).toFixed(3))
      const f = seg(p, T.flag[0], T.flag[1])
      flag!.setAttribute("transform", "rotate(" + (112 - 112 * f) + " 374 214)")
      glow!.setAttribute("opacity", (0.95 * d).toFixed(3))
      cone!.setAttribute("opacity", (0.85 * d * (1 - seg(p, 0.5, 0.62))).toFixed(3))
      const sp = Math.sin(Math.PI * clamp((p - 0.14) / 0.3, 0, 1))
      sparks!.setAttribute("opacity", (sp * 0.95).toFixed(3))

      /* mailer: out of the box → full (Side One) → flip (Side Two) → dock (front) */
      const em = seg(p, T.em[0], T.em[1]), gr = seg(p, T.gr[0], T.gr[1]), dk = seg(p, T.dk[0], T.dk[1])
      let s = S0
      if (p >= T.dk[0]) s = lerp(S2, S3, dk)
      else if (p >= T.gr[0]) s = lerp(S1, S2, gr)
      else s = lerp(S0, S1, em)
      const x = lerp(0, dockX, dk)
      let y = lerp(0.012 * vh, 0.06 * vh, em)
      y = lerp(y, dockY, dk)
      let rot = lerp(0, -3.2, em)
      rot = lerp(rot, 0, gr)
      rot = lerp(rot, mobile ? 0 : -3.5, dk)
      mailer!.style.transform = "translate3d(" + x + "px," + y + "px,0) rotate(" + rot + "deg) scale(" + s + ")"
      mailer!.style.opacity = String(seg(p, 0.07, 0.17))
      mailer!.style.filter = "brightness(" + lerp(0.62, 1, Math.max(em, d * 0.4)) + ")"
      mailer!.classList.toggle("front", p >= 0.48)
      mailer!.classList.toggle("docked", p >= 0.985)

      /* the Side Two showcase flip */
      const spin = 180 * seg(p, T.fl1[0], T.fl1[1]) + 180 * seg(p, T.fl2[0], T.fl2[1])
      flip!.style.transform = "rotateY(" + spin + "deg)"

      /* mailbox recedes */
      const push = seg(p, T.push[0], T.push[1])
      box!.style.transform = "translate(-50%,-40%) translateY(" + 12 * push + "vh) scale(" + (1 + 0.55 * push) + ")"
      box!.style.filter = "blur(" + 9 * push + "px)"
      box!.style.opacity = String(1 - push)
      sky!.style.opacity = String(1 - 0.25 * push)

      chip!.style.opacity = String(1 - seg(p, 0.42, 0.55))
      chip!.style.transform = "translateX(-50%) translateY(" + -30 * seg(p, 0.42, 0.55) + "px)"
      cue!.style.opacity = String(1 - seg(p, 0, 0.06))
      const cp = seg(p, T.cp[0], T.cp[1])
      copy!.style.opacity = String(cp)
      copy!.style.transform = mobile
        ? "translate(-50%," + (30 - 30 * cp) + "px)"
        : "translateY(-46%) translateX(" + (-40 + 40 * cp) + "px)"
    }

    measure()
    const onResize = () => { measure(); paint() }
    window.addEventListener("resize", onResize)

    /* QA: jump to a scrub position with ?p=0..1 (twice — beats Next scroll restoration) */
    const devP = new URLSearchParams(location.search).get("p")
    if (devP) {
      const jump = () => { window.scrollTo(0, parseFloat(devP) * (stage!.offsetHeight - vh)); paint() }
      setTimeout(jump, 700)
      setTimeout(jump, 1500)
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { paint(); ticking = false }) }
    }

    if (reduce) {
      root.classList.add("mm-static")
      measure(); paint()
    } else {
      window.addEventListener("scroll", onScroll, { passive: true })
      paint()
    }
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div ref={rootRef}>
      <div className="mm-stage" id="mmStage">
        <div className="mm-sticky">
          <div className="mm-sky" id="mmSky">
            <div className="mm-aur a1" />
            <div className="mm-aur a2" />
            <div className="mm-rays" />
            <span className="mote" style={{ left: "10%", animationDuration: "17s" }} />
            <span className="mote" style={{ left: "30%", animationDuration: "22s", animationDelay: "4s" }} />
            <span className="mote" style={{ left: "55%", animationDuration: "19s", animationDelay: "8s" }} />
            <span className="mote" style={{ left: "78%", animationDuration: "21s", animationDelay: "2s" }} />
            <span className="mote" style={{ left: "92%", animationDuration: "18s", animationDelay: "6s" }} />
          </div>

          <div className="mm-box" id="mmBox">
            <div dangerouslySetInnerHTML={{ __html: BOX_BACK_SVG }} />
            <div className="mm-doorWrap"><div className="mm-door" id="mmDoor" dangerouslySetInnerHTML={{ __html: DOOR_SVG }} /></div>
            <div dangerouslySetInnerHTML={{ __html: BOX_FRONT_SVG }} />
          </div>

          <div className="mm-mailer" id="mmMailer"><div className="m-float">
            <div className="m-flip" id="mmFlip">
              <div className="m-side m-frontside">
                <img src="/images/mailer/side-one-fall.webp" alt="Island Mailer 9×12 fall card — Side One with 8 featured local offers" />
                <span className="m-glint" aria-hidden="true" />
              </div>
              <div className="m-side m-backside">
                <img src="/images/mailer/side-two-fall.webp" alt="Island Mailer 9×12 fall card — Side Two with 8 more featured local offers" />
              </div>
            </div>
          </div></div>

          <div className="mm-chip" id="mmChip">FALL LOCAL DEALS — COMING SOON</div>
          <div className="mm-cue" id="mmCue">
            <span>Scroll</span>
            <svg viewBox="0 0 24 24"><path d="M12 4v14M6 13l6 6 6-6" /></svg>
          </div>

          <div className="mm-copy" id="mmCopy" dangerouslySetInnerHTML={{ __html: COPY_HTML }} />

          <div className="mm-grain" />
          <div className="mm-vig" />
        </div>
      </div>
    </div>
  )
}
