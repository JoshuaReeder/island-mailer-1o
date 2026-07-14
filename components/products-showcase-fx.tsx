"use client"

import { useEffect } from "react"

/*
 * v27 — Scroll theater for the /products mailer showcase.
 * When the showcase enters the viewport: adds .inview (CSS cascade:
 * papers rise + ghost postcard fades in with a gold pulse) and animates
 * the "4×" multiplier counting up from 1×. Zero markup changes to the
 * server-rendered showcase — this component only orchestrates.
 */
export default function ProductsShowcaseFx() {
  useEffect(() => {
    const showcase = document.querySelector(".mailer-showcase")
    if (!showcase) return

    const target = showcase.querySelector(".msh-paper.sig .msh-dims small")
    const original = target?.textContent || ""

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          showcase.classList.add("inview")
          io.disconnect()
          if (!target || !/4×/.test(original)) return
          let t0: number | null = null
          const dur = 1600
          const step = (ts: number) => {
            if (t0 === null) t0 = ts
            const p = Math.min((ts - t0) / dur, 1)
            const v = 1 + 3 * p * p
            target.textContent = original.replace("4×", `${v >= 3.95 ? "4" : v.toFixed(1)}×`)
            if (p < 1) requestAnimationFrame(step)
            else target.textContent = original
          }
          setTimeout(() => requestAnimationFrame(step), 700)
        })
      },
      { threshold: 0.35 },
    )
    io.observe(showcase)
    return () => io.disconnect()
  }, [])

  return null
}
