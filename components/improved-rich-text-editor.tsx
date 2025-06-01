"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, LinkIcon, ImageIcon, Table, Type, Heading1, Heading2, Heading3, List, ListOrdered, Quote } from 'lucide-react'
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

interface ImprovedRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export default function ImprovedRichTextEditor({
  value,
  onChange,
  placeholder,
  rows = 10,
}: ImprovedRichTextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [currentFormat, setCurrentFormat] = useState("p")

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

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd

    const newText = value.substring(0, start) + text + value.substring(end)
    onChange(newText)

    // Restore cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const wrapWithHeading = (level: number) => {
    const headingTag = `h${level}`
    insertText(`<${headingTag}>`, `</${headingTag}>`)
    setCurrentFormat(headingTag)
  }

  const insertParagraph = () => {
    insertText("<p>", "</p>")
    setCurrentFormat("p")
  }

  const insertList = (ordered = false) => {
    const listTag = ordered ? "ol" : "ul"
    const listHtml = `<${listTag}>
  <li>Element 1</li>
  <li>Element 2</li>
  <li>Element 3</li>
</${listTag}>`
    insertAtCursor(listHtml)
  }

  const insertBlockquote = () => {
    insertText("<blockquote>", "</blockquote>")
  }

  const insertLink = () => {
    if (linkUrl && linkText) {
      insertAtCursor(`<a href="${linkUrl}">${linkText}</a>`)
      setLinkUrl("")
      setLinkText("")
      setIsLinkDialogOpen(false)
    }
  }

  const insertImage = () => {
    if (imageUrl) {
      const altText = imageAlt || "Image"
      insertAtCursor(`<img src="${imageUrl}" alt="${altText}" class="w-full h-auto rounded-lg my-4" />`)
      setImageUrl("")
      setImageAlt("")
      setIsImageDialogOpen(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Bu hissədə şəkili upload etmək üçün Vercel Blob və ya Cloudinary istifadə edə bilərsiniz
      // Hələlik URL ilə işləyirik
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImageUrl(result)
        setIsImageDialogOpen(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const insertTable = () => {
    const tableHtml = `
<table class="w-full border-collapse border border-gray-300 my-4">
  <thead>
    <tr class="bg-gray-100">
      <th class="border border-gray-300 px-4 py-2">Başlıq 1</th>
      <th class="border border-gray-300 px-4 py-2">Başlıq 2</th>
      <th class="border border-gray-300 px-4 py-2">Başlıq 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Məlumat 1</td>
      <td class="border border-gray-300 px-4 py-2">Məlumat 2</td>
      <td class="border border-gray-300 px-4 py-2">Məlumat 3</td>
    </tr>
    <tr>
      <td class="border border-gray-300 px-4 py-2">Məlumat 4</td>
      <td class="border border-gray-300 px-4 py-2">Məlumat 5</td>
      <td class="border border-gray-300 px-4 py-2">Məlumat 6</td>
    </tr>
  </tbody>
</table>`
    insertAtCursor(tableHtml)
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border rounded-md bg-gray-50">
        {/* Format Selector */}
        <Select value={currentFormat} onValueChange={setCurrentFormat}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="p" onClick={insertParagraph}>
              <div className="flex items-center">
                <Type className="h-4 w-4 mr-2" />
                Paraqraf
              </div>
            </SelectItem>
            <SelectItem value="h1" onClick={() => wrapWithHeading(1)}>
              <div className="flex items-center">
                <Heading1 className="h-4 w-4 mr-2" />
                Başlıq 1
              </div>
            </SelectItem>
            <SelectItem value="h2" onClick={() => wrapWithHeading(2)}>
              <div className="flex items-center">
                <Heading2 className="h-4 w-4 mr-2" />
                Başlıq 2
              </div>
            </SelectItem>
            <SelectItem value="h3" onClick={() => wrapWithHeading(3)}>
              <div className="flex items-center">
                <Heading3 className="h-4 w-4 mr-2" />
                Başlıq 3
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-8 bg-gray-300"></div>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<strong>", "</strong>")}>
          <Bold className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<em>", "</em>")}>
          <Italic className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => insertText("<u>", "</u>")}>
          <Underline className="h-4 w-4" />
        </Button>

        <div className="w-px h-8 bg-gray-300"></div>

        <Button type="button" variant="outline" size="sm" onClick={() => insertList(false)}>
          <List className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={() => insertList(true)}>
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button type="button" variant="outline" size="sm" onClick={insertBlockquote}>
          <Quote className="h-4 w-4" />
        </Button>

        <div className="w-px h-8 bg-gray-300"></div>

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
              <DialogDescription>Mətnə link əlavə edin</DialogDescription>
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
                <Label htmlFor="imageUpload">Şəkil Yüklə</Label>
                <Input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
              </div>
              <div className="text-center text-gray-500">və ya</div>
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
              {imageUrl && (
                <div>
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}
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
        className="font-mono text-sm"
      />

      <p className="text-sm text-gray-500">
        HTML formatında yaza bilərsiniz. Toolbar düymələrini istifadə edərək formatlaşdırma əlavə edin.
      </p>
    </div>
  )
}
