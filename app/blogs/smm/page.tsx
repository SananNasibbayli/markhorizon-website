import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import { Share2 } from "lucide-react"

export default function SMMBlogsPage() {
  const smmBlogs = [
    {
      id: 2,
      title: "Instagram Reels ilə Brendinizi Necə Tanıtmalı?",
      excerpt: "Sosial mediada viral məzmun yaratmaq və auditoriya ilə əlaqə qurmaq üçün praktiki məsləhətlər.",
      category: "SMM",
      date: "2024-01-12",
      readTime: "6 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "instagram-reels-strategiyasi",
    },
    {
      id: 5,
      title: "TikTok Marketinq: Gənc Auditoriyaya Necə Çatmaq?",
      excerpt: "TikTok platformasında effektiv marketinq strategiyaları və məzmun yaratma yolları.",
      category: "SMM",
      date: "2024-01-05",
      readTime: "9 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "tiktok-marketing-strategiyasi",
    },
    {
      id: 8,
      title: "LinkedIn B2B Marketinq Strategiyaları",
      excerpt: "Professional şəbəkədə biznes əlaqələri qurmaq və B2B satışları artırmaq üçün metodlar.",
      category: "SMM",
      date: "2023-12-28",
      readTime: "11 dəq",
      image: "/placeholder.svg?height=200&width=400",
      slug: "linkedin-b2b-marketing",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Share2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">SMM Məqalələri</h1>
            <p className="text-xl text-pink-100 max-w-2xl mx-auto">
              Sosial media marketinqi və brendinq strategiyaları
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {smmBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
