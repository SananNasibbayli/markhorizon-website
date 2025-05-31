"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash2, Eye, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample data - in real app, this would come from your database
const initialBlogs = [
  {
    id: 1,
    title: "2024-cü ildə SEO Trendləri",
    category: "SEO",
    status: "Dərc olunub",
    date: "2024-01-15",
    slug: "2024-seo-trendleri",
    metaTitle: "2024-cü ildə SEO Trendləri: Nələrə Diqqət Etməli?",
    metaDescription:
      "Google-un ən son alqoritmləri və SEO strategiyalarında baş verən dəyişikliklər haqqında ətraflı məlumat.",
    views: 1250,
  },
  {
    id: 2,
    title: "Instagram Reels Strategiyası",
    category: "SMM",
    status: "Dərc olunub",
    date: "2024-01-12",
    slug: "instagram-reels-strategiyasi",
    metaTitle: "Instagram Reels ilə Brendinizi Necə Tanıtmalı?",
    metaDescription: "Sosial mediada viral məzmun yaratmaq və auditoriya ilə əlaqə qurmaq üçün praktiki məsləhətlər.",
    views: 890,
  },
  {
    id: 3,
    title: "Google Ads ROI Artırma",
    category: "Google Ads",
    status: "Qaralama",
    date: "2024-01-10",
    slug: "google-ads-roi-artirma",
    metaTitle: "Google Ads Kampaniyalarında ROI-ni Necə Artırmaq?",
    metaDescription:
      "PPC kampaniyalarınızın effektivliyini artırmaq və reklam xərclərini optimallaşdırmaq üçün strategiyalar.",
    views: 0,
  },
]

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deleteBlog = (id: number) => {
    if (confirm("Bu məqaləni silmək istədiyinizə əminsiniz?")) {
      setBlogs(blogs.filter((blog) => blog.id !== id))
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SEO":
        return "bg-blue-100 text-blue-800"
      case "SMM":
        return "bg-pink-100 text-pink-800"
      case "Google Ads":
        return "bg-green-100 text-green-800"
      default:
        return "bg-purple-100 text-purple-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Dərc olunub":
        return "bg-green-100 text-green-800"
      case "Qaralama":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog İdarəetməsi</h1>
          <Link href="/admin/blogs/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Məqalə
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Məqalə axtar..."
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
                <TableHead>Başlıq</TableHead>
                <TableHead>Kateqoriya</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Baxış</TableHead>
                <TableHead>Tarix</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{blog.title}</div>
                        <div className="text-sm text-gray-500">/{blog.slug}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(blog.category)}>{blog.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(blog.status)}>{blog.status}</Badge>
                    </TableCell>
                    <TableCell>{blog.views}</TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${blog.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Bax</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/blogs/edit/${blog.id}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Redaktə et</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteBlog(blog.id)}>
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
                    Məqalə tapılmadı.
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
