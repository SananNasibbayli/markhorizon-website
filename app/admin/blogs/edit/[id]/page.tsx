"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

// Sample blog data - in real app, this would come from your database
const blogData = {
  1: {
    id: 1,
    title: "2024-cü ildə SEO Trendləri",
    slug: "2024-seo-trendleri",
    excerpt: "Google-un ən son alqoritmləri və SEO strategiyalarında baş verən dəyişikliklər haqqında ətraflı məlumat.",
    content: `<h2>Giriş</h2>
<p>2024-cü il SEO dünyasında böyük dəyişikliklər gətirdi...</p>
<h2>AI və Maşın Öyrənməsinin Təsiri</h2>
<p>Google-un RankBrain və BERT alqoritmləri artıq daha da təkmilləşib...</p>`,
    category: "SEO",
    status: "Dərc olunub",
    metaTitle: "2024-cü ildə SEO Trendləri: Nələrə Diqqət Etməli?",
    metaDescription:
      "Google-un ən son alqoritmləri və SEO strategiyalarında baş verən dəyişikliklər haqqında ətraflı məlumat.",
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: "SEO, Google, Alqoritmlər, 2024",
  },
}

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default function EditBlogPage({ params }: EditBlogPageProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "Qaralama",
    metaTitle: "",
    metaDescription: "",
    featuredImage: "",
    tags: "",
  })

  const categories = [
    { value: "SEO", label: "SEO" },
    { value: "SMM", label: "SMM" },
    { value: "Google Ads", label: "Google Ads" },
    { value: "Digərləri", label: "Digərləri" },
  ]

  useEffect(() => {
    // Load blog data
    const blog = blogData[params.id as keyof typeof blogData]
    if (blog) {
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        category: blog.category,
        status: blog.status,
        metaTitle: blog.metaTitle,
        metaDescription: blog.metaDescription,
        featuredImage: blog.featuredImage,
        tags: blog.tags,
      })
    }
  }, [params.id])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = (status: string) => {
    const blogData = {
      ...formData,
      status,
      updatedDate: new Date().toISOString().split("T")[0],
    }

    console.log("Updated blog data:", blogData)
    // Here you would save to your database

    router.push("/admin/blogs")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/blogs">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Məqaləni Redaktə Et</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => handleSave("Qaralama")}>
              <Save className="mr-2 h-4 w-4" />
              Qaralama Olaraq Saxla
            </Button>
            <Button onClick={() => handleSave("Dərc olunub")}>
              <Eye className="mr-2 h-4 w-4" />
              Dərc Et
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Məqalə Məzmunu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Başlıq *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Məqalənin başlığını daxil edin"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="url-slug-buraya"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">URL: /blog/{formData.slug || "url-slug"}</p>
                </div>

                <div>
                  <Label htmlFor="excerpt">Qısa Təsvir</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange("excerpt", e.target.value)}
                    placeholder="Məqalənin qısa təsvirini yazın"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Məzmun *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    placeholder="Məqalənin tam məzmununu yazın. HTML istifadə edə bilərsiniz."
                    rows={15}
                    className="font-mono"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    HTML formatında yaza bilərsiniz: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; və s.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Parametrləri</CardTitle>
                <CardDescription>Axtarış motorları üçün optimizasiya</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                    placeholder="SEO üçün başlıq"
                    maxLength={60}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.metaTitle.length}/60 simvol</p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                    placeholder="Axtarış nəticələrində görünəcək təsvir"
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.metaDescription.length}/160 simvol</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dərc Parametrləri</CardTitle>
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
                      <SelectItem value="Qaralama">Qaralama</SelectItem>
                      <SelectItem value="Dərc olunub">Dərc olunub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tags">Etiketlər</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    placeholder="etiket1, etiket2, etiket3"
                  />
                  <p className="text-sm text-gray-500 mt-1">Vergüllə ayırın</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Şəkil</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="featuredImage">Əsas Şəkil URL</Label>
                  <Input
                    id="featuredImage"
                    value={formData.featuredImage}
                    onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <img
                        src={formData.featuredImage || "/placeholder.svg"}
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
