
import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button"
import { useState } from "react"

interface ContentTabProps {
  courseData: {
    content: string
    benefits: string
    audience: string[]
  }
  updateCourseData: (updates: Partial<{ content: string; benefits: string; audience: string[] }>) => void
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
          Content
        </Label>
        <TextArea
          placeholder="Describe lesson format, structure, suitable audience..."
          value={courseData.content}
          rows={6}
          className="mt-2 font-mono text-sm"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Rich text editor - supports headings, bullets, bold, links, and images
        </p>
      </div>

      {/* Benefits */}
      <div>
        <Label htmlFor="benefits" className="text-sm font-medium">
          Benefits / Outcomes (Optional)
        </Label>
        <TextArea
          placeholder="After the course, students will...&#10;• Benefit 1&#10;• Benefit 2"
          value={courseData.benefits}
          rows={4}
          className="mt-2"
        />
      </div>

      {/* Suitable Audience */}
      <div>
        <Label htmlFor="audience" className="text-sm font-medium">
          Suitable audience (Optional)
        </Label>
        <div className="mt-2 flex gap-2">
          <Input
            id="audience"
            placeholder="e.g., Beginners, PTE 50+ target"
            value={newAudience}
            onChange={(e) => setNewAudience(e.target.value)}
          />
          <Button onClick={addAudience} variant="outline">
            Add
          </Button>
        </div>

        {courseData.audience.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {courseData.audience.map((tag, index) => (
              <div key={index} className="inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm">
                {tag}
                <button onClick={() => removeAudience(index)} className="text-muted-foreground hover:text-foreground">
                  {/* <X className="h-4 w-4" /> */}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
