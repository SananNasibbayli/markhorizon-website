"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const result = await subscribeToNewsletter(email)
      if (result.success) {
        setMessage("Uğurla abunə oldunuz! Təşəkkür edirik.")
        setEmail("")
      } else {
        setMessage(result.error || "Xəta baş verdi. Yenidən cəhd edin.")
      }
    } catch (error) {
      setMessage("Xəta baş verdi. Yenidən cəhd edin.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Newsletter-ə Abunə Olun</h2>
          <p className="text-gray-600 mb-8">
            Ən son məqalələr, kurslar və rəqəmsal marketinq trendləri haqqında məlumat alın.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Email ünvanınız"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !email}>
              {isLoading ? "Göndərilir..." : "Abunə Ol"}
            </Button>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${message.includes("Uğurla") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
