import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, questionnaireData } = body

    if (!userId || !questionnaireData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("questionnaire_responses")
      .insert({
        user_id: userId,
        responses: questionnaireData,
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving questionnaire:", error)
      return NextResponse.json({ error: "Failed to save questionnaire" }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error("Error in questionnaire save:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
