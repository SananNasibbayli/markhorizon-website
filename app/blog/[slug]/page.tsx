import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, BookOpen, ArrowLeft, Facebook, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

// Sample blog data - in real app, this would come from your CMS/database
const blogPosts = {
  "2024-seo-trendleri": {
    id: 1,
    title: "2024-cü ildə SEO Trendləri: Nələrə Diqqət Etməli?",
    excerpt: "Google-un ən son alqoritmləri və SEO strategiyalarında baş verən dəyişikliklər haqqında ətraflı məlumat.",
    content: `
      <h2>Giriş</h2>
      <p>2024-cü il SEO dünyasında böyük dəyişikliklər gətirdi. Google-un yeni alqoritmləri və süni intellektin artan təsiri ilə SEO strategiyalarımızı yenidən nəzərdən keçirməliyik.</p>
      
      <h2>1. AI və Maşın Öyrənməsinin Təsiri</h2>
      <p>Google-un RankBrain və BERT alqoritmləri artıq daha da təkmilləşib. Bu o deməkdir ki:</p>
      <ul>
        <li>Məzmun keyfiyyəti həmişəkindən daha vacibdir</li>
        <li>İstifadəçi niyyətini anlamaq kritik əhəmiyyət kəsb edir</li>
        <li>Təbii dil emalı daha mükəmməl işləyir</li>
      </ul>
      
      <h2>2. Core Web Vitals və Səhifə Təcrübəsi</h2>
      <p>Google-un Core Web Vitals göstəriciləri ranking faktorları olaraq daha da güclənib:</p>
      <ul>
        <li><strong>LCP (Largest Contentful Paint):</strong> 2.5 saniyədən az olmalıdır</li>
        <li><strong>FID (First Input Delay):</strong> 100 millisaniyədən az</li>
        <li><strong>CLS (Cumulative Layout Shift):</strong> 0.1-dən az</li>
      </ul>
      
      <h2>3. E-A-T (Expertise, Authoritativeness, Trustworthiness)</h2>
      <p>Ekspertlik, Avtoritet və Etibarlılık 2024-də daha da vacib olub. Xüsusilə YMYL (Your Money or Your Life) sahələrində:</p>
      <ul>
        <li>Müəllif məlumatları daha ətraflı olmalıdır</li>
        <li>Mənbə göstərmək vacibdir</li>
        <li>Ekspert rəyləri və tövsiyələr dəyərlidir</li>
      </ul>
      
      <h2>4. Video və Vizual Məzmun</h2>
      <p>Video məzmun SEO-da getdikcə daha vacib rol oynayır:</p>
      <ul>
        <li>YouTube SEO strategiyaları</li>
        <li>Video snippet-ləri optimallaşdırma</li>
        <li>Şəkil SEO və alt text-lərin əhəmiyyəti</li>
      </ul>
      
      <h2>Nəticə</h2>
      <p>2024-cü ildə SEO uğuru üçün texniki optimizasiya, keyfiyyətli məzmun və istifadəçi təcrübəsinin mükəmməl kombinasiyası lazımdır. Süni intellekt alətlərindən istifadə edərək, lakin həmişə insan toxunuşunu əlavə edərək irəliləməliyik.</p>
    `,
    category: "SEO",
    date: "2024-01-15",
    readTime: "8 dəq",
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Əli Məmmədov",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "SEO eksperti və rəqəmsal marketinq məsləhətçisi",
    },
    tags: ["SEO", "Google", "Alqoritmlər", "2024"],
  },
  "instagram-reels-strategiyasi": {
    id: 2,
    title: "Instagram Reels ilə Brendinizi Necə Tanıtmalı?",
    excerpt: "Sosial mediada viral məzmun yaratmaq və auditoriya ilə əlaqə qurmaq üçün praktiki məsləhətlər.",
    content: `
      <h2>Instagram Reels Nədir?</h2>
      <p>Instagram Reels qısa video məzmun formatıdır və brendlər üçün böyük imkanlar yaradır. 15-90 saniyəlik videolar ilə milyonlarca istifadəçiyə çata bilərsiniz.</p>
      
      <h2>Reels Strategiyası</h2>
      <h3>1. Məzmun Planlaması</h3>
      <ul>
        <li>Hədəf auditoriyasını müəyyən edin</li>
        <li>Trend mövzuları izləyin</li>
        <li>Brendinizə uyğun məzmun yaradın</li>
      </ul>
      
      <h3>2. Texniki Məsləhətlər</h3>
      <ul>
        <li>Yüksək keyfiyyətli video çəkin</li>
        <li>Şaquli format istifadə edin (9:16)</li>
        <li>Yaxşı işıqlandırma təmin edin</li>
      </ul>
      
      <h2>Viral Olmaq üçün Tövsiyələr</h2>
      <p>Viral məzmun yaratmaq üçün:</p>
      <ul>
        <li>Trend musiqi və effektlər istifadə edin</li>
        <li>İlk 3 saniyədə diqqəti çəkin</li>
        <li>Call-to-action əlavə edin</li>
        <li>Hashtag strategiyası hazırlayın</li>
      </ul>
    `,
    category: "SMM",
    date: "2024-01-12",
    readTime: "6 dəq",
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Leyla Həsənova",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "Sosial media marketinq eksperti",
    },
    tags: ["Instagram", "Reels", "SMM", "Video Marketing"],
  },
  "google-ads-roi-artirma": {
    id: 3,
    title: "Google Ads Kampaniyalarında ROI-ni Necə Artırmaq?",
    excerpt: "PPC kampaniyalarınızın effektivliyini artırmaq və reklam xərclərini optimallaşdırmaq üçün strategiyalar.",
    content: `
      <h2>ROI Nədir və Niyə Vacibdir?</h2>
      <p>ROI (Return on Investment) - investisiya gəliri, reklam xərclərinizdən nə qədər gəlir əldə etdiyinizi göstərir.</p>
      
      <h2>ROI Artırmaq üçün Strategiyalar</h2>
      
      <h3>1. Açar Sözlərin Optimallaşdırılması</h3>
      <ul>
        <li>Neqativ açar sözlər əlavə edin</li>
        <li>Uzun quyruqlu açar sözlər istifadə edin</li>
        <li>Açar söz uyğunluq növlərini düzgün seçin</li>
      </ul>
      
      <h3>2. Reklam Mətnlərinin Təkmilləşdirilməsi</h3>
      <ul>
        <li>A/B test aparın</li>
        <li>Güclü CTA istifadə edin</li>
        <li>Reklam genişləndirmələri əlavə edin</li>
      </ul>
      
      <h3>3. Landing Səhifələrinin Optimallaşdırılması</h3>
      <ul>
        <li>Səhifə yükləmə sürətini artırın</li>
        <li>Mobil uyğunluq təmin edin</li>
        <li>Konversiya elementlərini gücləndin</li>
      </ul>
      
      <h2>Ölçmə və Analiz</h2>
      <p>ROI-ni artırmaq üçün daimi ölçmə və analiz vacibdir:</p>
      <ul>
        <li>Google Analytics ilə inteqrasiya</li>
        <li>Konversiya izləmə quraşdırın</li>
        <li>Müntəzəm hesabatlar hazırlayın</li>
      </ul>
    `,
    category: "Google Ads",
    date: "2024-01-10",
    readTime: "10 dəq",
    image: "/placeholder.svg?height=400&width=800",
    author: {
      name: "Rəşad Quliyev",
      avatar: "/placeholder.svg?height=40&width=40",
      bio: "PPC və Google Ads eksperti",
    },
    tags: ["Google Ads", "PPC", "ROI", "Reklam"],
  },
}

