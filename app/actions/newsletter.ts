"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

interface SubscriptionData {
  firstName: string
  lastName: string
  email: string
  phone: string
  gender?: string
}

export async function subscribeToNewsletter(data: SubscriptionData) {
  try {
    const supabase = createServerSupabaseClient()

    // Email-in artıq mövcud olub-olmadığını yoxla
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id")
      .eq("email", data.email)
      .single()

    if (existing) {
      return { success: false, error: "Bu email artıq qeydiyyatdan keçib." }
    }

    // Yeni abunəçi əlavə et
    const { error } = await supabase.from("newsletter_subscribers").insert([
      {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        name: `${data.firstName} ${data.lastName}`,
        status: "active",
      },
    ])

    if (error) {
      console.error("Newsletter subscription error:", error)
      return { success: false, error: "Qeydiyyat zamanı xəta baş verdi." }
    }

    return { success: true }
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return { success: false, error: "Xəta baş verdi. Yenidən cəhd edin." }
  }
}
