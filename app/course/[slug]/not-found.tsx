import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookX } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <BookX className="h-8 w-8 text-gray-400" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kurs Tapılmadı</h1>
        <p className="text-gray-600 mb-6">Axtardığınız kurs mövcud deyil və ya silinib.</p>
        <Link href="/courses">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kurslara Qayıt
          </Button>
        </Link>
      </div>
    </div>
  )
}
