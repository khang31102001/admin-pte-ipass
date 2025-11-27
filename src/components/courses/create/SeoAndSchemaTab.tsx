"use client"

import { useState } from "react"

// import { X } from "lucide-react"
import Label from "@/components/form/Label"
import Input from "@/components/form/input/InputField"
import TextArea from "@/components/form/input/TextArea"
import Button from "@/components/ui/button/Button"
import Switch from "@/components/form/switch/Switch"
import { Course } from "@/types/courses"




interface SeoAndSchemaTabProps {
  courseData: Course
  updateCourseData: (updates: Partial<Course>) => void
}

export default function SeoAndSchemaTab({ courseData, updateCourseData }: SeoAndSchemaTabProps) {
  const [newKeyword, setNewKeyword] = useState("")

  const generateDefaultMetaTitle = () => {
    return `${courseData.title} | PTE iPASS`
  }

  const addKeyword = () => {
    if (newKeyword.trim()) {
      updateCourseData({
        keywords: [...courseData.keywords, newKeyword.trim().toLowerCase()],
      })
      setNewKeyword("")
    }
  }

  const removeKeyword = (index: number) => {
    updateCourseData({
      keywords: courseData.keywords.filter((_, i) => i !== index),
    })
  }

  const generateAutoSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Course",
      name: courseData.title,
      description: courseData.metaDescription || courseData.description,
      provider: {
        "@type": "Organization",
        name: "PTE iPASS",
        sameAs: "https://pteipass.com",
      },
      timeRequired: courseData.duration ? `P${courseData.duration.match(/\d+/)?.[0]}W` : "P4W",
      educationalLevel: courseData.level || "Intermediate",
      offers: {
        "@type": "Offer",
        price: courseData.tuition.toString(),
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
      },
    }
    return JSON.stringify(schema, null, 2)
  }

  return (
    <div className="space-y-8">
      {/* SEO Section */}
      <div className="border-b border-border pb-8">
        <h3 className="text-lg font-semibold mb-6">SEO (Meta)</h3>

        {/* Meta Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="metaTitle" className="text-sm font-medium">
              Meta Title
            </Label>
            <span className="text-xs text-muted-foreground">{courseData.metaTitle.length}/70</span>
          </div>
          <Input
            id="metaTitle"
            placeholder={generateDefaultMetaTitle()}
            value={courseData.metaTitle}
            onChange={(e) => updateCourseData({ metaTitle: e.target.value.slice(0, 70) })}
            className="mt-2"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Title displayed on Google. Should contain main keywords & brand name.
          </p>
        </div>

        {/* Meta Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="metaDescription" className="text-sm font-medium">
              Meta Description
            </Label>
            <span className="text-xs text-muted-foreground">{courseData.metaDescription.length}/160</span>
          </div>
          <TextArea
            placeholder="Short description displayed under title on Google"
            value={courseData.metaDescription}
            onChange={() => {}}
            rows={2}
            className="mt-2"
          />
          <p className="mt-1 text-xs text-muted-foreground">Should be clear, with call-to-action.</p>
        </div>

        {/* Keywords */}
        <div className="mb-6">
          <Label htmlFor="keywords" className="text-sm font-medium">
            Keywords
          </Label>
          <div className="mt-2 flex gap-2">
            <Input
              id="keywords"
              placeholder="e.g., pte 65+, pte intensive course"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
            
            />
            <Button onClick={addKeyword} variant="outline">
              Add
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            For example: 'pte 65+', 'pte intensive course', 'pte speaking template'...
          </p>

          {courseData.keywords.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {courseData.keywords.map((keyword, index) => (
                <div key={index} className="inline-flex items-center gap-2 bg-secondary px-3 py-1 rounded-full text-sm">
                  {keyword}
                  <button onClick={() => removeKeyword(index)} className="text-muted-foreground hover:text-foreground">
                    {/* <X className="h-4 w-4" /> */}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Google Snippet Preview */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-3">Google Search Preview</p>
          <div className="space-y-1">
            <p className="text-blue-600 text-sm font-medium">{courseData.metaTitle || generateDefaultMetaTitle()}</p>
            <p className="text-green-700 text-xs">https://pteipass.com/khoa-hoc/course-slug</p>
            <p className="text-gray-600 text-sm line-clamp-2">{courseData.metaDescription || courseData.description}</p>
          </div>
        </div>
      </div>

      {/* Schema Section */}
      <div>
        <h3 className="text-lg font-semibold mb-6">Schema (JSON-LD)</h3>

        {/* Schema Toggle */}
        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg mb-6">
          <Label className="text-sm font-medium cursor-pointer">Enable Schema for this course (Course Schema)</Label>
          <Switch
            label="check"
            defaultChecked={courseData.schemaEnabled}
            onChange={(checked) => updateCourseData({ schemaEnabled: checked })}
          />
        </div>

        {courseData.schemaEnabled && (
          <>
            {/* Schema Mode Selection */}
            <div className="mb-6 space-y-3">
              <Label className="text-sm font-medium">Schema Mode</Label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                  <input
                    type="radio"
                    checked={courseData.schemaMode === "auto"}
                    onChange={() => updateCourseData({ schemaMode: "auto" })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-medium">Automatically generate Schema from course information</p>
                    <p className="text-xs text-muted-foreground">
                      UI displays read-only preview JSON-LD (not editable).
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary">
                  <input
                    type="radio"
                    checked={courseData.schemaMode === "custom"}
                    onChange={() => updateCourseData({ schemaMode: "custom" })}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="text-sm font-medium">Customize Schema (advanced)</p>
                    <p className="text-xs text-muted-foreground">Show a JSON editor for SEO admin to edit.</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Schema Preview / Editor */}
            <div>
              <Label className="text-sm font-medium">Schema Preview</Label>
              {courseData.schemaMode === "auto" ? (
                <>
                  <p className="mt-2 text-xs text-muted-foreground mb-2">Read-only JSON-LD (auto-generated)</p>
                  <pre className="mt-3 p-4 bg-muted rounded-lg text-xs overflow-x-auto font-mono text-foreground">
                    {generateAutoSchema()}
                  </pre>
                </>
              ) : (
                <>
                  <p className="mt-2 text-xs text-muted-foreground mb-2">Advanced JSON editor</p>
                  <TextArea
                    value={courseData.schemaData}
                    placeholder={generateAutoSchema()}
                    rows={12}
                    className="font-mono text-xs"
                  />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
