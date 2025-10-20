"use client"

import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

interface StickySampleBarProps {
  sampleSlug: string
}

export const StickySampleBar = memo(function StickySampleBar({ sampleSlug }: StickySampleBarProps) {
  const handleDownload = useCallback(async () => {
    try {
      const response = await fetch(`/api/samples/${sampleSlug}/pdf`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${sampleSlug}-sample.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Failed to download PDF:", error)
    }
  }, [sampleSlug])

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/samples">
            <Button
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Samples
            </Button>
          </Link>
          <Button
            onClick={handleDownload}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
})
