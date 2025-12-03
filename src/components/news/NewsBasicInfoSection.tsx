// NewsBasicInfoSection.tsx
import React, { ChangeEvent } from "react";
import RichTextEditor from "../ui/textEditor/RichTextEditor";
import { News } from "@/types/news";

interface NewsBasicInfoSectionProps {
  title: string;
  slug: string;
  description: string;
  content: string;
  onChangeNewsData: (update: Partial<News>) => void;
  onSlugChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NewsBasicInfoSection: React.FC<NewsBasicInfoSectionProps> = ({
  title,
  slug,
  description,
  content,
  onChangeNewsData,
  onSlugChange,
}) => {
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
          <label className="block text-sm font-medium mb-1.5">Slug</label>
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={onSlugChange}
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
            value={description}
            onChange={(e)=>onChangeNewsData({description: e.target.value})}
            rows={3}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent resize-none"
            placeholder="Nhập mô tả ngắn hiển thị ở danh sách tin tức..."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Nội dung chi tiết</label>
          <RichTextEditor

            value={content}
            onChange={(value) => onChangeNewsData({content: value})}
            variant="full"
          />

          <p className="text-xs text-gray-400 mt-1">
            Lưu ý: sẽ tích hợp trình soạn thảo văn bản (Quill, TipTap, TinyMCE…) trong phiên bản sau.
          </p>
        </div>

      </div>
    </section>

  );
};
