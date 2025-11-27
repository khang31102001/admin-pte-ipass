
import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Label from "@/components/form/Label"
import SearchSelect from "@/components/form/SearchSelect"
import Button from "@/components/ui/button/Button"
import { Course } from "@/types/courses"
import { useState, useEffect } from "react"


interface BasicInformationTabProps {
  courseData: Course
  updateCourseData: (updates: Partial<Course>) => void
}

export const CATEGORY_OPTIONS = [
  { value: "pte-basic", label: "PTE Cơ bản" },
  { value: "pte-advanced", label: "PTE Nâng cao" },
  { value: "pte-30", label: "PTE cho người mới (30+)" },
  { value: "pte-36", label: "PTE Foundation (36+)" },
  { value: "pte-50", label: "PTE Target 50+" },
  { value: "pte-58", label: "PTE Target 58+" },
  { value: "pte-65", label: "PTE Target 65+" },
  { value: "pte-79", label: "PTE Target 79+" },
  { value: "pte-migration", label: "PTE dành cho định cư" },
  { value: "pte-academic", label: "PTE Academic" },
  { value: "pronunciation", label: "Phát âm & Speaking" },
  { value: "writing", label: "Writing chuyên sâu" },
  { value: "speaking", label: "Speaking chuyên sâu" },
  { value: "test-strategies", label: "Chiến lược làm bài thi" },
];

export const LEVEL = [
  { value: "1", label: "PTE Basic" },
  { value: "2", label: "PTE Advanced" },
  { value: "3", label: "Speaking Mastery" },
];


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
          Tên khóa học *
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
            placeholder="tự động tạo từ tiêu đề"
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
      <div>
        <Label htmlFor="category" className="text-sm font-medium">
          Category *
        </Label>
        <div className="max-w-md">
          <SearchSelect
            options={CATEGORY_OPTIONS}
            value={
              CATEGORY_OPTIONS.find(opt => Number(opt.value) === courseData.category_id) || null
            }
            onChange={(newValue) => {
              updateCourseData({
                category_id: Number(newValue.value),
                category: {
                  category_id: Number(newValue.value),
                  name: newValue.label,
                }
              });
            }}
            placeholder="Search course level..."
          />

          <p className="mt-3 text-sm text-gray-600">
            Selected: {courseData.category?.name ?? "Chưa chọn"}
          </p>
        </div>
      </div>

      {/* Level */}
      <div>
        <Label htmlFor="level" className="text-sm font-medium">
          Level
        </Label>
        <div className="max-w-md">
          <SearchSelect
            options={LEVEL}
            value={
              LEVEL.find((i) => i.label === courseData.level) || null
            }
            onChange={(newValue) => updateCourseData({ level: newValue.label })}
            placeholder="Search course level..."
          />

          <p className="mt-3 text-sm text-gray-600">
            Selected: {courseData.level ?? " Chưa chọn"}
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-sm font-medium">
          Mô tả ngắn
        </Label>
        <TextArea
          placeholder="Mô tả ngắn gọn về khóa học..."
          value={courseData.description}
          rows={3}
          className="mt-2"
        />
        <p className="mt-2 text-xs text-muted-foreground">{charCount}/250</p>
      </div>
    </div>
  )
}
