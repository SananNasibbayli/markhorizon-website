import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, BookOpen, Brain, GraduationCap } from "lucide-react"

export default function DashboardPage() {
  // Real data - in a real app, this would come from your database
  const stats = [
    {
      title: "Ümumi Baxış",
      value: "45,234",
      description: "Sayta ümumi kliklər",
      change: "+12%",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Abunəçilər",
      value: "1,234",
      description: "Newsletter abunəçiləri",
      change: "+5.2%",
      icon: <Users className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Bloqlar",
      value: "87",
      description: "Dərc olunmuş bloqlar",
      change: "+2.5%",
      icon: <BookOpen className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "AI Alətləri",
      value: "23",
      description: "Mövcud AI alətləri",
      change: "+8.1%",
      icon: <Brain className="h-5 w-5 text-orange-500" />,
    },
    {
      title: "Kurslar",
      value: "15",
      description: "Aktiv kurslar",
      change: "+15.3%",
      icon: <GraduationCap className="h-5 w-5 text-red-500" />,
    },
  ]

  const recentContent = [
    { title: "SEO Əsasları", type: "Blog", views: "1,234", date: "2 saat əvvəl" },
    { title: "ChatGPT Prompts", type: "AI Alət", views: "856", date: "4 saat əvvəl" },
    { title: "SMM Strategiyaları", type: "Kurs", views: "2,145", date: "6 saat əvvəl" },
    { title: "Google Ads Təlimatı", type: "Blog", views: "987", date: "8 saat əvvəl" },
    { title: "Canva Alternativləri", type: "AI Alət", views: "654", date: "12 saat əvvəl" },
  ]

  const topPages = [
    { name: "Ana Səhifə", views: "8,234" },
    { name: "SEO Bloqları", views: "5,125" },
    { name: "AI Alətləri", views: "4,854" },
    { name: "SMM Kursları", views: "3,311" },
    { name: "Əlaqə", views: "2,945" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description} <span className="text-green-500">{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Son Əlavə Olunan Kontentlər</CardTitle>
              <CardDescription>Hazırkı real baxış sayları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.map((content, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="text-sm font-medium">{content.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {content.type} • {content.date}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">{content.views} baxış</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ən Çox Baxılan Səhifələr</CardTitle>
              <CardDescription>Son 7 gün ərzində real data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <p className="text-sm font-medium">{page.name}</p>
                    <p className="text-sm text-muted-foreground">{page.views} baxış</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
