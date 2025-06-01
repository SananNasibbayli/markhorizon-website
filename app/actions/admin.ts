"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

// Admin login
export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return {
      success: false,
      message: "Email və şifrə daxil edin",
    }
  }

  try {
    const supabase = createServerSupabaseClient()

    // İstifadəçini tap
    const { data: user, error } = await supabase.from("admin_users").select("*").eq("email", email).single()

    if (error || !user) {
      return {
        success: false,
        message: "İstifadəçi tapılmadı",
      }
    }

    // Sadə şifrə yoxlaması (müvəqqəti)
    if (password !== "admin123") {
      return {
        success: false,
        message: "Yanlış şifrə",
      }
    }

    // Son giriş tarixini yenilə
    await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    return {
      success: true,
      message: "Uğurla daxil oldunuz!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Admin login zamanı xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}

    // İstifadəçini tap
    const { data: user, error } = await supabase.from("admin_users").select("*").eq("email", email).single()

    if (error || !user) {
      return {
        success: false,
        message: "İstifadəçi tapılmadı",
      }
    }

    // Şifrəni yoxla
    const passwordMatch = await bcrypt.compare(password, user.password_hash)

    if (!passwordMatch) {
      return {
        success: false,
        message: "Yanlış şifrə",
      }
    }

    // Son giriş tarixini yenilə
    await supabase.from("admin_users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    // Burada JWT token yaradıb cookie-də saxlaya bilərik
    // Sadəlik üçün bu hissəni buraxırıq

    return {
      success: true,
      message: "Uğurla daxil oldunuz!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("Admin login zamanı xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}

// Blog post əlavə et/yenilə
export async function saveBlogPost(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const categoryId = formData.get("category") as string
  const status = formData.get("status") as string
  const featuredImage = formData.get("featuredImage") as string
  const metaTitle = formData.get("metaTitle") as string
  const metaDescription = formData.get("metaDescription") as string
  const author = (formData.get("author") as string) || "Admin"

  if (!title || !slug || !content || !categoryId) {
    return {
      success: false,
      message: "Bütün məcburi xanaları doldurun",
    }
  }

  try {
    const supabase = createServerSupabaseClient()

    // Status dəyərini düzgün formatda saxla
    const dbStatus = status === "Dərc olunub" ? "published" : "draft"

    const postData = {
      title,
      slug,
      excerpt,
      content,
      category_id: Number.parseInt(categoryId),
      status: dbStatus,
      featured_image: featuredImage,
      meta_title: metaTitle,
      meta_description: metaDescription,
      author,
      updated_at: new Date().toISOString(),
    }

    if (id) {
      // Mövcud məqaləni yenilə
      const { error } = await supabase.from("blog_posts").update(postData).eq("id", Number.parseInt(id))
      if (error) throw error
    } else {
      // Yeni məqalə əlavə et
      const { error } = await supabase.from("blog_posts").insert([postData])
      if (error) throw error
    }

    revalidatePath("/admin/blogs")
    revalidatePath("/blogs")
    revalidatePath(`/blog/${slug}`)

    return {
      success: true,
      message: id ? "Məqalə uğurla yeniləndi!" : "Məqalə uğurla əlavə edildi!",
      slug,
    }
  } catch (error) {
    console.error("Bloq məqaləsi saxlanarkən xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}

// Blog post sil
export async function deleteBlogPost(id: number) {
  try {
    const supabase = createServerSupabaseClient()

    await supabase.from("blog_posts").delete().eq("id", id)

    revalidatePath("/admin/blogs")
    revalidatePath("/blogs")

    return {
      success: true,
      message: "Məqalə uğurla silindi!",
    }
  } catch (error) {
    console.error("Bloq məqaləsi silinərkən xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}

// Sayt parametrlərini yenilə
export async function updateSiteSettings(formData: FormData) {
  try {
    const supabase = createServerSupabaseClient()

    // Formdan bütün parametrləri al
    const settings: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      settings[key] = value as string
    }

    // Hər bir parametr üçün upsert əməliyyatı
    for (const [key, value] of Object.entries(settings)) {
      await supabase.from("site_settings").upsert(
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "key",
        },
      )
    }

    revalidatePath("/admin/settings")
    revalidatePath("/")

    return {
      success: true,
      message: "Parametrlər uğurla yeniləndi!",
    }
  } catch (error) {
    console.error("Sayt parametrləri yenilənərkən xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}

// AI Tool saxlamaq
export async function saveAITool(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const categoryId = formData.get("category") as string
  const rating = formData.get("rating") as string
  const pricing = formData.get("pricing") as string
  const websiteUrl = formData.get("url") as string
  const logoUrl = formData.get("icon") as string
  const status = formData.get("status") as string
  const features = formData.get("features") as string

  if (!name || !description || !categoryId) {
    return {
      success: false,
      message: "Bütün məcburi xanaları doldurun",
    }
  }

  try {
    const supabase = createServerSupabaseClient()

    const toolData = {
      name,
      slug:
        slug ||
        name
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
      description,
      category_id: Number.parseInt(categoryId),
      rating: rating ? Number.parseFloat(rating) : 0,
      pricing,
      website_url: websiteUrl,
      logo_url: logoUrl,
      status: status === "Aktiv" ? "active" : "inactive",
      features: features ? features.split(",").map((f) => f.trim()) : [],
      updated_at: new Date().toISOString(),
    }

    if (id) {
      const { error } = await supabase.from("ai_tools").update(toolData).eq("id", Number.parseInt(id))
      if (error) throw error
    } else {
      const { error } = await supabase.from("ai_tools").insert([toolData])
      if (error) throw error
    }

    revalidatePath("/admin/ai-tools")
    revalidatePath("/ai-tools")

    return {
      success: true,
      message: id ? "AI alət uğurla yeniləndi!" : "AI alət uğurla əlavə edildi!",
    }
  } catch (error) {
    console.error("AI alət saxlanarkən xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}

// Kurs saxlamaq
export async function saveCourse(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const categoryId = formData.get("category") as string
  const instructor = formData.get("instructor") as string
  const rating = formData.get("rating") as string
  const students = formData.get("students") as string
  const duration = formData.get("duration") as string
  const status = formData.get("status") as string

  if (!title || !slug || !description || !categoryId) {
    return {
      success: false,
      message: "Bütün məcburi xanaları doldurun",
    }
  }

  try {
    const supabase = createServerSupabaseClient()

    const courseData = {
      title,
      slug,
      description,
      category_id: Number.parseInt(categoryId),
      instructor: instructor || "Admin",
      rating: rating ? Number.parseFloat(rating) : 0,
      students: students || "0",
      duration: duration || "",
      status: status === "Aktiv" ? "published" : "draft",
      updated_at: new Date().toISOString(),
    }

    if (id) {
      const { error } = await supabase.from("courses").update(courseData).eq("id", Number.parseInt(id))
      if (error) throw error
    } else {
      const { error } = await supabase.from("courses").insert([courseData])
      if (error) throw error
    }

    revalidatePath("/admin/courses")
    revalidatePath("/courses")

    return {
      success: true,
      message: id ? "Kurs uğurla yeniləndi!" : "Kurs uğurla əlavə edildi!",
    }
  } catch (error) {
    console.error("Kurs saxlanarkən xəta:", error)
    return {
      success: false,
      message: "Xəta baş verdi. Zəhmət olmasa bir az sonra yenidən cəhd edin.",
    }
  }
}
