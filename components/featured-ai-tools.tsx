import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Brain,
  ImageIcon,
  FileText,
  Zap,
  Star,
  ExternalLink,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react"

export default function FeaturedAITools() {
  // Featured AI tools for homepage
  const featuredTools = [
    {
      id: 1,
      name: "ChatGPT",
      description: "OpenAI tərəfindən hazırlanmış güclü dil modeli. Mətn yaratma və sualları cavablandırma üçün ideal.",
      category: "Mətn",
      rating: 4.8,
      pricing: "Pulsuz/Ödənişli",
      url: "https://chat.openai.com",
      icon: <Brain className="h-6 w-6" />,
      gradient: "from-green-500 to-blue-500",
      users: "100M+",
      features: ["Mətn yaratma", "Kod yazma", "Tərcümə"],
      popular: true,
    },
    {
      id: 2,
      name: "Midjourney",
      description: "AI ilə yüksək keyfiyyətli şəkillər və illüstrasiyalar yaratmaq üçün ən populyar alətlərdən biri.",
      category: "Şəkil",
      rating: 4.7,
      pricing: "Ödənişli",
      url: "https://midjourney.com",
      icon: <ImageIcon className="h-6 w-6" />,
      gradient: "from-purple-500 to-pink-500",
      users: "10M+",
      features: ["Şəkil yaratma", "Art generation", "Logo dizayn"],
      popular: true,
    },
    {
      id: 3,
      name: "Jasper AI",
      description: "Marketinq məzmunu, blog yazıları və reklam mətnləri yaratmaq üçün specialized AI alət.",
      category: "Marketinq",
      rating: 4.5,
      pricing: "Ödənişli",
      url: "https://jasper.ai",
      icon: <FileText className="h-6 w-6" />,
      gradient: "from-orange-500 to-red-500",
      users: "5M+",
      features: ["Blog yazıları", "Ad copy", "Email marketinq"],
      popular: false,
    },
    {
      id: 4,
      name: "Copy.ai",
      description: "Marketinq məzmunu və reklam mətnləri yaratmaq üçün AI köməkçisi. Sürətli və effektiv.",
      category: "Marketinq",
      rating: 4.4,
      pricing: "Pulsuz/Ödənişli",
      url: "https://copy.ai",
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-500",
      users: "3M+",
      features: ["Ad copy", "Social media", "Email subject"],
      popular: false,
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mətn":
        return "bg-blue-100 text-blue-800"
      case "Şəkil":
        return "bg-purple-100 text-purple-800"
      case "Marketinq":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Populyar AI Alətləri</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            İşinizi daha effektiv etmək üçün ən yaxşı süni intellekt alətlərini kəşf edin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTools.map((tool) => (
            <Card
              key={tool.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative"
            >
              {tool.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Populyar
                  </div>
                </div>
              )}

              <CardHeader className="pb-2 relative">
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r ${tool.gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
                  >
                    {tool.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">{tool.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={getCategoryColor(tool.category)}>{tool.category}</Badge>
                      <div className="flex items-center text-amber-500">
                        <Star className="h-3 w-3 fill-amber-500 mr-1" />
                        <span className="text-xs font-medium">{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">{tool.description}</CardDescription>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-1 text-gray-400" />
                  <span>{tool.users} istifadəçi</span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-700">Əsas xüsusiyyətlər:</div>
                  <ul className="space-y-1">
                    {tool.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-3 w-3 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-sm">
                  <span className="text-gray-500">Qiymət: </span>
                  <span className="font-medium text-gray-900">{tool.pricing}</span>
                </div>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group/btn border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                  >
                    Sayta Get
                    <ExternalLink className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/ai-tools">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Hamısını Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
