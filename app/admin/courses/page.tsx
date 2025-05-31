"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, MoreHorizontal, Pencil, Trash2, Search, Star, Users, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Sample data - in real app, this would come from your database
const initialCourses = [
  {
    id: 1,
    title: "Tam SEO Kursu: Sıfırdan Ekspert Səviyyəsinə",
    instructor: "Əli Məmmədov",
    category: "SEO",
    level: "Başlanğıc",
    price: "₼149",
    originalPrice: "₼299",
    rating: 4.8,
    students: "2,340",
    duration: "12 saat",
    status: "Aktiv",
    bestseller: true,
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    title: "Instagram Marketinq Masterclass",
    instructor: "Leyla Həsənova",
    category: "SMM",
    level: "Orta",
    price: "₼99",
    originalPrice: "₼199",
    rating: 4.7,
    students: "1,890",
    duration: "8 saat",
    status: "Aktiv",
    bestseller: false,
    dateAdded: "2024-01-12",
  },
  {
    id: 3,
    title: "Google Ads PPC Kampaniya İdarəetməsi",
    instructor: "Rəşad Quliyev",
    category: "Google Ads",
    level: "İrəliləmiş",
    price: "₼199",
    originalPrice: "₼399",
    rating: 4.9,
    students: "3,120",
    duration: "15 saat",
    status: "Qaralama",
    bestseller: true,
    dateAdded: "2024-01-10",
  },
]

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deleteCourse = (id: number) => {
    if (confirm("Bu kursu silmək istədiyinizə əminsiniz?")) {
      setCourses(courses.filter((course) => course.id !== id))
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Başlanğıc":
        return "bg-green-100 text-green-800"
      case "Orta":
        return "bg-yellow-100 text-yellow-800"
      case "İrəliləmiş":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
      case "Aktiv":
        return "bg-green-100 text-green-800"
      case "Qaralama":
        return "bg-yellow-100 text-yellow-800"
      case "Deaktiv":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Kurs İdarəetməsi</h1>
          <Link href="/admin/courses/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Kurs
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Kurs axtar..."
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
                <TableHead>Kurs</TableHead>
                <TableHead>Müəllim</TableHead>
                <TableHead>Kateqoriya</TableHead>
                <TableHead>Səviyyə</TableHead>
                <TableHead>Qiymət</TableHead>
                <TableHead>Reytinq</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center">
                          {course.title}
                          {course.bestseller && (
                            <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-700">
                              Bestseller
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-4 mt-1">
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {course.students}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{course.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-1">{course.originalPrice}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                        {course.rating}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(course.status)}>{course.status}</Badge>
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
                            <Link href={`/admin/courses/edit/${course.id}`}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Redaktə et</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteCourse(course.id)}>
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
                  <TableCell colSpan={8} className="h-24 text-center">
                    Kurs tapılmadı.
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
