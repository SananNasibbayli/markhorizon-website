"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewAIToolPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    rating: "",
    pricing: "",
    url: "",
    users: "",
    icon: "",
    gradient: "from-blue-500 to-purple-500",
    popular: false,
    status: "Aktiv",
    features: [""],
  })

  const categories = [
    { value: "Mətn", label: "Mətn" },
    { value: "Şəkil", label: "Şəkil" },
    { value: "Video", label: "Video" },
    { value: "Marketinq", label: "Marketinq" },
    { value: "Kod", label: "Kod" },
    { value: "Audio", label: "Audio" },
  ]

  const gradients = [
    { value: "from-blue-500 to-purple-500", label: "Mavi-Bənövşəyi" },
    { value: "from-green-500 to-blue-500", label: "Yaşıl-Mavi" },
    { value: "from-purple-500 to-pink-500", label: "Bənövşəyi-Çəhrayı" },
    { value: "from-orange-500 to-red-500", label: "Narıncı-Qırmızı" },
    { value: "from-blue-500 to-cyan-500", label: "Mavi-Firuzəyi" },
    { value: "from-red-500 to-pink-500", label: "Qırmızı-Çəhrayı" },
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }))
  }

  const updateFeature = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) => (i === index ? value : feature)),
    }))
  }

  const handleSave = () => {
    const aiToolData = {
      ...formData,
      rating: Number.parseFloat(formData.rating),
      features: formData.features.filter((f) => f.trim() !== ""),
      dateAdded: new Date().toISOString().split("T")[0],
    }

    console.log("AI Tool data:", aiToolData)
    // Here you would save to your database

    router.push("/admin/ai-tools")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/ai-tools">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Yeni AI Alət</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Saxla
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Əsas Məlumatlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Ad *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="AI alətinin adı"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Təsvir *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="AI alətinin təsvirini yazın"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="url">Sayt URL *</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    placeholder="https://example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Reytinq (1-5) *</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => handleInputChange("rating", e.target.value)}
                      placeholder="4.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="users">İstifadəçi Sayı</Label>
                    <Input
                      id="users"
                      value={formData.users}
                      onChange={(e) => handleInputChange("users", e.target.value)}
                      placeholder="1M+"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="pricing">Qiymət *</Label>
                  <Select value={formData.pricing} onValueChange={(value) => handleInputChange("pricing", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Qiymət növü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pulsuz">Pulsuz</SelectItem>
                      <SelectItem value="Ödənişli">Ödənişli</SelectItem>
                      <SelectItem value="Pulsuz/Ödənişli">Pulsuz/Ödənişli</SelectItem>
                      <SelectItem value="Freemium">Freemium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Xüsusiyyətlər</CardTitle>
                <CardDescription>AI alətinin əsas xüsusiyyətlərini əlavə edin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateFeature(index, e.target.value)}
                      placeholder="Xüsusiyyət adı"
                    />
                    {formData.features.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removeFeature(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addFeature}>
                  <Plus className="mr-2 h-4 w-4" />
                  Xüsusiyyət Əlavə Et
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kateqoriya və Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="category">Kateqoriya *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kateqoriya seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktiv">Aktiv</SelectItem>
                      <SelectItem value="Deaktiv">Deaktiv</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="popular"
                    checked={formData.popular}
                    onCheckedChange={(checked) => handleInputChange("popular", checked as boolean)}
                  />
                  <Label htmlFor="popular">Populyar alət kimi işarələ</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Görünüş</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="icon">İkon URL</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => handleInputChange("icon", e.target.value)}
                    placeholder="https://example.com/icon.png"
                  />
                </div>

                <div>
                  <Label htmlFor="gradient">Rəng Gradiyenti</Label>
                  <Select value={formData.gradient} onValueChange={(value) => handleInputChange("gradient", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradients.map((gradient) => (
                        <SelectItem key={gradient.value} value={gradient.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded bg-gradient-to-r ${gradient.value}`}></div>
                            <span>{gradient.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preview */}
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-2">Önizləmə:</div>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${formData.gradient} flex items-center justify-center text-white font-bold`}
                    >
                      {formData.name.charAt(0) || "A"}
                    </div>
                    <div>
                      <div className="font-medium">{formData.name || "AI Alət Adı"}</div>
                      <div className="text-sm text-gray-500">{formData.category || "Kateqoriya"}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
