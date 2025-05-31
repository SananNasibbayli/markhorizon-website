import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedBlogs from "@/components/featured-blogs"
import Categories from "@/components/categories"
import FeaturedAITools from "@/components/featured-ai-tools"
import FeaturedCourses from "@/components/featured-courses"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"
import { createServerSupabaseClient } from "@/lib/supabase"

export default async function HomePage() {
  const supabase = createServerSupabaseClient()

  // Real blog posts çək
  const { data: blogPosts } = await supabase
    .from("blog_posts")
    .select("*, categories(name)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3)

  // Real courses çək
  const { data: courses } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(3)

  // Real AI tools çək
  const { data: aiTools } = await supabase
    .from("ai_tools")
    .select("*")
    .eq("status", "active")
    .order("rating", { ascending: false })
    .limit(6)

  // Real statistikaları hesabla
  const [{ count: totalPosts }, { count: totalSubscribers }, { count: totalCourses }, { data: viewsData }] =
    await Promise.all([
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }).eq("status", "active"),
      supabase.from("courses").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("blog_posts").select("views").eq("status", "published"),
    ])

  // Ümumi baxış sayını hesabla
  const totalViews = viewsData?.reduce((sum, post) => sum + (post.views || 0), 0) || 0

  const stats = {
    totalPosts: totalPosts || 0,
    totalSubscribers: totalSubscribers || 0,
    totalCourses: totalCourses || 0,
    totalViews: totalViews,
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero stats={stats} />
      <Categories />
      <FeaturedBlogs blogs={blogPosts || []} />
      <FeaturedCourses courses={courses || []} />
      <FeaturedAITools tools={aiTools || []} />
      <Newsletter />
      <Footer />
    </div>
  )
}
