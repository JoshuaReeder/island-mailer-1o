"use client"

import { useEffect } from "react"

/* Reveals .reveal elements on server-rendered pages that don't mount the
   home-resident client component (which owns the homepage's observer).
   Without this, .reveal stays opacity:0 and the content is invisible. */
export default function RevealInit() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"))
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduce || !("IntersectionObserver" in window) || els.length === 0) {
      els.forEach((el) => el.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}
