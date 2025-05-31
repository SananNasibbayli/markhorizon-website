import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { MousePointer } from "lucide-react"

export default function GoogleAdsBlogsPage() {
  const googleAdsBlogs = [
    {
      id: 3,
      title: "Google Ads Kampaniyalarında ROI-ni Necə Artırmaq?",
      excerpt:
        "PPC kampaniyalarınızın effektivliyini artırmaq və reklam xərclərini optimallaşdırmaq üçün strategiyalar.",
      category: "Google Ads",
      date: "2024-01-10",
      readTime: "10 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "google-ads-roi-artirma",
    },
    {
      id: 9,
      title: "Google Shopping Ads: E-ticarət üçün Güclü Alət",
      excerpt: "Məhsul reklamları ilə onlayn satışları artırmaq və rəqabətdə öndə olmaq üçün strategiyalar.",
      category: "Google Ads",
      date: "2023-12-25",
      readTime: "8 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "google-shopping-ads-guide",
    },
    {
      id: 10,
      title: "YouTube Ads: Video Reklamlarla Uğur",
      excerpt: "YouTube platformasında effektiv video reklam kampaniyaları yaratmaq və auditoriya cəlb etmək.",
      category: "Google Ads",
      date: "2023-12-20",
      readTime: "13 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "youtube-ads-strategiyasi",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <MousePointer className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Google Ads Məqalələri</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              PPC kampaniyaları və ödənişli reklam strategiyaları
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {googleAdsBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
