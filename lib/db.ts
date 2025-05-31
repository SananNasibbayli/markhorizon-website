import { createServerSupabaseClient } from "./supabase"

// Kateqoriyalar
export async function getCategories(section?: string) {
  const supabase = createServerSupabaseClient()

  let query = supabase.from("categories").select("*")

  if (section) {
    query = query.eq("section", section)
  }

  const { data, error } = await query.order("name")

  if (error) {
    console.error("Kateqoriyalar yüklənərkən xəta:", error)
    return []
  }

  return data
}

// Bloq məqalələri
export async function getBlogPosts({
  limit = 10,
  offset = 0,
  category = null,
  status = "published",
  searchQuery = "",
}) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("blog_posts")
    .select(`
      *,
      categories(name)
    `)
    .eq("status", status)

  if (category) {
    query = query.eq("category_id", category)
  }

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`)
  }

  const { data, error } = await query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

  if (error) {
    console.error("Bloq məqalələri yüklənərkən xəta:", error)
    return []
  }

  return data
}

export async function getBlogPostBySlug(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      categories(name)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Bloq məqaləsi yüklənərkən xəta:", error)
    return null
  }

  // Baxış sayını artır
  await supabase
    .from("blog_posts")
    .update({ views: (data.views || 0) + 1 })
    .eq("id", data.id)

  return data
}

// AI Alətləri
export async function getAITools({ limit = 10, offset = 0, category = null, status = "active", searchQuery = "" }) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("ai_tools")
    .select(`
      *,
      categories(name)
    `)
    .eq("status", status)

  if (category) {
    query = query.eq("category_id", category)
  }

  if (searchQuery) {
    query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
  }

  const { data, error } = await query.order("rating", { ascending: false }).range(offset, offset + limit - 1)

  if (error) {
    console.error("AI alətləri yüklənərkən xəta:", error)
    return []
  }

  return data
}

// Kurslar
export async function getCourses({ limit = 10, offset = 0, category = null, status = "published", searchQuery = "" }) {
  const supabase = createServerSupabaseClient()

  let query = supabase
    .from("courses")
    .select(`
      *,
      categories(name)
    `)
    .eq("status", status)

  if (category) {
    query = query.eq("category_id", category)
  }

  if (searchQuery) {
    query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
  }

  const { data, error } = await query.order("rating", { ascending: false }).range(offset, offset + limit - 1)

  if (error) {
    console.error("Kurslar yüklənərkən xəta:", error)
    return []
  }

  return data
}

export async function getCourseBySlug(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      categories(name)
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Kurs yüklənərkən xəta:", error)
    return null
  }

  return data
}

// Teqlər
export async function getTags() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("tags").select("*").order("name")

  if (error) {
    console.error("Teqlər yüklənərkən xəta:", error)
    return []
  }

  return data
}

// Sayt parametrləri
export async function getSiteSettings() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("site_settings").select("*")

  if (error) {
    console.error("Sayt parametrləri yüklənərkən xəta:", error)
    return {}
  }

  // Parametrləri key-value formatına çevir
  const settings: Record<string, string> = {}
  data.forEach((item) => {
    settings[item.key] = item.value
  })

  return settings
}
