import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Image
                src="/markhorizon-logo.png"
                alt="MarkHorizon Logo"
                width={240}
                height={80}
                className="h-20 w-auto"
              />
            </div>
            <p className="text-gray-400 mb-6">
              Rəqəmsal marketinq dünyasında ən son trendlər və strategiyalar haqqında ekspert məsləhətləri.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Sürətli Keçidlər</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Ana Səhifə
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-gray-400 hover:text-white transition-colors">
                  Bütün Bloqlar
                </Link>
              </li>
              <li>
                <Link href="/ai-tools" className="text-gray-400 hover:text-white transition-colors">
                  AI Alətləri
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white transition-colors">
                  Kurslar
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Əlaqə
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Kateqoriyalar</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blogs/seo" className="text-gray-400 hover:text-white transition-colors">
                  SEO
                </Link>
              </li>
              <li>
                <Link href="/blogs/smm" className="text-gray-400 hover:text-white transition-colors">
                  SMM
                </Link>
              </li>
              <li>
                <Link href="/blogs/google-ads" className="text-gray-400 hover:text-white transition-colors">
                  Google Ads
                </Link>
              </li>
              <li>
                <Link href="/blogs/others" className="text-gray-400 hover:text-white transition-colors">
                  Digərləri
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Əlaqə</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="h-4 w-4 mr-3" />
                info@markhorizon.com
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="h-4 w-4 mr-3" />
                +994 50 654 05 63
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="h-4 w-4 mr-3" />
                Bakı, Azərbaycan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} MarkHorizon. Bütün hüquqlar qorunur.</p>
        </div>
      </div>
    </footer>
  )
}
