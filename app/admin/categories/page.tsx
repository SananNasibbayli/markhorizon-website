"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample data - in real app, this would come from your database
const initialCategories = [
  {
    id: 1,
    name: "SEO",
    description: "Axtarış motorları optimizasiyası və organik trafik artırma strategiyaları",
    section: "Blog",
    slug: "seo",
    postCount: 15,
    status: "Aktiv",
    dateCreated: "2024-01-01",
  },
  {
    id: 2,
    name: "SMM",
    description: "Sosial media marketinqi və brendinq strategiyaları",
    section: "Blog",
    slug: "smm",
    postCount: 12,
    status: "Aktiv",
    dateCreated: "2024-01-01",
  },
  {
    id: 3,
    name: "Google Ads",
    description: "PPC kampaniyaları və ödənişli reklam strategiyaları",
    section: "Blog",
    slug: "google-ads",
    postCount: 8,
    status: "Aktiv",
    dateCreated: "2024-01-01",
  },
  {
    id: 4,
    name: "Mətn",
    description: "Mətn yaratma və redaktə alətləri",
    section: "AI Tools",
    slug: "metn",
    postCount: 25,
    status: "Aktiv",
    dateCreated: "2024-01-01",
  },
  {
    id: 5,
    name: "Şəkil",
    description: "Şəkil yaratma və redaktə alətləri",
    section: "AI Tools",
    slug: "sekil",
    postCount: 18,
    status: "Aktiv",
    dateCreated: "2024-01-01",
  },
  {
    id: 6,
    name: "Marketinq",
    description: "Marketinq və reklam alətləri",
    section: "Kurs",
    slug: "marketing",
    postCount: 10,
    status: "Aktiv",
    dateCreated: "2024-01-01",
  },
]

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    section: "",
    slug: "",
  })

  const sections = [
    { value: "Blog", label: "Blog" },
    { value: "AI Tools", label: "AI Tools" },
    { value: "Kurs", label: "Kurs" },
  ]

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.section.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Auto-generate slug from name
    if (field === "name" && !formData.slug) {
      const slug = value
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

  const openDialog = (category?: any) => {
    if (category) {
      setEditingCategory(category)
      setFormData({
        name: category.name,
        description: category.description,
        section: category.section,
        slug: category.slug,
      })
    } else {
      setEditingCategory(null)
      setFormData({
        name: "",
        description: "",
        section: "",
        slug: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingCategory) {
      // Update existing category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id
            ? {
                ...cat,
                ...formData,
              }
            : cat,
        ),
      )
    } else {
      // Add new category
      const newCategory = {
        id: Math.max(...categories.map((c) => c.id)) + 1,
        ...formData,
        postCount: 0,
        status: "Aktiv",
        dateCreated: new Date().toISOString().split("T")[0],
      }
      setCategories((prev) => [...prev, newCategory])
    }

    setIsDialogOpen(false)
    setEditingCategory(null)
    setFormData({
      name: "",
      description: "",
      section: "",
      slug: "",
    })
  }

  const deleteCategory = (id: number) => {
    if (confirm("Bu kateqoriyanı silmək istədiyinizə əminsiniz?")) {
      setCategories(categories.filter((category) => category.id !== id))
    }
  }

  const getSectionColor = (section: string) => {
    switch (section) {
      case "Blog":
        return "bg-blue-100 text-blue-800"
      case "AI Tools":
        return "bg-purple-100 text-purple-800"
      case "Kurs":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Kateqoriya İdarəetməsi</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Kateqoriya
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Kateqoriyanı Redaktə Et" : "Yeni Kateqoriya"}</DialogTitle>
                <DialogDescription>
                  {editingCategory
                    ? "Kateqoriya məlumatlarını yeniləyin"
                    : "Yeni kateqoriya yaradın və hansı bölməyə aid olduğunu seçin"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Kateqoriya Adı *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Kateqoriya adı"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => handleInputChange("slug", e.target.value)}
                    placeholder="kateqoriya-slug"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="section">Bölmə *</Label>
                  <Select value={formData.section} onValueChange={(value) => handleInputChange("section", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Bölmə seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map((section) => (
                        <SelectItem key={section.value} value={section.value}>
                          {section.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description">Təsvir</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Kateqoriya təsviri"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Ləğv Et
                </Button>
                <Button onClick={handleSave}>{editingCategory ? "Yenilə" : "Yarat"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Kateqoriyaları</CardTitle>
              <Tag className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.filter((c) => c.section === "Blog").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Tools Kateqoriyaları</CardTitle>
              <Tag className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.filter((c) => c.section === "AI Tools").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kurs Kateqoriyaları</CardTitle>
              <Tag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.filter((c) => c.section === "Kurs").length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Kateqoriya axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Bölmə</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Məzmun Sayı</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tarix</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{category.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-1">{category.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSectionColor(category.section)}>{category.section}</Badge>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">/{category.slug}</code>
                    </TableCell>
                    <TableCell>{category.postCount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {category.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{category.dateCreated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDialog(category)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Redaktə et</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteCategory(category.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Sil</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Kateqoriya tapılmadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}
