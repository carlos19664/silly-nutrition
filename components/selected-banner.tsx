"use client"
import { useSearchParams } from "next/navigation"

const LABELS = {
  meal: "Meal Plan Only",
  workout: "Workout Plan Only",
  complete: "Complete Package",
} as const

export function SelectedBanner() {
  const sp = useSearchParams()
  const plan = sp.get("plan") || undefined
  const sub = sp.get("sub") as keyof typeof LABELS | null
  const price = sp.get("price") || undefined

  // Fallback to sessionStorage only if params are missing
  let planF = plan,
    subF = sub ?? undefined,
    priceF = price
  if (!planF || (planF === "single" && !subF) || !priceF) {
    try {
      const saved = JSON.parse(sessionStorage.getItem("sn:selectedPlan") || "null")
      if (saved?.plan_type && saved?.plan_price) {
        planF = planF || saved.plan_type
        subF = subF || saved.selected_subplan
        priceF = priceF || String(saved.plan_price)
      }
    } catch {}
  }

  if (planF === "single" && subF && priceF) {
    return (
      <div className="mb-6 rounded-2xl border-2 border-orange-300 bg-orange-50 px-6 py-4 text-center">
        <div className="text-sm text-gray-600">Selected Plan</div>
        <div className="text-xl font-semibold">{LABELS[subF]}</div>
        <div className="mt-1 text-orange-600 font-semibold">
          £{priceF} <span className="font-normal text-gray-500">one-time</span>
        </div>
      </div>
    )
  }
  if ((planF === "essential" || planF === "coaching") && priceF) {
    return (
      <div className="mb-6 rounded-2xl border-2 border-orange-300 bg-orange-50 px-6 py-4 text-center">
        <div className="text-sm text-gray-600">Selected Plan</div>
        <div className="text-xl font-semibold">{planF === "essential" ? "Essential Plan" : "Coaching Plan"}</div>
        <div className="mt-1 text-orange-600 font-semibold">
          £{priceF} <span className="font-normal text-gray-500">per month</span>
        </div>
      </div>
    )
  }
  // Fallback banner or null (when using plan-type chooser)
  return null
}
