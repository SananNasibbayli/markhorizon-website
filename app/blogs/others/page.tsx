import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { Sparkles } from "lucide-react"

export default function OthersBlogsPage() {
  const othersBlogs = [
    {
      id: 4,
      title: "Email Marketinq Kampaniyalarının Effektivliyi",
      excerpt: "Email marketinq strategiyaları və müştəri məmnuniyyətini artırmaq üçün tövsiyələr.",
      category: "Digərləri",
      date: "2024-01-08",
      readTime: "7 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "email-marketing-strategiyalari",
    },
    {
      id: 11,
      title: "Content Marketing: Məzmun Strategiyaları",
      excerpt: "Effektiv məzmun marketinqi ilə auditoriya cəlb etmək və brend loyallığı yaratmaq.",
      category: "Digərləri",
      date: "2023-12-15",
      readTime: "14 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "content-marketing-guide",
    },
    {
      id: 12,
      title: "Affiliate Marketing: Passiv Gəlir Strategiyaları",
      excerpt: "Affiliate proqramları ilə əlavə gəlir əldə etmək və tərəfdaşlıq şəbəkələri qurmaq.",
      category: "Digərləri",
      date: "2023-12-10",
      readTime: "10 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "affiliate-marketing-guide",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Digər Məqalələr</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Email marketinq, content marketinq və digər rəqəmsal strategiyalar
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {othersBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
