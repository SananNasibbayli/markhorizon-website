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
const initialProducts = [
  { id: 1, name: "Laptop Pro X", price: "1999.99", stock: 45, category: "Elektronika" },
  { id: 2, name: "Smartfon Y23", price: "899.99", stock: 120, category: "Elektronika" },
  { id: 3, name: "Dəri Çanta", price: "199.99", stock: 35, category: "Aksesuar" },
  { id: 4, name: "Kişi Köynəyi", price: "59.99", stock: 200, category: "Geyim" },
  { id: 5, name: "Smart Saat", price: "299.99", stock: 78, category: "Elektronika" },
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deleteProduct = (id: number) => {
    if (confirm("Bu məhsulu silmək istədiyinizə əminsiniz?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Məhsullar</h1>
          <Link href="/admin/products/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Məhsul
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Məhsul axtar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Qiymət</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Kateqoriya</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>{product.category}</TableCell>
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
                          <DropdownMenuItem onClick={() => deleteProduct(product.id)}>
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
                  <TableCell colSpan={5} className="h-24 text-center">
                    Məhsul tapılmadı.
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
