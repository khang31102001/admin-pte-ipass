
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button"
import RichTextEditor from "@/components/ui/textEditor/RichTextEditor"
import { Course } from "@/types/courses"
import { X } from "lucide-react"
import { useState } from "react"

interface ContentTabProps {
  courseData: Course
  updateCourseData: (updates: Partial<Course>) => void
}

export default function ContentTab({ courseData, updateCourseData }: ContentTabProps) {
  const [newAudience, setNewAudience] = useState("")

  const addAudience = () => {
    if (newAudience.trim()) {
      updateCourseData({
        audience: [...courseData.audience, newAudience.trim()],
      })
      setNewAudience("")
    }
  }

  const removeAudience = (index: number) => {
    updateCourseData({
      audience: courseData.audience.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      {/* Content */}
      <div>
        <Label htmlFor="content" className="text-sm font-medium">
          Nhập Nội dung
        </Label>
        <RichTextEditor
          value={courseData.content}
          onChange={(newContent) => {
            updateCourseData({ content: newContent })
          }}
          variant="full"
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Rich text editor - supports headings, bullets, bold, links, and images
        </p>
      </div>

      {/* Benefits */}
      <div>
        <Label htmlFor="benefits" className="text-sm font-medium">
          Lợi ích / Kết quả (Tùy chọn)
        </Label>
        <div className="mt-2">
          <RichTextEditor
            value={courseData.benefits ?? ""}
            onChange={(value) => updateCourseData({ benefits: value })}
            height={280}
            variant="simple" 
          />
        </div>
      </div>

      {/* Suitable Audience */}
      <div>
        <Label htmlFor="audience" className="text-sm font-medium">
          Đối tượng phù hợp (Tùy chọn)
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="audience"
            placeholder="e.g., Beginners, PTE 50+ target"
            value={newAudience}
            onChange={(e) => setNewAudience(e.target.value)}
          />
          <Button onClick={addAudience} size="sm" variant="outline">
            Thêm
          </Button>
        </div>

        {courseData.audience?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {courseData.audience.map((tag, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => removeAudience(index)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}
