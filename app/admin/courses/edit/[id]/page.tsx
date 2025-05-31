"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"

// Sample course data
const courseData = {
  1: {
    id: 1,
    title: "Tam SEO Kursu: Sıfırdan Ekspert Səviyyəsinə",
    slug: "tam-seo-kursu",
    description:
      "Google-da 1-ci sırada yer almaq üçün lazım olan bütün SEO strategiyalarını öyrənin. Praktiki layihələr və real nümunələr ilə.",
    longDescription: `Bu kursda SEO-nun bütün aspektlərini əhatə edəcəyik...`,
    instructor: "Əli Məmmədov",
    instructorBio: "10+ il təcrübəli SEO eksperti və rəqəmsal marketinq məsləhətçisi",
    instructorAvatar: "/placeholder.svg?height=80&width=80",
    category: "SEO",
    level: "Başlanğıc",
    price: "149",
    originalPrice: "299",
    duration: "12 saat",
    language: "Azərbaycan dili",
    image: "/placeholder.svg?height=400&width=600",
    url: "https://udemy.com/course/tam-seo-kursu",
    status: "Aktiv",
    bestseller: true,
    features: ["12 saat video məzmun", "50+ praktiki tapşırıq", "Ömürboyu giriş", "Sertifikat"],
    requirements: ["Kompüter və internet bağlantısı", "Əsas kompüter bilikləri"],
    whatYouLearn: ["SEO-nun bütün aspektlərini mənimsəyəcəksiniz", "Google-da yüksək reytinq əldə etmək"],
    curriculum: [
      {
        title: "SEO-ya Giriş",
        duration: "45 dəq",
        lessons: ["SEO nədir və niyə vacibdir?", "Axtarış motorları necə işləyir?"],
      },
    ],
  },
}

interface EditCoursePageProps {
  params: {
    id: string
  }
}

export default function EditCoursePage({ params }: EditCoursePageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    instructor: "",
    instructorBio: "",
    instructorAvatar: "",
    category: "",
    level: "",
    price: "",
    originalPrice: "",
    duration: "",
    language: "Azərbaycan dili",
    image: "",
    url: "",
    status: "Qaralama",
    bestseller: false,
    features: [""],
    requirements: [""],
    whatYouLearn: [""],
    curriculum: [
      {
        title: "",
        duration: "",
        lessons: [""],
      },
    ],
  })

  const categories = [
    { value: "SEO", label: "SEO" },
    { value: "SMM", label: "SMM" },
    { value: "Google Ads", label: "Google Ads" },
    { value: "Email Marketing", label: "Email Marketing" },
    { value: "Content Marketing", label: "Content Marketing" },
    { value: "Digərləri", label: "Digərləri" },
  ]

  const levels = [
    { value: "Başlanğıc", label: "Başlanğıc" },
    { value: "Orta", label: "Orta" },
    { value: "İrəliləmiş", label: "İrəliləmiş" },
  ]

  useEffect(() => {
    // Load course data
    const course = courseData[params.id as keyof typeof courseData]
    if (course) {
      setFormData({
        title: course.title,
        slug: course.slug,
        description: course.description,
        longDescription: course.longDescription,
        instructor: course.instructor,
        instructorBio: course.instructorBio,
        instructorAvatar: course.instructorAvatar,
        category: course.category,
        level: course.level,
        price: course.price,
        originalPrice: course.originalPrice,
        duration: course.duration,
        language: course.language,
        image: course.image,
        url: course.url,
        status: course.status,
        bestseller: course.bestseller,
        features: course.features,
        requirements: course.requirements,
        whatYouLearn: course.whatYouLearn,
        curriculum: course.curriculum,
      })
    }
  }, [params.id])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), ""],
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).filter((_, i) => i !== index),
    }))
  }

  const updateArrayItem = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).map((item, i) => (i === index ? value : item)),
    }))
  }

  const handleSave = (status: string) => {
    const courseData = {
      ...formData,
      status,
      features: formData.features.filter((f) => f.trim() !== ""),
      requirements: formData.requirements.filter((r) => r.trim() !== ""),
      whatYouLearn: formData.whatYouLearn.filter((w) => w.trim() !== ""),
      curriculum: formData.curriculum.map((section) => ({
        ...section,
        lessons: section.lessons.filter((l) => l.trim() !== ""),
      })),
      updatedDate: new Date().toISOString().split("T")[0],
    }

    console.log("Updated course data:", courseData)
    // Here you would save to your database

    router.push("/admin/courses")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/courses">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Kursu Redaktə Et</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleSave("Qaralama")}>
              <Save className="mr-2 h-4 w-4" />
              Qaralama Olaraq Saxla
            </Button>
            <Button onClick={() => handleSave("Aktiv")}>Dərc Et</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Əsas Məlumatlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Kurs Adı *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Kursun adını daxil edin"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="kurs-url-slug"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">URL: /courses/{formData.slug || "kurs-slug"}</p>
                </div>

                <div>
                  <Label htmlFor="description">Qısa Təsvir *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Kursun qısa təsvirini yazın"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="longDescription">Ətraflı Təsvir</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => handleInputChange("longDescription", e.target.value)}
                    placeholder="Kursun ətraflı təsvirini yazın"
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Qiymət (₼) *</Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="149"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Orijinal Qiymət (₼)</Label>
                    <Input
                      id="originalPrice"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      placeholder="299"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="url">Kurs URL *</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => handleInputChange("url", e.target.value)}
                    placeholder="https://udemy.com/course/kurs-adi"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>Nə Öyrənəcəksiniz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem("whatYouLearn", index, e.target.value)}
                      placeholder="Öyrənəcəyiniz şey"
                    />
                    {formData.whatYouLearn.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removeArrayItem("whatYouLearn", index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem("whatYouLearn")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Əlavə Et
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Kurs Parametrləri</CardTitle>
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
                  <Label htmlFor="level">Səviyyə *</Label>
                  <Select value={formData.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Səviyyə seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Müddət *</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="12 saat"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bestseller"
                    checked={formData.bestseller}
                    onCheckedChange={(checked) => handleInputChange("bestseller", checked as boolean)}
                  />
                  <Label htmlFor="bestseller">Bestseller kimi işarələ</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kurs Şəkli</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="image">Şəkil URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="https://example.com/course-image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
