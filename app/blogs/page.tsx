import BlogsClientPage from "./BlogsClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bloqlar | MarkHorizon",
  description: "Rəqəmsal marketinq dünyasından ən son məqalələr və ekspert məsləhətləri",
}

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return <BlogsClientPage searchParams={searchParams} />
}
