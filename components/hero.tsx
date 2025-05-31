import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, BookOpen } from "lucide-react"
import Link from "next/link"

interface HeroProps {
  stats?: {
    totalPosts: number
    totalSubscribers: number
    totalCourses: number
    totalViews: number
  }
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Rəqəmsal Marketinqin
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Gələcəyi
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            SEO, SMM, Google Ads və ən son süni intellekt alətləri haqqında ekspert məsləhətləri. Rəqəmsal marketinq
            dünyasında bir addım öndə olun.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/blogs">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Bloqlara Bax
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/ai-tools">
              <Button variant="outline" size="lg">
                AI Alətləri Kəşf Et
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats - əvvəlki dizaynda amma real data ilə */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stats?.totalPosts || 0}+</div>
                <div className="text-sm text-gray-600">Ekspert Məqalələr</div>
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{Math.floor((stats?.totalViews || 0) / 1000)}K+</div>
                <div className="text-sm text-gray-600">Aylıq Oxucu</div>
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold text-gray-900">{stats?.totalSubscribers || 0}+</div>
                <div className="text-sm text-gray-600">Abunəçi Sayı</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
