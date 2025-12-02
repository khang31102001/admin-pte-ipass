
import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button"
import RichTextEditor from "@/components/ui/textEditor/RichTextEditor"
import { seoService } from "@/services/seo/seoService"
import { Course } from "@/types/courses"
import { SeoAnalysisResponse } from "@/types/seo"
import { X } from "lucide-react"
import { useState } from "react"

interface ContentTabProps {
  courseData: Course
  updateCourseData: (updates: Partial<Course>) => void
}

export default function ContentTab({ courseData, updateCourseData }: ContentTabProps) {
  const [newAudience, setNewAudience] = useState("");
   const [seoResult, setSeoResult] = useState<SeoAnalysisResponse | null>(null)
  const [seoLoading, setSeoLoading] = useState(false)
  const [seoError, setSeoError] = useState<string | null>(null)

  const addAudience = () => {
    if (newAudience.trim()) {
      updateCourseData({
        audience: [...courseData.audience, newAudience.trim()],
      })
      setNewAudience("")
    }
  }

   const handleCheckSeo = async () => {
    if (!courseData.content || !courseData.content.trim()) {
      setSeoError("Vui lòng nhập nội dung khóa học trước khi phân tích SEO.")
      return
    }

    try {
      setSeoError(null)
      setSeoLoading(true)

      const result = await seoService.analyzeCourse(courseData)
      setSeoResult(result);
      console.log("result check seo course-:", result )
    } catch (error) {
      console.error(error)
      setSeoError("Không thể phân tích SEO. Vui lòng thử lại sau.")
    } finally {
      setSeoLoading(false)
    }
  }

  const removeAudience = (index: number) => {
    updateCourseData({
      audience: courseData.audience.filter((_, i) => i !== index),
    })
  }

   const scoreColor =
    seoResult && seoResult.data.score >= 70
      ? "bg-green-100 text-green-700 border-green-200"
      : seoResult && seoResult.data.score >= 40
      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
      : "bg-red-100 text-red-700 border-red-200"

  return (
    <div className="space-y-6">
      {/* Content */}
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <Label htmlFor="content" className="text-sm font-medium">
            Nhập nội dung khóa học
          </Label>

          <Button
            size="sm"
            variant="outline"
            onClick={handleCheckSeo}
            disabled={seoLoading || !courseData.content?.trim()}
          >
            {seoLoading ? "Đang phân tích..." : "Phân tích SEO bằng AI"}
          </Button>
        </div>

        <RichTextEditor
          value={courseData.content}
          onChange={(newContent) => {
            updateCourseData({ content: newContent })
          }}
          variant="full"
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Trình soạn thảo hỗ trợ tiêu đề, danh sách, chữ đậm, link, hình ảnh...
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

         {(seoError || seoResult) && (
        <div className="mt-4">
          {seoError && (
            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
              {seoError}
            </div>
          )}

          {seoResult && (
            <div
              className={`rounded-xl border px-4 py-4 text-xs sm:text-sm ${scoreColor}`}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide">
                    SEO Content Score (AI)
                  </p>
                  <p className="text-[11px] sm:text-xs opacity-80">
                    Đánh giá dựa trên tiêu đề, nội dung, từ khóa & schema.
                  </p>
                </div>
                <div className="inline-flex flex-col items-end">
                  <span className="inline-flex h-8 min-w-[48px] items-center justify-center rounded-full bg-white/90 px-3 text-sm font-semibold">
                    {seoResult.data.score}/100
                  </span>
                </div>
              </div>

              {/* Issues */}
              {seoResult.data.issues.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold">Vấn đề cần cải thiện</p>
                  <ul className="list-disc space-y-1 pl-4">
                    {seoResult.data.issues.slice(0, 4).map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {seoResult.data.suggestions.length > 0 && (
                <div className="mb-3">
                  <p className="mb-1 text-xs font-semibold">Gợi ý tối ưu</p>
                  <ul className="list-disc space-y-1 pl-4">
                    {seoResult.data.suggestions.slice(0, 4).map((sug, idx) => (
                      <li key={idx}>{sug}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Overall comment */}
              {seoResult.data.overallComment && (
                <p className="mt-2 text-[11px] sm:text-xs italic opacity-80">
                  {seoResult.data.overallComment}
                </p>
              )}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}
