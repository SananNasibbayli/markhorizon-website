import AdminLayout from "@/components/admin-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <Skeleton className="h-10 w-[250px]" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-[250px]" />
        </div>
        <div className="rounded-md border">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </AdminLayout>
  )
}
