"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Trash2, UserCheck, UserX, Download } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchSubscribers()
  }, [])

  async function fetchSubscribers() {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("newsletter_subscribers")
        .select("*")
        .order("subscribed_at", { ascending: false })

      if (error) {
        console.error("Error fetching subscribers:", error)
      } else {
        setSubscribers(data || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (subscriber.first_name && subscriber.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (subscriber.last_name && subscriber.last_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (subscriber.phone && subscriber.phone.includes(searchTerm)),
  )

  const deleteSubscriber = async (id) => {
    if (confirm("Bu istifadəçini silmək istədiyinizə əminsiniz?")) {
      try {
        const { error } = await supabase.from("newsletter_subscribers").delete().eq("id", id)

        if (error) {
          console.error("Error deleting subscriber:", error)
        } else {
          setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id))
        }
      } catch (error) {
        console.error("Error:", error)
      }
    }
  }

  const toggleSubscriberStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "unsubscribed" : "active"

    try {
      const { error } = await supabase.from("newsletter_subscribers").update({ status: newStatus }).eq("id", id)

      if (error) {
        console.error("Error updating subscriber status:", error)
      } else {
        setSubscribers(
          subscribers.map((subscriber) => (subscriber.id === id ? { ...subscriber, status: newStatus } : subscriber)),
        )
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const exportToCSV = () => {
    const headers = ["Ad", "Soyad", "Email", "Telefon", "Status", "Qeydiyyat tarixi"]
    const csvContent = [
      headers.join(","),
      ...filteredSubscribers.map((subscriber) =>
        [
          `"${subscriber.first_name || ""}"`,
          `"${subscriber.last_name || ""}"`,
          `"${subscriber.email}"`,
          `"${subscriber.phone || ""}"`,
          `"${subscriber.status}"`,
          `"${new Date(subscriber.subscribed_at).toLocaleDateString()}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `istifadeciler-${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">İstifadəçilər</h1>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Excel Export
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="İstifadəçi axtar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ad</TableHead>
                <TableHead>Soyad</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Qeydiyyat tarixi</TableHead>
                <TableHead className="w-[100px]">Əməliyyatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    Yüklənir...
                  </TableCell>
                </TableRow>
              ) : filteredSubscribers.length > 0 ? (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell>{subscriber.first_name || "-"}</TableCell>
                    <TableCell>{subscriber.last_name || "-"}</TableCell>
                    <TableCell>{subscriber.email}</TableCell>
                    <TableCell>{subscriber.phone || "-"}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          subscriber.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {subscriber.status === "active" ? "Aktiv" : "Deaktiv"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(subscriber.subscribed_at)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menyu aç</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => toggleSubscriberStatus(subscriber.id, subscriber.status)}>
                            {subscriber.status === "active" ? (
                              <>
                                <UserX className="mr-2 h-4 w-4" />
                                <span>Deaktiv et</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-2 h-4 w-4" />
                                <span>Aktivləşdir</span>
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteSubscriber(subscriber.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Sil</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    İstifadəçi tapılmadı.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  )
}
