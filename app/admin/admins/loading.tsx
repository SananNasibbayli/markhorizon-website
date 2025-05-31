import AdminLayout from "@/components/admin-layout"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-64" />
        </div>

        <div className="rounded-md border">
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-full max-w-[150px]" />
                <Skeleton className="h-6 w-full max-w-[150px]" />
                <Skeleton className="h-6 w-full max-w-[100px]" />
                <Skeleton className="h-6 w-full max-w-[150px]" />
                <Skeleton className="h-6 w-full max-w-[150px]" />
                <Skeleton className="h-6 w-full max-w-[100px]" />
              </div>

              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <Skeleton className="h-6 w-full max-w-[150px]" />
                  <Skeleton className="h-6 w-full max-w-[150px]" />
                  <Skeleton className="h-6 w-full max-w-[100px]" />
                  <Skeleton className="h-6 w-full max-w-[150px]" />
                  <Skeleton className="h-6 w-full max-w-[150px]" />
                  <Skeleton className="h-6 w-full max-w-[100px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
