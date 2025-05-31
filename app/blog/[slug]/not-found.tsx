import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <FileX className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Məqalə Tapılmadı</h1>
        <p className="text-gray-600 mb-6">Axtardığınız məqalə mövcud deyil və ya silinib.</p>
        <Link href="/blogs">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Bloqlara Qayıt
          </Button>
        </Link>
      </div>
    </div>
  )
}
