// NewsHeader.tsx
import React from "react";

interface NewsHeaderProps {
  pageTitle: string;
  mode: "create" | "update";
  primaryButtonLabel: string;
  onPreviewClick?: () => void;
  onCancel?: () => void;
}

export const NewsHeader: React.FC<NewsHeaderProps> = ({
  pageTitle,
  mode,
  primaryButtonLabel,
  onPreviewClick,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 lg:mb-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          {pageTitle}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {mode === "create"
            ? "Create a new news article for your website."
            : "Update existing news article information and SEO."}
        </p>
      </div>

      <div className="flex gap-3">
        {mode === "update" && onPreviewClick && (
          <button
            type="button"
            onClick={onPreviewClick}
            className="px-4 py-2 rounded-lg border border-[#3B3F4E] text-[#3B3F4E] text-sm font-medium hover:bg-[#F6F7FB] transition"
          >
            Preview
          </button>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          form="news-form"
          className="px-5 py-2.5 rounded-lg text-sm font-semibold text-[#04016C] bg-gradient-to-r from-[#F6E10E] to-[#F9E94A] shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.09)] transition"
        >
          {primaryButtonLabel}
        </button>
      </div>
    </div>
  );
};
