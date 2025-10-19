"use client"

import { memo } from "react"

export const Watermark = memo(function Watermark() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="select-none text-6xl md:text-8xl font-bold opacity-5 rotate-[-45deg] whitespace-nowrap"
        style={{ color: "#f97316" }}
      >
        DEMO • NOT A PERSONALIZED PLAN
      </div>
    </div>
  )
})
