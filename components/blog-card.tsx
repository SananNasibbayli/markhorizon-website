import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BlogCardProps {
  blog: {
    id: number
    title: string
    excerpt: string
    category: string
    date: string
    readTime: string
    image: string
    slug: string
    author?: {
      name: string
      avatar?: string
    }
  }
}

export default function BlogCard({ blog }: BlogCardProps) {
  // Default author if not provided
  const author = blog.author || {
    name: "MarkHorizon",
    avatar: undefined,
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "SEO":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "SMM":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200"
      case "Google Ads":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      default:
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
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

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("az-AZ", options)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <Link href={`/blog/${blog.slug}`} className="block relative">
        <div className="aspect-[16/9] bg-gray-200 relative overflow-hidden">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4 z-10">
            <Badge className={`${getCategoryColor(blog.category)} transition-all duration-300 cursor-pointer`}>
              {blog.category}
            </Badge>
          </div>
        </div>
      </Link>

      <CardHeader className="pb-2">
        <Link href={`/blog/${blog.slug}`}>
          <CardTitle className="line-clamp-2 text-xl hover:text-blue-600 transition-colors duration-300">
            {blog.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-3 text-gray-600">{blog.excerpt}</CardDescription>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback className={`bg-gradient-to-br ${getCategoryGradient(blog.category)} text-white`}>
                {author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-700">{author.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {blog.readTime}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(blog.date)}
          </div>
          <Link href={`/blog/${blog.slug}`}>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 p-0 h-auto group/btn">
              Oxu
              <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
