"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Trash2, Pencil, Plus, Eye, EyeOff, Shield } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function AdminUsersPage() {
  const [admins, setAdmins] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false)
  const [currentAdmin, setCurrentAdmin] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  })
  const [showPassword, setShowPassword] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchAdmins()
  }, [])

  async function fetchAdmins() {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("admin_users").select("*").order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching admins:", error)
      } else {
        setAdmins(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const deleteAdmin = async (id) => {
    if (admins.length <= 1) {
      toast({
        title: "Xəta",
        description: "Ən azı bir admin istifadəçisi olmalıdır.",
        variant: "destructive",
      })
      return
    }

    if (confirm("Bu admin istifadəçisini silmək istədiyinizə əminsiniz?")) {
      try {
        const { error } = await supabase.from("admin_users").delete().eq("id", id)

        if (error) {
          console.error("Error deleting admin:", error)
          toast({
            title: "Xəta",
            description: "Admin silinərkən xəta baş verdi.",
            variant: "destructive",
          })
        } else {
          setAdmins(admins.filter((admin) => admin.id !== id))
          toast({
            title: "Uğurlu",
            description: "Admin uğurla silindi.",
          })
        }
      } catch (error) {
        console.error("Error:", error)
        toast({
          title: "Xəta",
          description: "Admin silinərkən xəta baş verdi.",
          variant: "destructive",
        })
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value,
    })
  }

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "admin",
    })
    setShowPassword(false)
  }

  const openEditDialog = (admin) => {
    setCurrentAdmin(admin)
    setFormData({
      username: admin.username,
      email: admin.email,
      password: "",
      confirmPassword: "",
      role: admin.role,
    })
    setIsEditDialogOpen(true)
  }

  const openChangePasswordDialog = (admin) => {
    setCurrentAdmin(admin)
    setFormData({
      ...formData,
      password: "",
      confirmPassword: "",
    })
    setIsChangePasswordDialogOpen(true)
  }

  const handleAddAdmin = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Xəta",
        description: "Şifrələr uyğun gəlmir.",
        variant: "destructive",
      })
      return
    }

    try {
      // Şifrəni hash etmək üçün server action istifadə edə bilərik
      // Amma bu nümunədə sadəcə şifrəni göndərəcəyik
      // Real layihədə server action istifadə edin
      const { data, error } = await supabase.from("admin_users").insert([
        {
          username: formData.username,
          email: formData.email,
          password_hash: formData.password, // Real layihədə hash edin!
          role: formData.role,
        },
      ])

      if (error) {
        console.error("Error adding admin:", error)
        toast({
          title: "Xəta",
          description: "Admin əlavə edilərkən xəta baş verdi.",
          variant: "destructive",
        })
      } else {
        fetchAdmins()
        setIsAddDialogOpen(false)
        resetForm()
        toast({
          title: "Uğurlu",
          description: "Admin uğurla əlavə edildi.",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Xəta",
        description: "Admin əlavə edilərkən xəta baş verdi.",
        variant: "destructive",
      })
    }
  }

  const handleEditAdmin = async (e) => {
    e.preventDefault()

    try {
      const { error } = await supabase
        .from("admin_users")
        .update({
          username: formData.username,
          email: formData.email,
          role: formData.role,
        })
        .eq("id", currentAdmin.id)

      if (error) {
        console.error("Error updating admin:", error)
        toast({
          title: "Xəta",
          description: "Admin yenilənərkən xəta baş verdi.",
          variant: "destructive",
        })
      } else {
        fetchAdmins()
        setIsEditDialogOpen(false)
        resetForm()
        toast({
          title: "Uğurlu",
          description: "Admin uğurla yeniləndi.",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Xəta",
        description: "Admin yenilənərkən xəta baş verdi.",
        variant: "destructive",
      })
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Xəta",
        description: "Şifrələr uyğun gəlmir.",
        variant: "destructive",
      })
      return
    }

    try {
      // Şifrəni hash etmək üçün server action istifadə edə bilərik
      // Amma bu nümunədə sadəcə şifrəni göndərəcəyik
      // Real layihədə server action istifadə edin
      const { error } = await supabase
        .from("admin_users")
        .update({
          password_hash: formData.password, // Real layihədə hash edin!
        })
        .eq("id", currentAdmin.id)

      if (error) {
        console.error("Error changing password:", error)
        toast({
          title: "Xəta",
          description: "Şifrə dəyişdirilirkən xəta baş verdi.",
          variant: "destructive",
        })
      } else {
        setIsChangePasswordDialogOpen(false)
        resetForm()
        toast({
          title: "Uğurlu",
          description: "Şifrə uğurla dəyişdirildi.",
        })
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Xəta",
        description: "Şifrə dəyişdirilirkən xəta baş verdi.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Admin İstifadəçiləri</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Yeni Admin
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Admin axtar..."
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
                <TableHead>İstifadəçi adı</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Son giriş</TableHead>
                <TableHead>Yaradılma tarixi</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : filteredAdmins.length > 0 ? (
                filteredAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.username}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge
                        className={admin.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}
                      >
                        {admin.role === "admin" ? "Admin" : "Editor"}
                      </Badge>
                    </TableCell>
                    <TableCell>{admin.last_login ? formatDate(admin.last_login) : "-"}</TableCell>
                    <TableCell>{formatDate(admin.created_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(admin)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Redaktə et</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openChangePasswordDialog(admin)}>
                            <Shield className="mr-2 h-4 w-4" />
                            <span>Şifrəni dəyiş</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteAdmin(admin.id)}>
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
                    Admin tapılmadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Yeni Admin Əlavə Et Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Yeni Admin Əlavə Et</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddAdmin} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">İstifadəçi adı</Label>
                <Input id="username" name="username" value={formData.username} onChange={handleInputChange} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Şifrə</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Şifrəni təsdiqlə</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Rol</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false)
                  resetForm()
                }}
              >
                Ləğv et
              </Button>
              <Button type="submit">Əlavə et</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Admin Redaktə Et Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Admin Redaktə Et</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditAdmin} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-username">İstifadəçi adı</Label>
                <Input
                  id="edit-username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-role">Rol</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Rol seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false)
                  resetForm()
                }}
              >
                Ləğv et
              </Button>
              <Button type="submit">Yadda saxla</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Şifrə Dəyiş Dialog */}
      <Dialog open={isChangePasswordDialogOpen} onOpenChange={setIsChangePasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Şifrəni Dəyiş</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleChangePassword} className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="change-password">Yeni şifrə</Label>
                <div className="relative">
                  <Input
                    id="change-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="change-confirmPassword">Şifrəni təsdiqlə</Label>
                <Input
                  id="change-confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsChangePasswordDialogOpen(false)
                  resetForm()
                }}
              >
                Ləğv et
              </Button>
              <Button type="submit">Yadda saxla</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}
