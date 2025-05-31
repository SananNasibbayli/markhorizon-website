"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import SubscriptionForm from "@/components/subscription-form"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const blogCategories = [
    { name: "SEO", href: "/blogs/seo" },
    { name: "SMM", href: "/blogs/smm" },
    { name: "Google Ads", href: "/blogs/google-ads" },
    { name: "Digərləri", href: "/blogs/others" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/markhorizon-logo.png" alt="MarkHorizon" className="h-16" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Ana Səhifə
            </Link>

            {/* Blogs Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                Bloqlar <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {blogCategories.map((category) => (
                  <DropdownMenuItem key={category.href} asChild>
                    <Link href={category.href}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/ai-tools" className="text-gray-700 hover:text-blue-600 transition-colors">
              Süni İntellektlər
            </Link>

            <Link href="/courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kurslar
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Əlaqə
            </Link>
          </nav>

          {/* Subscription Button */}
          <SubscriptionForm />
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Ana Səhifə
            </Link>

            <div className="space-y-2">
              <div className="text-gray-900 font-medium">Bloqlar</div>
              {blogCategories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className="block pl-4 text-gray-600 hover:text-blue-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link
              href="/ai-tools"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Süni İntellektlər
            </Link>

            <Link
              href="/courses"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Kurslar
            </Link>

            <Link
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Əlaqə
            </Link>

            {/* Mobile Subscription Button */}
            <div className="pt-2">
              <SubscriptionForm />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
