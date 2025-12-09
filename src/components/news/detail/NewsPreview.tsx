// src/components/news/NewsPreview.tsx
import React from "react";



interface NewsPreviewProps {
  values: NewsFormValues;
  categoryName?: string;
  authorName?: string;
  onClose?: () => void; // nếu dùng trong modal
}

const formatDateTime = (value?: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString();
};

export const NewsPreview: React.FC<NewsPreviewProps> = ({
  values,
  categoryName,
  authorName,
  onClose,
}) => {
  const {
    title,
    description,
    content,
    coverImageUrl,
    coverImageFile,
    status,
    startDate,
    tags,
    isFeatured,
  } = values;

  // Ưu tiên preview từ file mới chọn
  const coverUrl = coverImageFile
    ? URL.createObjectURL(coverImageFile)
    : coverImageUrl || "";

  const statusLabel =
    status === "draft"
      ? "Draft"
      : status === "scheduled"
      ? "Scheduled"
      : "Published";

  const statusColor =
    status === "draft"
      ? "bg-gray-100 text-gray-700"
      : status === "scheduled"
      ? "bg-[#F6E10E]/15 text-[#8A7300]"
      : "bg-[#04016C]/10 text-[#04016C]";

  return (
    <div className="min-h-screen bg-[#F5F6FA] text-[#1A1A1A]">
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Top bar / back-close */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold">
            News Preview
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:bg-white bg-gray-50"
            >
              Close preview
            </button>
          )}
        </div>

        {/* Card */}
        <article className="bg-white rounded-3xl shadow-[0_18px_45px_rgba(15,23,42,0.09)] overflow-hidden border border-[#E5E7EB]">
          {/* Cover image */}
          {coverUrl ? (
            <div className="relative h-52 md:h-72 w-full overflow-hidden">
         
              <img
                src={coverUrl}
                alt="News cover"
                className="w-full h-full object-cover"
              />
              {isFeatured && (
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#F6E10E] text-[#04016C] px-3 py-1 text-xs font-semibold shadow-[0_8px_20px_rgba(0,0,0,0.15)]">
                  ★ Featured
                </div>
              )}
            </div>
          ) : (
            <div className="h-32 md:h-40 bg-gradient-to-r from-[#04016C] to-[#3E3AA7] flex items-center justify-center text-xs md:text-sm text-[#F9E94A] font-medium tracking-wide">
              No cover image – Preview banner
            </div>
          )}

          {/* Content */}
          <div className="px-5 md:px-8 py-6 md:py-8">
            {/* Meta: category, status, date */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs md:text-[13px] text-gray-500">
              {categoryName && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#04016C]/6 text-[#04016C] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6E10E]" />
                  {categoryName}
                </span>
              )}

              <span
                className={[
                  "inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium",
                  statusColor,
                ].join(" ")}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                {statusLabel}
              </span>

              {startDate && (
                <span className="inline-flex items-center gap-1 text-gray-500">
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  {formatDateTime(startDate)}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111827] mb-3 md:mb-4 leading-tight">
              {title || "News title will appear here"}
            </h1>

            {/* Author */}
            {(authorName != "") && (
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#3B3F4E] flex items-center justify-center text-xs font-semibold text-white">
                  {(authorName || "Author")[0]}
                </div>
                <div className="text-xs md:text-sm text-gray-500">
                  <span className="font-medium text-[#111827]">
                    {authorName || "Author Name"}
                  </span>
                  <span className="mx-1.5 text-gray-400">•</span>
                  <span>Editorial Team</span>
                </div>
              </div>
            )}

            {/* Description */}
            {description && (
              <p className="text-sm md:text-base text-gray-700 mb-5 md:mb-6 leading-relaxed">
                {description}
              </p>
            )}

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#F6E10E]/15 text-[11px] md:text-xs font-medium text-[#3B3F4E]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Content body */}
            <div className="border-t border-[#E5E7EB] pt-5 md:pt-6">
              {content ? (
                <div
                  className="prose prose-sm md:prose-base max-w-none prose-headings:text-[#111827] prose-a:text-[#1E1A9F] prose-strong:text-[#111827]"
                  // NOTE: trong production nên sanitize HTML trước khi render
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <p className="text-sm text-gray-400 italic">
                  Content preview will appear here. Start writing your article
                  in the editor.
                </p>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsPreview;
