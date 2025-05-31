"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ExternalLink,
  Search,
  Star,
  Zap,
  Brain,
  ImageIcon,
  FileText,
  Video,
  Users,
  CheckCircle,
  Sparkles,
  ThumbsUp,
} from "lucide-react"

export default function AIToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Hamısı")
  const [searchTerm, setSearchTerm] = useState("")

  const aiTools = [
    {
      id: 1,
      name: "ChatGPT",
      description:
        "OpenAI tərəfindən hazırlanmış güclü dil modeli. Mətn yaratma, sualları cavablandırma və yaradıcı yazı üçün ideal.",
      category: "Mətn",
      rating: 4.8,
      pricing: "Pulsuz/Ödənişli",
      url: "https://chat.openai.com",
      icon: <Brain className="h-6 w-6" />,
      gradient: "from-green-500 to-blue-500",
      users: "100M+",
      features: ["Mətn yaratma", "Kod yazma", "Tərcümə", "Yaradıcı yazı"],
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
      features: ["Şəkil yaratma", "Art generation", "Logo dizayn", "Konsept art"],
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
      features: ["Blog yazıları", "Ad copy", "Email marketinq", "SEO məzmun"],
      popular: false,
    },
    {
      id: 4,
      name: "Runway ML",
      description: "Video redaktə və yaratma üçün AI alətləri. Video effektləri və animasiyalar yaratmaq üçün ideal.",
      category: "Video",
      rating: 4.6,
      pricing: "Pulsuz/Ödənişli",
      url: "https://runwayml.com",
      icon: <Video className="h-6 w-6" />,
      gradient: "from-red-500 to-pink-500",
      users: "2M+",
      features: ["Video editing", "AI effects", "Green screen", "Motion tracking"],
      popular: false,
    },
    {
      id: 5,
      name: "Copy.ai",
      description:
        "Marketinq məzmunu və reklam mətnləri yaratmaq üçün AI köməkçisi. Sürətli və effektiv məzmun yaradır.",
      category: "Marketinq",
      rating: 4.4,
      pricing: "Pulsuz/Ödənişli",
      url: "https://copy.ai",
      icon: <Zap className="h-6 w-6" />,
      gradient: "from-blue-500 to-cyan-500",
      users: "3M+",
      features: ["Ad copy", "Social media", "Email subject", "Product descriptions"],
      popular: false,
    },
    {
      id: 6,
      name: "DALL-E 3",
      description: "OpenAI-nin ən son şəkil yaratma modeli. Mətn təsvirindən realistik şəkillər yaradır.",
      category: "Şəkil",
      rating: 4.8,
      pricing: "Ödənişli",
      url: "https://openai.com/dall-e-3",
      icon: <ImageIcon className="h-6 w-6" />,
      gradient: "from-blue-500 to-indigo-500",
      users: "50M+",
      features: ["Text-to-image", "High quality", "Realistic photos", "Artistic styles"],
      popular: true,
    },
  ]

  const categories = ["Hamısı", "Mətn", "Şəkil", "Video", "Marketinq"]

  // Filter AI tools based on selected category and search term
  const filteredTools = aiTools.filter((tool) => {
    const matchesCategory = selectedCategory === "Hamısı" || tool.category === selectedCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Mətn":
        return <FileText className="h-4 w-4" />
      case "Şəkil":
        return <ImageIcon className="h-4 w-4" />
      case "Video":
        return <Video className="h-4 w-4" />
      case "Marketinq":
        return <Zap className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mətn":
        return "bg-blue-100 text-blue-800"
      case "Şəkil":
        return "bg-purple-100 text-purple-800"
      case "Video":
        return "bg-red-100 text-red-800"
      case "Marketinq":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">Süni İntellekt Alətləri</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Ən yaxşı AI alətlərini kəşf edin və işinizi daha effektiv edin
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="AI alət axtar..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === selectedCategory ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-purple-600 hover:text-white transition-colors"
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryIcon(category)}
                  <span className="ml-1">{category}</span>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTools.map((tool) => (
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
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {tool.name}
                        </CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getCategoryColor(tool.category)}>{tool.category}</Badge>
                          <div className="flex items-center">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= Math.floor(tool.rating)
                                      ? "fill-amber-400 text-amber-400"
                                      : star - 0.5 <= tool.rating
                                        ? "fill-amber-400/50 text-amber-400/50"
                                        : "fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-medium ml-1 text-gray-600">{tool.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3">{tool.description}</CardDescription>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{tool.users} istifadəçi</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <ThumbsUp className="h-4 w-4 mr-1 text-blue-500" />
                        <span>Tövsiyə edilir</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-700">Əsas xüsusiyyətlər:</div>
                      <div className="grid grid-cols-2 gap-1">
                        {tool.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-3 w-3 mr-1 text-green-500 flex-shrink-0" />
                            <span className="text-xs">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="text-sm">
                      <span className="text-gray-500">Qiymət: </span>
                      <span className="font-medium text-gray-900">{tool.pricing}</span>
                    </div>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Button
                        className={`bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white transition-opacity`}
                        size="sm"
                      >
                        Sayta Get
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Axtarış kriteriyalarına uyğun AI alət tapılmadı.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
