import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { Search } from "lucide-react"

export default function SEOBlogsPage() {
  const seoBlogs = [
    {
      id: 1,
      title: "2024-cü ildə SEO Trendləri: Nələrə Diqqət Etməli?",
      excerpt:
        "Google-un ən son alqoritmləri və SEO strategiyalarında baş verən dəyişikliklər haqqında ətraflı məlumat.",
      category: "SEO",
      date: "2024-01-15",
      readTime: "8 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "2024-seo-trendleri",
    },
    {
      id: 6,
      title: "Local SEO: Yerli Bizneslərin Uğur Formulası",
      excerpt: "Yerli axtarışlarda üst sıralarda yer almaq və yerli müştəriləri cəlb etmək üçün strategiyalar.",
      category: "SEO",
      date: "2024-01-03",
      readTime: "12 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "local-seo-strategiyalari",
    },
    {
      id: 7,
      title: "Technical SEO: Saytın Texniki Optimizasiyası",
      excerpt: "Saytın texniki aspektlərini optimallaşdıraraq axtarış motorlarında daha yaxşı nəticələr əldə edin.",
      category: "SEO",
      date: "2024-01-01",
      readTime: "15 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "technical-seo-guide",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">SEO Məqalələri</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Axtarış motorları optimizasiyası və organik trafik artırma strategiyaları
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seoBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
