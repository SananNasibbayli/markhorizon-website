import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Clock, Users, Star, BookOpen, Award, TrendingUp, Target } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "Tam SEO Kursu: Sıfırdan Ekspert Səviyyəsinə",
      description:
        "Google-da 1-ci sırada yer almaq üçün lazım olan bütün SEO strategiyalarını öyrənin. Praktiki layihələr və real nümunələr ilə.",
      instructor: "Əli Məmmədov",
      rating: 4.8,
      students: "2,340",
      duration: "12 saat",
      level: "Başlanğıc",
      image: "/placeholder.svg?height=200&width=350",
      category: "SEO",
      features: ["Açar söz tədqiqi", "On-page SEO", "Link building", "Texniki SEO"],
      bestseller: true,
      slug: "tam-seo-kursu",
    },
    {
      id: 2,
      title: "Instagram Marketinq Masterclass",
      description:
        "Instagram-da brendinizi qurun, followers artırın və satışları artırın. Reels, Stories və IGTV strategiyaları.",
      instructor: "Leyla Həsənova",
      rating: 4.7,
      students: "1,890",
      duration: "8 saat",
      level: "Orta",
      image: "/placeholder.svg?height=200&width=350",
      category: "SMM",
      features: ["Content strategiyası", "Hashtag optimizasiyası", "Instagram Ads", "Analytics"],
      bestseller: false,
      slug: "instagram-marketinq-masterclass",
    },
    {
      id: 3,
      title: "Google Ads PPC Kampaniya İdarəetməsi",
      description:
        "Google Ads ilə effektiv reklam kampaniyaları yaradın, ROI artırın və reklam xərclərini optimallaşdırın.",
      instructor: "Rəşad Quliyev",
      rating: 4.9,
      students: "3,120",
      duration: "15 saat",
      level: "İrəliləmiş",
      image: "/placeholder.svg?height=200&width=350",
      category: "Google Ads",
      features: ["Kampaniya quraşdırması", "Açar söz strategiyası", "Bid idarəetməsi", "Konversiya izləmə"],
      bestseller: true,
      slug: "google-ads-ppc",
    },
    {
      id: 4,
      title: "Facebook və Instagram Ads Kursu",
      description: "Meta platformalarında professional reklam kampaniyaları yaradın və hədəf auditoriyasına çatın.",
      instructor: "Nigar Əliyeva",
      rating: 4.6,
      students: "1,560",
      duration: "10 saat",
      level: "Başlanğıc",
      image: "/placeholder.svg?height=200&width=350",
      category: "SMM",
      features: ["Pixel quraşdırması", "Auditoriya yaratma", "Kreativ strategiya", "Kampaniya optimallaşdırması"],
      bestseller: false,
      slug: "facebook-instagram-ads-kursu",
    },
    {
      id: 5,
      title: "Email Marketinq və Avtomatlaşdırma",
      description: "Email kampaniyaları yaradın, müştəri bazası qurun və avtomatik satış hunisi quraşdırın.",
      instructor: "Tural Məmmədov",
      rating: 4.5,
      students: "980",
      duration: "6 saat",
      level: "Orta",
      image: "/placeholder.svg?height=200&width=350",
      category: "Digərləri",
      features: ["Email dizayn", "Segmentasiya", "A/B testing", "Avtomatlaşdırma"],
      bestseller: false,
      slug: "email-marketinq-avtomatlasdirma",
    },
    {
      id: 6,
      title: "Rəqəmsal Marketinq Strategiyası",
      description: "Tam rəqəmsal marketinq strategiyası hazırlayın və bütün kanalları inteqrasiya edin.",
      instructor: "Kamran Həsənov",
      rating: 4.8,
      students: "2,780",
      duration: "20 saat",
      level: "İrəliləmiş",
      image: "/placeholder.svg?height=200&width=350",
      category: "Digərləri",
      features: ["Strategiya hazırlama", "Kanal inteqrasiyası", "ROI hesablama", "Performans analizi"],
      bestseller: true,
      slug: "reqemsal-marketinq-strategiyasi",
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Başlanğıc":
        return "bg-green-100 text-green-800"
      case "Orta":
        return "bg-yellow-100 text-yellow-800"
      case "İrəliləmiş":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Rəqəmsal Marketinq Kursları</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Ekspertlərdən öyrənin və karyeranızı yeni səviyyəyə çıxarın
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Kurs axtar..." className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative"
              >
                {course.bestseller && (
                  <div className="absolute top-0 left-0 z-10">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      Bestseller
                    </div>
                  </div>
                )}

                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                    <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{course.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Müəllim: </span>
                    {course.instructor}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students} tələbə</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-700">Kursda öyrənəcəklər:</div>
                    <div className="grid grid-cols-2 gap-1">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-600">
                          <Target className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2 border-t border-gray-100 pt-4">
                  <Link href={`/courses/${course.slug}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      Ətraflı Məlumat
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    Kursa Geç
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">Kurs</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">15K+</div>
              <div className="text-sm text-gray-600">Tələbə</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">4.7</div>
              <div className="text-sm text-gray-600">Orta Reytinq</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">95%</div>
              <div className="text-sm text-gray-600">Tamamlama Dərəcəsi</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
