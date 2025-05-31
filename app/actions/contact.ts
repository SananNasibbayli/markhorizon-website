"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactMessage(formData: ContactFormData) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        status: "new",
      },
    ])

    if (error) {
      console.error("Contact message error:", error)
      return { success: false, error: "Mesaj göndərilmədi. Yenidən cəhd edin." }
    }

    return { success: true }
  } catch (error) {
    console.error("Contact message error:", error)
    return { success: false, error: "Xəta baş verdi. Yenidən cəhd edin." }
  }
}
