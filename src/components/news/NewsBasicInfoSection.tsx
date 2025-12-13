// NewsBasicInfoSection.tsx
import React, { useState } from "react";
import RichTextEditor from "../ui/textEditor/RichTextEditor";
import { News } from "@/types/news";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { seoService } from "@/services/seo/seoService";
import { SeoAnalysisResponse } from "@/types/seo";
import Button from "../ui/button/Button";
import { Course } from "@/types/courses";

interface NewsBasicInfoSectionProps {
  checkSeoData?: Course;
  title: string;
  slug: string;
  description: string;
  content: string;
  onChangeNewsData: (update: Partial<News>) => void;
  onSlugManualEdit?: () => void;
  readOnluSlug?: boolean;

}

export const NewsBasicInfoSection: React.FC<NewsBasicInfoSectionProps> = ({
  title,
  slug,
  description,
  content,
  onChangeNewsData,
  onSlugManualEdit,
  readOnluSlug,
  checkSeoData,

}) => {

   const [seoResult, setSeoResult] = useState<SeoAnalysisResponse | null>(null)
    const [seoLoading, setSeoLoading] = useState(false)
    const [seoError, setSeoError] = useState<string | null>(null)
  
  
     const handleCheckSeo = async () => {
      if (!content || !content.trim()) {
        setSeoError("Vui lòng nhập nội dung khóa học trước khi phân tích SEO.")
        return
      }
  
      try {
        setSeoError(null)
        setSeoLoading(true)
  
        const result = await seoService.analyzeCourse(checkSeoData ?? null);
        setSeoResult(result);
        console.log("result check seo course-:", result )
      } catch (error) {
        console.error(error)
        setSeoError("Không thể phân tích SEO. Vui lòng thử lại sau.")
      } finally {
        setSeoLoading(false)
      }
    }
  
  
     const scoreColor =
      seoResult && seoResult.data.score >= 70
        ? "bg-green-100 text-green-700 border-green-200"
        : seoResult && seoResult.data.score >= 40
        ? "bg-yellow-100 text-yellow-700 border-yellow-200"
        : "bg-red-100 text-red-700 border-red-200"
  
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
      <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
        Thông Tin Cơ Bản của Tin Tức
      </h2>

      <div className="space-y-4">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Tiêu đề <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e)=> onChangeNewsData({title: e.target.value})}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="Nhập tiêu đề tin tức"
          />
        </div>

        {/* Slug */}
        <div>
          <Label className="block text-sm font-medium mb-1.5">Slug</Label>
          <Input
            disabled={readOnluSlug ??  false}
            type="text"
            name="slug"
            value={slug}
            onChange={(e)=> {
              onSlugManualEdit();
              onChangeNewsData({slug: e.target.value})
            }}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="tu-dong-tao-tu-tieu-de"
          />
          <p className="text-xs text-gray-400 mt-1">
            Slug sẽ được tạo tự động từ tiêu đề. Bạn có thể thay đổi thủ công nếu muốn.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Mô tả ngắn
          </label>
          <textarea
            name="description"
            value={description ?? ""}
            onChange={(e)=>onChangeNewsData({description: e.target.value})}
            rows={3}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent resize-none"
            placeholder="Nhập mô tả ngắn hiển thị ở danh sách tin tức..."
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
         <div className="flex items-center justify-between gap-4">
           <label className="block text-sm font-medium mb-1.5">Nội dung chi tiết</label>
            <Button
            size="sm"
            variant="outline"
            onClick={handleCheckSeo}
            disabled={seoLoading || !content?.trim()}
          >
            {seoLoading ? "Đang phân tích..." : "Phân tích SEO bằng AI"}
          </Button>
         </div>
          <RichTextEditor
            value={content}
            onChange={(value) => onChangeNewsData({content: value})}
            variant="full"
          />

          <p className="text-xs text-gray-400 mt-1">
            Lưu ý: sẽ tích hợp trình soạn thảo văn bản (Quill, TipTap, TinyMCE…) trong phiên bản sau.
          </p>
        </div>

         <div>
        

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
    </section>

  );
};
