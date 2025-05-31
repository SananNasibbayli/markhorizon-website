import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function FeaturedBlogs() {
  // Sample blog data - in real app, this would come from your CMS/database
  const featuredBlogs = [
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
  ]

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

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Seçilmiş Məqalələr</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Ən populyar və faydalı məqalələrimizi kəşf edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
                <img src={blog.image || "/placeholder.svg"} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(blog.category)}>{blog.category}</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">{blog.excerpt}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(blog.date).toLocaleDateString("az-AZ")}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {blog.readTime}
                  </div>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                  <Button variant="outline" className="w-full group">
                    Oxumağa Davam Et
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/blogs">
            <Button size="lg" variant="outline">
              Bütün Məqalələri Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
