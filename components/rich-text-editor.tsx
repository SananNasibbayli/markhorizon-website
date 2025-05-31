"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Underline,
  LinkIcon,
  ImageIcon,
  Table,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export default function RichTextEditor({ value, onChange, placeholder, rows = 10 }: RichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  const insertText = (before: string, after = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)

    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, end + before.length)
    }, 0)
  }

  const wrapWithHeading = (level: number) => {
    const headingTag = `h${level}`
    insertText(`<${headingTag}>`, `</${headingTag}>`)
  }

  const insertLink = () => {
    if (linkUrl && linkText) {
      insertText(`<a href="${linkUrl}">`, `</a>`)
      setLinkUrl("")
      setLinkText("")
      setIsLinkDialogOpen(false)
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      const altText = imageAlt || "Image"
      insertText(`<img src="${imageUrl}" alt="${altText}" />`)
      setImageUrl("")
      setImageAlt("")
      setIsImageDialogOpen(false)
    }
  }

  const insertTable = () => {
    const tableHtml = `
<table>
  <thead>
    <tr>
      <th>Başlıq 1</th>
      <th>Başlıq 2</th>
      <th>Başlıq 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Məlumat 1</td>
      <td>Məlumat 2</td>
      <td>Məlumat 3</td>
    </tr>
    <tr>
      <td>Məlumat 4</td>
      <td>Məlumat 5</td>
      <td>Məlumat 6</td>
    </tr>
  </tbody>
</table>`
    insertText(tableHtml)
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-gray-50">
        {/* Heading Selector */}
        <Select onValueChange={(value) => wrapWithHeading(Number.parseInt(value))}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Başlıq" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">
              <div className="flex items-center">
                <Heading1 className="h-4 w-4 mr-2" />
                H1
              </div>
            </SelectItem>
            <SelectItem value="2">
              <div className="flex items-center">
                <Heading2 className="h-4 w-4 mr-2" />
                H2
              </div>
            </SelectItem>
            <SelectItem value="3">
              <div className="flex items-center">
                <Heading3 className="h-4 w-4 mr-2" />
                H3
              </div>
            </SelectItem>
            <SelectItem value="4">
              <div className="flex items-center">
                <Heading4 className="h-4 w-4 mr-2" />
                H4
              </div>
            </SelectItem>
            <SelectItem value="5">
              <div className="flex items-center">
                <Heading5 className="h-4 w-4 mr-2" />
                H5
              </div>
            </SelectItem>
            <SelectItem value="6">
              <div className="flex items-center">
                <Heading6 className="h-4 w-4 mr-2" />
                H6
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<p>", "</p>")}>
          <Type className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<strong>", "</strong>")}>
          <Bold className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<em>", "</em>")}>
          <Italic className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<u>", "</u>")}>
          <Underline className="h-4 w-4" />
        </Button>

        {/* Link Dialog */}
        <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <LinkIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link Əlavə Et</DialogTitle>
              <DialogDescription>Seçdiyiniz mətnə link əlavə edin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="linkText">Link Mətni</Label>
                <Input
                  id="linkText"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  placeholder="Link mətni"
                />
              </div>
              <div>
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={insertLink}>Link Əlavə Et</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Image Dialog */}
        <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="sm">
              <ImageIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Şəkil Əlavə Et</DialogTitle>
              <DialogDescription>Məzmuna şəkil əlavə edin</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="imageUrl">Şəkil URL</Label>
                <Input
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="imageAlt">Alt Mətn</Label>
                <Input
                  id="imageAlt"
                  value={imageAlt}
                  onChange={(e) => setImageAlt(e.target.value)}
                  placeholder="Şəkil təsviri"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={insertImage}>Şəkil Əlavə Et</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button type="button" variant="outline" size="sm" onClick={insertTable}>
          <Table className="h-4 w-4" />
        </Button>
      </div>

      {/* Text Area */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="font-mono"
      />

      <p className="text-sm text-gray-500">
        HTML formatında yaza bilərsiniz. Toolbar düymələrini istifadə edərək formatlaşdırma əlavə edin.
      </p>
    </div>
  )
}
