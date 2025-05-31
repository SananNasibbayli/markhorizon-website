"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions/newsletter"

export default function SubscriptionForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    gender: "male",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Ad və soyadı ayır
      const nameParts = formData.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      const result = await subscribeToNewsletter({
        firstName,
        lastName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
      })

      if (result.success) {
        setIsSubmitted(true)
        // Reset form after 3 seconds and close dialog
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            fullName: "",
            phone: "",
            email: "",
            gender: "male",
          })
          setIsOpen(false)
        }, 3000)
      } else {
        alert(result.error || "Xəta baş verdi. Yenidən cəhd edin.")
      }
    } catch (error) {
      alert("Xəta baş verdi. Yenidən cəhd edin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
          Abunə Ol
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <DialogTitle className="text-xl mb-2">Təşəkkür edirik!</DialogTitle>
            <DialogDescription>
              Abunəliyiniz uğurla tamamlandı. Ən son yeniliklərdən xəbərdar olacaqsınız.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Yeniliklərdən Xəbərdar Olun</DialogTitle>
              <DialogDescription>
                Rəqəmsal marketinq və süni intellekt sahəsində ən son yeniliklərdən xəbərdar olmaq üçün abunə olun.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Ad Soyad</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Ad və soyadınızı daxil edin"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Əlaqə nömrəsi</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+994 XX XXX XX XX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Cins</Label>
                <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Kişi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Qadın</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Digər</Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Göndərilir..." : "Abunə Ol"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
