// NewsBasicInfoSection.tsx
import React, { ChangeEvent } from "react";

interface NewsBasicInfoSectionProps {
  title: string;
  slug: string;
  description: string;
  content: string;
  onFieldChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>
  ) => void;
  onSlugChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const NewsBasicInfoSection: React.FC<NewsBasicInfoSectionProps> = ({
  title,
  slug,
  description,
  content,
  onFieldChange,
  onSlugChange,
}) => {
  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
      <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
        News Basic Information
      </h2>

      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onFieldChange}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="Enter news title"
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
            placeholder="auto-generated-from-title"
          />
          <p className="text-xs text-gray-400 mt-1">
            Auto-generated from title. You can override manually.
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Short Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={onFieldChange}
            rows={3}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent resize-none"
            placeholder="Short summary shown on listing pages."
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Content</label>
          <textarea
            name="content"
            value={content}
            onChange={onFieldChange}
            rows={10}
            className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
            placeholder="Rich text / HTML content editor placeholder..."
          />
          <p className="text-xs text-gray-400 mt-1">
            Tích hợp sau: rich text editor (Quill, TipTap, TinyMCE, v.v.)
          </p>
        </div>
      </div>
    </section>
  );
};
