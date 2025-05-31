"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Save } from "lucide-react"

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    // Site Settings
    siteName: "MarkHorizon",
    siteDescription: "Rəqəmsal marketinq dünyasında ən son trendlər və strategiyalar",
    siteUrl: "https://markhorizon.com",
    adminEmail: "admin@markhorizon.com",

    // Hero Settings
    heroTitle: "Rəqəmsal Marketinqin Gələcəyi",
    heroDescription:
      "SEO, SMM, Google Ads və ən son süni intellekt alətləri haqqında ekspert məsləhətləri. Rəqəmsal marketinq dünyasında bir addım öndə olun.",

    // Contact Settings
    contactEmail: "info@markhorizon.com",
    contactPhone: "+994506540563",
    contactAddress: "Bakı, Azərbaycan",
    supportEmail: "support@markhorizon.com",

    // SEO Settings
    metaTitle: "MarkHorizon - Rəqəmsal Marketinq Bloqu",
    metaDescription: "SEO, SMM, Google Ads və ən son süni intellekt alətləri haqqında ekspert məsləhətləri",
    metaKeywords: "SEO, SMM, Google Ads, Digital Marketing, AI Tools",

    // Social Media
    facebookUrl: "https://facebook.com/markhorizon",
    twitterUrl: "https://twitter.com/markhorizon",
    instagramUrl: "https://instagram.com/markhorizon",
    linkedinUrl: "https://linkedin.com/company/markhorizon",

    // Email Settings
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@markhorizon.com",
    fromName: "MarkHorizon",

    // Features
    enableComments: true,
    enableNewsletter: true,
    enableContactForm: true,
    enableSearch: true,
    enableJivoChat: true,
    jivoChatId: "",

    // Analytics
    googleAnalyticsId: "",
    facebookPixelId: "",

    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "Sayt təmir işləri aparılır. Tezliklə geri qayıdacağıq.",
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Save hero settings to localStorage (in real app, save to database)
    const heroData = {
      title: settings.heroTitle,
      description: settings.heroDescription,
      stats: {
        articles: 87,
        monthlyReaders: 45234,
        subscribers: 1234,
      },
    }
    localStorage.setItem("heroSettings", JSON.stringify(heroData))

    // Save contact settings
    localStorage.setItem(
      "contactSettings",
      JSON.stringify({
        email: settings.contactEmail,
        phone: settings.contactPhone,
        address: settings.contactAddress,
        supportEmail: settings.supportEmail,
      }),
    )

    console.log("Settings saved:", settings)
    alert("Parametrlər saxlanıldı!")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sayt Parametrləri</h1>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Parametrləri Saxla
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Site Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Sayt Parametrləri</CardTitle>
              <CardDescription>Saytın əsas məlumatları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Sayt Adı</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange("siteName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="siteDescription">Sayt Təsviri</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange("siteDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="siteUrl">Sayt URL</Label>
                <Input
                  id="siteUrl"
                  value={settings.siteUrl}
                  onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Hero Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Ana Səhifə Hero Bölməsi</CardTitle>
              <CardDescription>Ana səhifədəki əsas başlıq və təsvir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="heroTitle">Hero Başlıq</Label>
                <Input
                  id="heroTitle"
                  value={settings.heroTitle}
                  onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="heroDescription">Hero Təsvir</Label>
                <Textarea
                  id="heroDescription"
                  value={settings.heroDescription}
                  onChange={(e) => handleInputChange("heroDescription", e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Əlaqə Məlumatları</CardTitle>
              <CardDescription>Saytda göstərilən əlaqə məlumatları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Əsas Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="supportEmail">Dəstək Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Telefon</Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactAddress">Ünvan</Label>
                <Input
                  id="contactAddress"
                  value={settings.contactAddress}
                  onChange={(e) => handleInputChange("contactAddress", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Chat Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Chat Sistemi</CardTitle>
              <CardDescription>JivoChat və ya digər chat sistemləri</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableJivoChat">JivoChat Aktiv Et</Label>
                  <p className="text-sm text-gray-500">Saytda chat widget göstər</p>
                </div>
                <Switch
                  id="enableJivoChat"
                  checked={settings.enableJivoChat}
                  onCheckedChange={(checked) => handleInputChange("enableJivoChat", checked)}
                />
              </div>
              {settings.enableJivoChat && (
                <div>
                  <Label htmlFor="jivoChatId">JivoChat Widget ID</Label>
                  <Input
                    id="jivoChatId"
                    value={settings.jivoChatId}
                    onChange={(e) => handleInputChange("jivoChatId", e.target.value)}
                    placeholder="JivoChat widget ID-ni daxil edin"
                  />
                  <p className="text-sm text-gray-500 mt-1">JivoChat hesabınızdan widget ID-ni əldə edin</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Parametrləri</CardTitle>
              <CardDescription>Axtarış motorları optimizasiyası</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={settings.metaTitle}
                  onChange={(e) => handleInputChange("metaTitle", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={settings.metaDescription}
                  onChange={(e) => handleInputChange("metaDescription", e.target.value)}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={settings.metaKeywords}
                  onChange={(e) => handleInputChange("metaKeywords", e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Sosial Media</CardTitle>
              <CardDescription>Sosial media hesabları</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  value={settings.facebookUrl}
                  onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="twitterUrl">Twitter URL</Label>
                <Input
                  id="twitterUrl"
                  value={settings.twitterUrl}
                  onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  value={settings.instagramUrl}
                  onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={settings.linkedinUrl}
                  onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Xüsusiyyətlər</CardTitle>
              <CardDescription>Sayt xüsusiyyətlərini aktiv/deaktiv edin</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableComments">Şərhlər</Label>
                  <p className="text-sm text-gray-500">Məqalələrdə şərh sistemi</p>
                </div>
                <Switch
                  id="enableComments"
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => handleInputChange("enableComments", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableNewsletter">Newsletter</Label>
                  <p className="text-sm text-gray-500">Email abunəlik sistemi</p>
                </div>
                <Switch
                  id="enableNewsletter"
                  checked={settings.enableNewsletter}
                  onCheckedChange={(checked) => handleInputChange("enableNewsletter", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableContactForm">Əlaqə Formu</Label>
                  <p className="text-sm text-gray-500">Əlaqə səhifəsində form</p>
                </div>
                <Switch
                  id="enableContactForm"
                  checked={settings.enableContactForm}
                  onCheckedChange={(checked) => handleInputChange("enableContactForm", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enableSearch">Axtarış</Label>
                  <p className="text-sm text-gray-500">Sayt daxili axtarış</p>
                </div>
                <Switch
                  id="enableSearch"
                  checked={settings.enableSearch}
                  onCheckedChange={(checked) => handleInputChange("enableSearch", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Analitika</CardTitle>
              <CardDescription>Google Analytics və Facebook Pixel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId}
                  onChange={(e) => handleInputChange("googleAnalyticsId", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  value={settings.facebookPixelId}
                  onChange={(e) => handleInputChange("facebookPixelId", e.target.value)}
                  placeholder="123456789012345"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Mode */}
        <Card>
          <CardHeader>
            <CardTitle>Təmir Rejimi</CardTitle>
            <CardDescription>Saytı müvəqqəti olaraq bağlayın</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="maintenanceMode">Təmir Rejimini Aktiv Et</Label>
                <p className="text-sm text-gray-500">Sayt ziyarətçilər üçün bağlanacaq</p>
              </div>
              <Switch
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
              />
            </div>
            {settings.maintenanceMode && (
              <div>
                <Label htmlFor="maintenanceMessage">Təmir Mesajı</Label>
                <Textarea
                  id="maintenanceMessage"
                  value={settings.maintenanceMessage}
                  onChange={(e) => handleInputChange("maintenanceMessage", e.target.value)}
                  rows={3}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
