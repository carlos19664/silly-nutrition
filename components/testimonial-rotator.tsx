"use client"

import { useState, useEffect } from "react"

interface Testimonial {
  description: string
  name: string
}

interface TestimonialRotatorProps {
  testimonials: Testimonial[]
}

export function TestimonialRotator({ testimonials }: TestimonialRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-[60px] flex items-center justify-center">
      <div className="text-center transition-opacity duration-500">
        <p className="text-xs sm:text-sm text-gray-700 mb-1">
          <span className="font-bold">{testimonials[currentIndex].description}</span>
        </p>
        <p className="text-xs text-gray-600">{testimonials[currentIndex].name}</p>
      </div>
    </div>
  )
}
