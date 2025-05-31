"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, FileText, Users, Settings, LogOut, Menu, X, Brain, BookOpen, Tag, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { checkAuth, logout } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    async function validateAuth() {
      const isAuth = await checkAuth()
      if (!isAuth) {
        router.push("/admin/login")
      } else {
        setIsLoading(false)
      }
    }

    validateAuth()
  }, [router])

  const handleLogout = async () => {
    await logout()
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">Yüklənir...</div>
      </div>
    )
  }

  const menuItems = [
    { icon: <LayoutDashboard className="mr-2 h-4 w-4" />, name: "Dashboard", path: "/admin/dashboard" },
    { icon: <FileText className="mr-2 h-4 w-4" />, name: "Bloqlar", path: "/admin/blogs" },
    { icon: <Brain className="mr-2 h-4 w-4" />, name: "AI Alətləri", path: "/admin/ai-tools" },
    { icon: <BookOpen className="mr-2 h-4 w-4" />, name: "Kurslar", path: "/admin/courses" },
    { icon: <Tag className="mr-2 h-4 w-4" />, name: "Teqlər", path: "/admin/tags" },
    { icon: <Tag className="mr-2 h-4 w-4" />, name: "Kateqoriyalar", path: "/admin/categories" },
    { icon: <Users className="mr-2 h-4 w-4" />, name: "İstifadəçilər", path: "/admin/users" },
    { icon: <Shield className="mr-2 h-4 w-4" />, name: "Admin İdarəetməsi", path: "/admin/admins" },
    { icon: <Settings className="mr-2 h-4 w-4" />, name: "Parametrlər", path: "/admin/settings" },
  ]

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - desktop */}
      <div className="hidden w-64 flex-shrink-0 bg-white dark:bg-gray-800 md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Çıxış
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden">
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 transition-opacity"
          style={{ display: isMobileMenuOpen ? "block" : "none" }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 transition duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b px-4">
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="pt-4">
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Çıxış
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="flex h-16 items-center justify-between px-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="ml-auto flex items-center">
              <span className="text-sm font-medium">Admin İstifadəçi</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
