import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Users, Star, Award, CheckCircle, Play } from "lucide-react"
import Link from "next/link"

// Sample course data - in real app, this would come from your database
const courses = {
  "tam-seo-kursu": {
    id: 1,
    title: "Tam SEO Kursu: Sıfırdan Ekspert Səviyyəsinə",
    description:
      "Google-da 1-ci sırada yer almaq üçün lazım olan bütün SEO strategiyalarını öyrənin. Praktiki layihələr və real nümunələr ilə.",
    longDescription: `Bu kursda SEO-nun bütün aspektlərini əhatə edəcəyik. Sıfırdan başlayaraq ekspert səviyyəsinə qədər bütün lazımi bilikləri əldə edəcəksiniz. 

    Kurs praktiki yanaşma ilə qurulub və hər mövzu real layihələrlə dəstəklənir. Google-un ən son alqoritmlərini nəzərə alaraq hazırlanmış strategiyalar öyrənəcəksiniz.`,
    instructor: {
      name: "Əli Məmmədov",
      bio: "10+ il təcrübəli SEO eksperti və rəqəmsal marketinq məsləhətçisi",
      avatar: "/placeholder.svg?height=80&width=80",
      experience: "10+ il",
      students: "5000+",
      courses: "15",
    },
    rating: 4.8,
    reviewCount: 1240,
    students: "2,340",
    duration: "12 saat",
    level: "Başlanğıc",
    price: "₼149",
    originalPrice: "₼299",
    image: "/placeholder.svg?height=400&width=600",
    category: "SEO",
    language: "Azərbaycan dili",
    lastUpdated: "2024-01-15",
    features: [
      "12 saat video məzmun",
      "50+ praktiki tapşırıq",
      "Ömürboyu giriş",
      "Sertifikat",
      "Mobil və desktop giriş",
      "30 gün geri qaytarma zəmanəti",
    ],
    curriculum: [
      {
        title: "SEO-ya Giriş",
        duration: "45 dəq",
        lessons: [
          "SEO nədir və niyə vacibdir?",
          "Axtarış motorları necə işləyir?",
          "SEO növləri: On-page, Off-page, Technical",
          "SEO alətlərinə giriş",
        ],
      },
      {
        title: "Açar Söz Tədqiqi",
        duration: "90 dəq",
        lessons: [
          "Açar söz tədqiqinin əsasları",
          "Google Keyword Planner istifadəsi",
          "Rəqib analizi",
          "Uzun quyruqlu açar sözlər",
          "Açar söz strategiyası hazırlama",
        ],
      },
      {
        title: "On-Page SEO",
        duration: "120 dəq",
        lessons: [
          "Title tag və meta description",
          "Header tagları (H1, H2, H3)",
          "URL strukturu",
          "Daxili linklər",
          "Şəkil optimizasiyası",
          "Schema markup",
        ],
      },
      {
        title: "Texniki SEO",
        duration: "100 dəq",
        lessons: [
          "Sayt sürəti optimizasiyası",
          "Mobil uyğunluq",
          "XML sitemap",
          "Robots.txt",
          "SSL sertifikatı",
          "Core Web Vitals",
        ],
      },
      {
        title: "Off-Page SEO və Link Building",
        duration: "80 dəq",
        lessons: [
          "Backlink strategiyaları",
          "Guest posting",
          "Sosial siqnallar",
          "Local SEO",
          "Link building alətləri",
        ],
      },
      {
        title: "SEO Analitika və Hesabatlar",
        duration: "60 dəq",
        lessons: [
          "Google Analytics quraşdırması",
          "Google Search Console",
          "SEO KPI-ları",
          "Hesabat hazırlama",
          "ROI hesablama",
        ],
      },
    ],
    requirements: ["Kompüter və internet bağlantısı", "Əsas kompüter bilikləri", "Öyrənmək istəyi və səbir"],
    whatYouLearn: [
      "SEO-nun bütün aspektlərini mənimsəyəcəksiniz",
      "Google-da yüksək reytinq əldə etmək üçün strategiyalar",
      "Açar söz tədqiqi və rəqib analizi",
      "Texniki SEO problemlərini həll etmək",
      "Link building strategiyaları",
      "SEO alətlərindən professional istifadə",
      "Real layihələrdə təcrübə qazanacaqsınız",
    ],
  },
}

interface CoursePageProps {
  params: {
    slug: string
  }
}

export default function CoursePage({ params }: CoursePageProps) {
  const course = courses[params.slug as keyof typeof courses]

  if (!course) {
    notFound()
  }

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

      {/* Breadcrumb */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link href="/courses">
            <Button variant="ghost" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kurslara Qayıt
            </Button>
          </Link>
        </div>
      </section>

      {/* Course Header */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getCategoryColor(course.category)}>{course.category}</Badge>
                  <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <Award className="h-3 w-3 mr-1" />
                    Bestseller
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-6">{course.description}</p>

                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="ml-1">({course.reviewCount} rəy)</span>
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

                {/* Instructor */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">Müəllim: {course.instructor.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.instructor.bio}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{course.instructor.experience} təcrübə</span>
                      <span>{course.instructor.students} tələbə</span>
                      <span>{course.instructor.courses} kurs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Button size="lg" className="rounded-full">
                        <Play className="h-6 w-6 mr-2" />
                        Önizləmə
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">{course.price}</span>
                    <span className="text-lg text-gray-500 line-through">{course.originalPrice}</span>
                    <Badge variant="destructive">50% endirim</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" size="lg">
                    Kursa Keçid
                  </Button>

                  <Separator />

                  <div className="space-y-3">
                    <h4 className="font-semibold">Bu kursda:</h4>
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* What you'll learn */}
              <Card>
                <CardHeader>
                  <CardTitle>Bu kursda nə öyrənəcəksiniz</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Tələblər</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Təsvir</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{course.longDescription}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar content can go here */}
            <div className="lg:col-span-1">{/* Related courses, instructor info, etc. */}</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
