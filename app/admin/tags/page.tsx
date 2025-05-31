"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, MoreHorizontal, Pencil, Trash2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { getTags, addTag, updateTag, deleteTag, getTagColorClass, type TagType } from "@/lib/tags"

// Sample data - in real app, this would come from your database
// const initialTags = [
//   {
//     id: 1,
//     name: "SEO",
//     color: "blue",
//     sections: ["Blog", "Kurs"],
//     usageCount: 25,
//     dateCreated: "2024-01-01",
//   },
//   {
//     id: 2,
//     name: "Başlanğıc",
//     color: "green",
//     sections: ["Kurs"],
//     usageCount: 15,
//     dateCreated: "2024-01-01",
//   },
//   {
//     id: 3,
//     name: "Bestseller",
//     color: "orange",
//     sections: ["Kurs"],
//     usageCount: 8,
//     dateCreated: "2024-01-01",
//   },
//   {
//     id: 4,
//     name: "SMM",
//     color: "pink",
//     sections: ["Blog", "Kurs"],
//     usageCount: 18,
//     dateCreated: "2024-01-01",
//   },
//   {
//     id: 5,
//     name: "Mətn",
//     color: "purple",
//     sections: ["AI Tools"],
//     usageCount: 30,
//     dateCreated: "2024-01-01",
//   },
// ]

export default function AdminTagsPage() {
  const [tags, setTags] = useState<TagType[]>([])

  // useEffect əlavə et component yüklənəndə teqləri yükləmək üçün
  useEffect(() => {
    setTags(getTags())
  }, [])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    color: "blue",
    sections: [] as string[],
  })

  const colors = [
    { value: "blue", label: "Mavi", class: "bg-blue-100 text-blue-800" },
    { value: "green", label: "Yaşıl", class: "bg-green-100 text-green-800" },
    { value: "orange", label: "Narıncı", class: "bg-orange-100 text-orange-800" },
    { value: "pink", label: "Çəhrayı", class: "bg-pink-100 text-pink-800" },
    { value: "purple", label: "Bənövşəyi", class: "bg-purple-100 text-purple-800" },
    { value: "red", label: "Qırmızı", class: "bg-red-100 text-red-800" },
    { value: "yellow", label: "Sarı", class: "bg-yellow-100 text-yellow-800" },
    { value: "gray", label: "Boz", class: "bg-gray-100 text-gray-800" },
  ]

  const sections = ["Blog", "Kurs", "AI Tools"]

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSectionChange = (section: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      sections: checked ? [...prev.sections, section] : prev.sections.filter((s) => s !== section),
    }))
  }

  const openDialog = (tag?: any) => {
    if (tag) {
      setEditingTag(tag)
      setFormData({
        name: tag.name,
        color: tag.color,
        sections: tag.sections,
      })
    } else {
      setEditingTag(null)
      setFormData({
        name: "",
        color: "blue",
        sections: [],
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingTag) {
      // Update existing tag
      updateTag(editingTag.id, formData)
      setTags(getTags()) // Yenilənmiş teqləri yüklə
    } else {
      // Add new tag
      const newTag = addTag(formData)
      setTags(getTags()) // Yenilənmiş teqləri yüklə
    }

    setIsDialogOpen(false)
    setEditingTag(null)
    setFormData({
      name: "",
      color: "blue",
      sections: [],
    })
  }

  const handleDeleteTag = (id: number) => {
    if (confirm("Bu teqi silmək istədiyinizə əminsiniz?")) {
      deleteTag(id)
      setTags(getTags()) // Yenilənmiş teqləri yüklə
    }
  }

  // getColorClass funksiyasını sil və əvəzinə getTagColorClass istifadə et

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Teq İdarəetməsi</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => openDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Yeni Teq
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingTag ? "Teqi Redaktə Et" : "Yeni Teq"}</DialogTitle>
                <DialogDescription>
                  {editingTag
                    ? "Teq məlumatlarını yeniləyin"
                    : "Yeni teq yaradın və hansı bölmələrə aid olduğunu seçin"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="name">Teq Adı *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Teq adı"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="color">Rəng *</Label>
                  <Select value={formData.color} onValueChange={(value) => handleInputChange("color", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Rəng seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded mr-2 ${color.class}`}></div>
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Bölmələr *</Label>
                  <div className="space-y-2 mt-2">
                    {sections.map((section) => (
                      <div key={section} className="flex items-center space-x-2">
                        <Checkbox
                          id={section}
                          checked={formData.sections.includes(section)}
                          onCheckedChange={(checked) => handleSectionChange(section, checked as boolean)}
                        />
                        <Label htmlFor={section}>{section}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Ləğv Et
                </Button>
                <Button onClick={handleSave}>{editingTag ? "Yenilə" : "Yarat"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ümumi Teqlər</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tags.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Blog Teqləri</CardTitle>
              <Search className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tags.filter((t) => t.sections.includes("Blog")).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Kurs Teqləri</CardTitle>
              <Search className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tags.filter((t) => t.sections.includes("Kurs")).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Tools Teqləri</CardTitle>
              <Search className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tags.filter((t) => t.sections.includes("AI Tools")).length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Teq axtar..."
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
                <TableHead>Rəng</TableHead>
                <TableHead>Bölmələr</TableHead>
                <TableHead>İstifadə Sayı</TableHead>
                <TableHead>Tarix</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => (
                  <TableRow key={tag.id}>
                    <TableCell>
                      <Badge className={getTagColorClass(tag.color)}>{tag.name}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded mr-2 ${getTagColorClass(tag.color)}`}></div>
                        {colors.find((c) => c.value === tag.color)?.label}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {tag.sections.map((section) => (
                          <Badge key={section} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{tag.usageCount}</TableCell>
                    <TableCell>{tag.dateCreated}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDialog(tag)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Redaktə et</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDeleteTag(tag.id)}>
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    Teq tapılmadı.
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
