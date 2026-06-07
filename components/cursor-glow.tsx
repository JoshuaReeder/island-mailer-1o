"use client"
import { useEffect, useRef } from "react"

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px"
        glowRef.current.style.top = e.clientY + "px"
      }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2"
      style={{
        zIndex: 9999,
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(163,124,79,0.07) 0%, rgba(163,124,79,0.03) 30%, transparent 70%)",
        left: "50%",
        top: "50%",
        willChange: "left, top",
        transition: "left 0.15s ease-out, top 0.15s ease-out",
      }}
    />
  )
}
