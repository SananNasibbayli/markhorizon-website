import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star } from "lucide-react"
import Link from "next/link"

export default function FeaturedCourses() {
  const courses = [
    {
      id: 1,
      title: "SEO Əsasları və İrəliləmiş Strategiyalar",
      description: "Sıfırdan başlayaraq professional SEO mütəxəssisi olun",
      image: "/placeholder.svg?height=200&width=300&text=SEO+Course",
      duration: "8 həftə",
      students: 234,
      rating: 4.8,
      instructor: "Əli Məmmədov",
      slug: "seo-esaslari-ve-irelilemis-strategiyalar",
    },
    {
      id: 2,
      title: "SMM və Sosial Media Marketinqi",
      description: "Instagram, Facebook və TikTok-da professional kampaniyalar",
      image: "/placeholder.svg?height=200&width=300&text=SMM+Course",
      duration: "6 həftə",
      students: 189,
      rating: 4.9,
      instructor: "Leyla Həsənova",
      slug: "smm-ve-sosial-media-marketinqi",
    },
    {
      id: 3,
      title: "Google Ads Mastery",
      description: "Google Ads ilə effektiv reklam kampaniyaları yaradın",
      image: "/placeholder.svg?height=200&width=300&text=Google+Ads",
      duration: "5 həftə",
      students: 156,
      rating: 4.7,
      instructor: "Rəşad Quliyev",
      slug: "google-ads-mastery",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Populyar Kurslar</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Rəqəmsal marketinq sahəsində professional bacarıqlar əldə edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader className="flex-grow">
                <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                <CardDescription className="text-sm h-12">{course.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} tələbə
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="text-sm">
                    <span className="font-medium">Müəllif: </span>
                    <span className="text-blue-600">{course.instructor}</span>
                  </div>
                  <Link href={`/course/${course.slug}`} className="block w-full">
                    <Button className="w-full">Ətraflı</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/courses">
            <Button variant="outline" size="lg">
              Bütün Kursları Gör
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
