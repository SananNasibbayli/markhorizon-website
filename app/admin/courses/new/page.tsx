"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import Link from "next/link"
import { getTagsBySection, getTagColorClass, type Tag } from "@/lib/tags"

export default function NewCoursePage() {
  const router = useRouter()
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    selectedTags: [] as number[],
    rating: "",
    reviewCount: "",
    students: "",
    duration: "",
    instructor: {
      name: "",
      bio: "",
      experience: "",
      totalStudents: "",
      totalCourses: "",
      avatar: "",
    },
    courseUrl: "",
    image: "",
    status: "Qaralama",
    features: [""],
    requirements: [""],
    whatYouLearn: [""],
  })

  useEffect(() => {
    setAvailableTags(getTagsBySection("Kurs"))
  }, [])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from title
    if (field === "title" && !formData.slug) {
      const slug = (value as string)
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }))
    }
  }

  const handleInstructorChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        [field]: value,
      },
    }))
  }

  const handleTagToggle = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter((id) => id !== tagId)
        : [...prev.selectedTags, tagId],
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
      selectedTags: formData.selectedTags.map((tagId) => availableTags.find((tag) => tag.id === tagId)),
      dateAdded: new Date().toISOString().split("T")[0],
    }

    console.log("Course data:", courseData)
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
            <h1 className="text-3xl font-bold">Yeni Kurs</h1>
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

                <div>
                  <Label htmlFor="courseUrl">Kurs URL *</Label>
                  <Input
                    id="courseUrl"
                    value={formData.courseUrl}
                    onChange={(e) => handleInputChange("courseUrl", e.target.value)}
                    placeholder="https://udemy.com/course/kurs-adi"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Kursa keçid düyməsi bu linkə yönləndirəcək</p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Teqlər</CardTitle>
                <CardDescription>Kursa aid teqləri seçin (SEO, Başlanğıc, Bestseller və s.)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableTags.map((tag) => (
                      <div key={tag.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`tag-${tag.id}`}
                          checked={formData.selectedTags.includes(tag.id)}
                          onCheckedChange={() => handleTagToggle(tag.id)}
                        />
                        <Label htmlFor={`tag-${tag.id}`} className="cursor-pointer">
                          <Badge className={getTagColorClass(tag.color)}>{tag.name}</Badge>
                        </Label>
                      </div>
                    ))}
                  </div>
                  {formData.selectedTags.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Seçilmiş teqlər:</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedTags.map((tagId) => {
                          const tag = availableTags.find((t) => t.id === tagId)
                          return tag ? (
                            <Badge key={tag.id} className={getTagColorClass(tag.color)}>
                              {tag.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Kurs Statistikaları</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      placeholder="4.8"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reviewCount">Rəy Sayı *</Label>
                    <Input
                      id="reviewCount"
                      type="number"
                      value={formData.reviewCount}
                      onChange={(e) => handleInputChange("reviewCount", e.target.value)}
                      placeholder="1240"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="students">Tələbə Sayı *</Label>
                    <Input
                      id="students"
                      value={formData.students}
                      onChange={(e) => handleInputChange("students", e.target.value)}
                      placeholder="2,340"
                      required
                    />
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
                </div>
              </CardContent>
            </Card>

            {/* Instructor Info */}
            <Card>
              <CardHeader>
                <CardTitle>Müəllim Məlumatları</CardTitle>
                <CardDescription>Bu sahələr məcburi deyil, istəsəniz boş qoya bilərsiniz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="instructorName">Müəllim Adı Soyadı</Label>
                  <Input
                    id="instructorName"
                    value={formData.instructor.name}
                    onChange={(e) => handleInstructorChange("name", e.target.value)}
                    placeholder="Əli Məmmədov"
                  />
                </div>

                <div>
                  <Label htmlFor="instructorBio">Müəllim Haqqında</Label>
                  <Textarea
                    id="instructorBio"
                    value={formData.instructor.bio}
                    onChange={(e) => handleInstructorChange("bio", e.target.value)}
                    placeholder="10+ il təcrübəli SEO eksperti və rəqəmsal marketinq məsləhətçisi"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="instructorExperience">Təcrübə</Label>
                    <Input
                      id="instructorExperience"
                      value={formData.instructor.experience}
                      onChange={(e) => handleInstructorChange("experience", e.target.value)}
                      placeholder="10+ il"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructorStudents">Tələbə Sayı</Label>
                    <Input
                      id="instructorStudents"
                      value={formData.instructor.totalStudents}
                      onChange={(e) => handleInstructorChange("totalStudents", e.target.value)}
                      placeholder="5000+"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instructorCourses">Kurs Sayı</Label>
                    <Input
                      id="instructorCourses"
                      value={formData.instructor.totalCourses}
                      onChange={(e) => handleInstructorChange("totalCourses", e.target.value)}
                      placeholder="15"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructorAvatar">Müəllim Şəkli URL</Label>
                  <Input
                    id="instructorAvatar"
                    value={formData.instructor.avatar}
                    onChange={(e) => handleInstructorChange("avatar", e.target.value)}
                    placeholder="https://example.com/instructor.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Course Features */}
            <Card>
              <CardHeader>
                <CardTitle>Bu kursda:</CardTitle>
                <CardDescription>
                  Kursda olan xüsusiyyətləri əlavə edin (video müddəti, tapşırıq sayı və s.)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={feature}
                      onChange={(e) => updateArrayItem("features", index, e.target.value)}
                      placeholder="12 saat video məzmun"
                    />
                    {formData.features.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removeArrayItem("features", index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem("features")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Xüsusiyyət Əlavə Et
                </Button>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>Bu kursda nə öyrənəcəksiniz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.whatYouLearn.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={item}
                      onChange={(e) => updateArrayItem("whatYouLearn", index, e.target.value)}
                      placeholder="SEO-nun bütün aspektlərini mənimsəyəcəksiniz"
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
                  Öyrənəcək Əlavə Et
                </Button>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Tələblər</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={requirement}
                      onChange={(e) => updateArrayItem("requirements", index, e.target.value)}
                      placeholder="Kompüter və internet bağlantısı"
                    />
                    {formData.requirements.length > 1 && (
                      <Button variant="outline" size="icon" onClick={() => removeArrayItem("requirements", index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={() => addArrayItem("requirements")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Tələb Əlavə Et
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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

            {/* Preview */}
            {formData.title && (
              <Card>
                <CardHeader>
                  <CardTitle>Önizləmə</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{formData.title}</h3>
                    <p className="text-sm text-gray-600">{formData.description}</p>
                    {formData.selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {formData.selectedTags.map((tagId) => {
                          const tag = availableTags.find((t) => t.id === tagId)
                          return tag ? (
                            <Badge key={tag.id} className={`${getTagColorClass(tag.color)} text-xs`}>
                              {tag.name}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
