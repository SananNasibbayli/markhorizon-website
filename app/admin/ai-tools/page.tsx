"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample data - in real app, this would come from your database
const initialAITools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "OpenAI tərəfindən hazırlanmış güclü dil modeli",
    category: "Mətn",
    rating: 4.8,
    pricing: "Pulsuz/Ödənişli",
    url: "https://chat.openai.com",
    users: "100M+",
    popular: true,
    status: "Aktiv",
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    name: "Midjourney",
    description: "AI ilə yüksək keyfiyyətli şəkillər yaratma",
    category: "Şəkil",
    rating: 4.7,
    pricing: "Ödənişli",
    url: "https://midjourney.com",
    users: "10M+",
    popular: true,
    status: "Aktiv",
    dateAdded: "2024-01-12",
  },
  {
    id: 3,
    name: "Jasper AI",
    description: "Marketinq məzmunu yaratma alətı",
    category: "Marketinq",
    rating: 4.5,
    pricing: "Ödənişli",
    url: "https://jasper.ai",
    users: "5M+",
    popular: false,
    status: "Aktiv",
    dateAdded: "2024-01-10",
  },
]

export default function AdminAIToolsPage() {
  const [aiTools, setAITools] = useState(initialAITools)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTools = aiTools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deleteTool = (id: number) => {
    if (confirm("Bu AI alətini silmək istədiyinizə əminsiniz?")) {
      setAITools(aiTools.filter((tool) => tool.id !== id))
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mətn":
        return "bg-blue-100 text-blue-800"
      case "Şəkil":
        return "bg-purple-100 text-purple-800"
      case "Video":
        return "bg-red-100 text-red-800"
      case "Marketinq":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">AI Alətləri İdarəetməsi</h1>
          <Link href="/admin/ai-tools/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni AI Alət
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="AI alət axtar..."
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
                <TableHead>Kateqoriya</TableHead>
                <TableHead>Reytinq</TableHead>
                <TableHead>Qiymət</TableHead>
                <TableHead>İstifadəçilər</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => (
                  <TableRow key={tool.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div>
                          <div className="font-medium flex items-center">
                            {tool.name}
                            {tool.popular && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                Populyar
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1">{tool.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(tool.category)}>{tool.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        {tool.rating}
                      </div>
                    </TableCell>
                    <TableCell>{tool.pricing}</TableCell>
                    <TableCell>{tool.users}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {tool.status}
                      </Badge>
                    </TableCell>
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
                            <a href={tool.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              <span>Sayta Get</span>
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/ai-tools/edit/${tool.id}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Redaktə et</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteTool(tool.id)}>
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
                    AI alət tapılmadı.
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
