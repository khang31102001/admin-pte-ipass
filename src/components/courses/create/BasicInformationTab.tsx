
import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button"
import { useState, useEffect } from "react"


interface CourseData {
  title: string
  slug: string
  category: string
  level: string
  description: string
  featured: boolean
  image: string | null
}

interface BasicInformationTabProps {
  courseData: CourseData
  updateCourseData: (updates: Partial<CourseData>) => void
}

// const CATEGORIES = ["PTE Foundation", "PTE 65+", "PTE 79+", "PTE Study Abroad", "PTE Work"]

export default function BasicInformationTab({ courseData, updateCourseData }: BasicInformationTabProps) {
  const [charCount, setCharCount] = useState(courseData.description.length)

  const generateSlug = () => {
    const slug = courseData.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_]+/g, "-")
      .replace(/^-+|-+$/g, "")
    updateCourseData({ slug })
  }

  useEffect(() => {
    setCharCount(courseData.description.length)
  }, [courseData.description])

  return (
    <div className="space-y-6">
      {/* Course Title */}
      <div>
        <Label htmlFor="title" className="text-sm font-medium">
          Course title *
        </Label>
        <Input
          id="title"
          placeholder="PTE Foundation – Platform from 0 to 50+"
          value={courseData.title}
          onChange={(e) => updateCourseData({ title: e.target.value })}
          className="mt-2"
        />
      </div>

      {/* Slug */}
      <div>
        <Label htmlFor="slug" className="text-sm font-medium">
          Slug
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="slug"
            value={courseData.slug}
            onChange={(e) => updateCourseData({ slug: e.target.value })}
            placeholder="auto-generated-from-title"
          />
          <Button onClick={generateSlug} variant="outline" className="whitespace-nowrap bg-transparent">
            Generate
          </Button>
        </div>
        {courseData.slug && (
          <p className="mt-2 text-xs text-muted-foreground">URL: https://pteipass.com/khoa-hoc/{courseData.slug}</p>
        )}
      </div>

      {/* Category */}
      {/* <div>
        <Label htmlFor="category" className="text-sm font-medium">
          Category *
        </Label>
        <Select value={courseData.category} onValueChange={(value) => updateCourseData({ category: value })}>
          <SelectTrigger id="category" className="mt-2">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* Level */}
      {/* <div>
        <Label htmlFor="level" className="text-sm font-medium">
          Level
        </Label>
        <Select value={courseData.level} onValueChange={(value) => updateCourseData({ level: value })}>
          <SelectTrigger id="level" className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div> */}

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium">
          Short description
        </Label>
        <TextArea
          placeholder="Brief course description for SEO snippets..."
          value={courseData.description}
          rows={3}
          className="mt-2"
        />
        <p className="mt-2 text-xs text-muted-foreground">{charCount}/250</p>
      </div>
    </div>
  )
}
