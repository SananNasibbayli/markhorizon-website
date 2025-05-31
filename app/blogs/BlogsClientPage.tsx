"use client"

import { Suspense } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { getBlogPosts, getCategories } from "@/lib/db"
import { useState, useEffect } from "react"

export default function BlogsClientPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const category = searchParams.category as string | undefined
  const searchQuery = searchParams.q as string | undefined

  const [blogPosts, setBlogPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogPostsData, categoriesData] = await Promise.all([
          getBlogPosts({
            limit: 20,
            category: category ? Number.parseInt(category) : undefined,
            searchQuery: searchQuery || "",
          }),
          getCategories("Blog"),
        ])

        setBlogPosts(blogPostsData)
        setCategories(categoriesData)
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [category, searchQuery])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Bütün Bloqlar</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Rəqəmsal marketinq dünyasından ən son məqalələr və ekspert məsləhətləri
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <form action="/blogs" method="GET">
                <Input name="q" placeholder="Məqalə axtar..." className="pl-10" defaultValue={searchQuery || ""} />
              </form>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge
                variant={!category ? "default" : "secondary"}
                className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
                onClick={() => (window.location.href = "/blogs")}
              >
                Hamısı
              </Badge>
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={category === cat.id.toString() ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-blue-600 hover:text-white transition-colors"
                  onClick={() => (window.location.href = `/blogs?category=${cat.id}`)}
                >
                  {cat.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Suspense fallback={<div>Məqalələr yüklənir...</div>}>
            {!loading && blogPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                  ))}
                </div>

                {/* Load More */}
                {blogPosts.length >= 20 && (
                  <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                      Daha Çox Yüklə
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Axtarış kriteriyalarına uyğun məqalə tapılmadı.</p>
              </div>
            )}
          </Suspense>
        </div>
      </section>

      <Footer />
    </div>
  )
}