interface BlogPageProps {
  params: {
    slug: string
  }
}

export default function BlogPage({ params }: BlogPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
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

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "SEO":
        return "from-blue-500 to-blue-700"
      case "SMM":
        return "from-pink-500 to-pink-700"
      case "Google Ads":
        return "from-green-500 to-green-700"
      default:
        return "from-purple-500 to-purple-700"
    }
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("az-AZ", options)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <Link href="/blogs">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Bloqlara Qayıt
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Badge className={getCategoryColor(post.category)}>{post.category}</Badge>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">{post.title}</h1>

            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                  <AvatarFallback className={`bg-gradient-to-br ${getCategoryGradient(post.category)} text-white`}>
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-gray-900">{post.author.name}</div>
                  <div className="text-sm text-gray-600">{post.author.bio}</div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Məqalə
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-8" />

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Etiketlər</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4">Paylaş</h3>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm">
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm">
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Author Info */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Müəllif Haqqında</h3>
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                        <AvatarFallback
                          className={`bg-gradient-to-br ${getCategoryGradient(post.category)} text-white`}
                        >
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{post.author.name}</div>
                        <div className="text-sm text-gray-600">{post.author.bio}</div>
                      </div>
                    </div>
                  </div>

                  {/* Related Articles */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Oxşar Məqalələr</h3>
                    <div className="space-y-3">
                      <Link
                        href="/blog/local-seo-strategiyalari"
                        className="block hover:text-blue-600 transition-colors"
                      >
                        <div className="text-sm font-medium">Local SEO: Yerli Bizneslərin Uğur Formulası</div>
                        <div className="text-xs text-gray-500 mt-1">12 dəq oxu</div>
                      </Link>
                      <Link
                        href="/blog/tiktok-marketing-strategiyasi"
                        className="block hover:text-blue-600 transition-colors"
                      >
                        <div className="text-sm font-medium">TikTok Marketinq: Gənc Auditoriyaya Necə Çatmaq?</div>
                        <div className="text-xs text-gray-500 mt-1">9 dəq oxu</div>
                      </Link>
                    </div>
                  </div>

                  {/* Newsletter */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg text-white">
                    <h3 className="text-lg font-semibold mb-2">Xəbərlər Bülleteni</h3>
                    <p className="text-sm text-blue-100 mb-4">Ən son məqalələrdən xəbərdar olun</p>
                    <Button variant="secondary" size="sm" className="w-full">
                      Abunə Ol
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
