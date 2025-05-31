"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import Link from "next/link"

// Sample data - in a real app, this would come from your database
const initialPosts = [
  { id: 1, title: "Veb Dizayn Trendləri 2023", status: "Dərc olunub", date: "2023-05-15" },
  { id: 2, title: "React və Next.js ilə Veb Sayt Yaratmaq", status: "Dərc olunub", date: "2023-06-22" },
  { id: 3, title: "SEO Optimizasiyası Haqqında", status: "Qaralama", date: "2023-07-10" },
  { id: 4, title: "Mobil Uyğunluq Niyə Vacibdir?", status: "Dərc olunub", date: "2023-08-05" },
  { id: 5, title: "Veb Təhlükəsizlik Əsasları", status: "Qaralama", date: "2023-09-18" },
]

export default function PostsPage() {
  const [posts, setPosts] = useState(initialPosts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const deletePost = (id: number) => {
    if (confirm("Bu məqaləni silmək istədiyinizə əminsiniz?")) {
      setPosts(posts.filter((post) => post.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Məqalələr</h1>
          <Link href="/admin/posts/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Məqalə
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Məqalə axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Başlıq</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tarix</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          post.status === "Dərc olunub"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Bax</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Redaktə et</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deletePost(post.id)}>
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
                  <TableCell colSpan={4} className="h-24 text-center">
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
