import Link from "next/link"
import { Search, Share2, MousePointer, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Categories() {
  const categories = [
    {
      title: "SEO",
      description: "Axtarış motorları optimizasiyası və organik trafik artırma strategiyaları",
      icon: <Search className="h-8 w-8 text-blue-600" />,
      href: "/blogs/seo",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "SMM",
      description: "Sosial media marketinqi və brendinq strategiyaları",
      icon: <Share2 className="h-8 w-8 text-pink-600" />,
      href: "/blogs/smm",
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Google Ads",
      description: "PPC kampaniyaları və ödənişli reklam strategiyaları",
      icon: <MousePointer className="h-8 w-8 text-green-600" />,
      href: "/blogs/google-ads",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Digərləri",
      description: "Email marketinq, content marketinq və digər rəqəmsal strategiyalar",
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      href: "/blogs/others",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Kateqoriyalar</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Rəqəmsal marketinqin müxtəlif sahələrində ekspert məsləhətləri və strategiyalar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-white group-hover:to-white transition-all duration-300">
                    {category.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">{category.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
