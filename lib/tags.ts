// Teq idarəetməsi üçün utility funksiyalar

export interface Tag {
  id: number
  name: string
  color: string
  sections: string[]
  usageCount: number
  dateCreated: string
}

// Default teqlər
const defaultTags: Tag[] = [
  {
    id: 1,
    name: "SEO",
    color: "blue",
    sections: ["Blog", "Kurs"],
    usageCount: 25,
    dateCreated: "2024-01-01",
  },
  {
    id: 2,
    name: "Başlanğıc",
    color: "green",
    sections: ["Kurs"],
    usageCount: 15,
    dateCreated: "2024-01-01",
  },
  {
    id: 3,
    name: "Bestseller",
    color: "orange",
    sections: ["Kurs"],
    usageCount: 8,
    dateCreated: "2024-01-01",
  },
  {
    id: 4,
    name: "SMM",
    color: "pink",
    sections: ["Blog", "Kurs"],
    usageCount: 18,
    dateCreated: "2024-01-01",
  },
  {
    id: 5,
    name: "Mətn",
    color: "purple",
    sections: ["AI Tools"],
    usageCount: 30,
    dateCreated: "2024-01-01",
  },
  {
    id: 6,
    name: "Orta",
    color: "yellow",
    sections: ["Kurs"],
    usageCount: 12,
    dateCreated: "2024-01-01",
  },
  {
    id: 7,
    name: "İrəliləmiş",
    color: "red",
    sections: ["Kurs"],
    usageCount: 8,
    dateCreated: "2024-01-01",
  },
  {
    id: 8,
    name: "Google Ads",
    color: "purple",
    sections: ["Blog", "Kurs"],
    usageCount: 15,
    dateCreated: "2024-01-01",
  },
  {
    id: 9,
    name: "Email Marketing",
    color: "blue",
    sections: ["Blog", "Kurs"],
    usageCount: 10,
    dateCreated: "2024-01-01",
  },
]

// LocalStorage-dən teqləri oxu
export function getTags(): Tag[] {
  if (typeof window === "undefined") return defaultTags

  try {
    const stored = localStorage.getItem("admin-tags")
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error reading tags from localStorage:", error)
  }

  // İlk dəfə açılanda default teqləri saxla
  saveTags(defaultTags)
  return defaultTags
}

// LocalStorage-ə teqləri saxla
export function saveTags(tags: Tag[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem("admin-tags", JSON.stringify(tags))
  } catch (error) {
    console.error("Error saving tags to localStorage:", error)
  }
}

// Yeni teq əlavə et
export function addTag(tag: Omit<Tag, "id" | "usageCount" | "dateCreated">): Tag {
  const tags = getTags()
  const newTag: Tag = {
    ...tag,
    id: Math.max(...tags.map((t) => t.id), 0) + 1,
    usageCount: 0,
    dateCreated: new Date().toISOString().split("T")[0],
  }

  const updatedTags = [...tags, newTag]
  saveTags(updatedTags)
  return newTag
}

// Teqi yenilə
export function updateTag(id: number, updates: Partial<Tag>): void {
  const tags = getTags()
  const updatedTags = tags.map((tag) => (tag.id === id ? { ...tag, ...updates } : tag))
  saveTags(updatedTags)
}

// Teqi sil
export function deleteTag(id: number): void {
  const tags = getTags()
  const updatedTags = tags.filter((tag) => tag.id !== id)
  saveTags(updatedTags)
}

// Müəyyən bölməyə aid teqləri al
export function getTagsBySection(section: string): Tag[] {
  const tags = getTags()
  return tags.filter((tag) => tag.sections.includes(section))
}

// Teq rəngi üçün CSS class-ı al
export function getTagColorClass(color: string): string {
  switch (color) {
    case "blue":
      return "bg-blue-100 text-blue-800"
    case "green":
      return "bg-green-100 text-green-800"
    case "yellow":
      return "bg-yellow-100 text-yellow-800"
    case "red":
      return "bg-red-100 text-red-800"
    case "orange":
      return "bg-orange-100 text-orange-800"
    case "pink":
      return "bg-pink-100 text-pink-800"
    case "purple":
      return "bg-purple-100 text-purple-800"
    case "gray":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}
