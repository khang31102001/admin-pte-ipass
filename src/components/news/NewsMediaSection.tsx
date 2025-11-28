// NewsMediaSection.tsx
import React, { ChangeEvent, useRef } from "react";

interface NewsMediaSectionProps {
  coverPreview?: string;
  onCoverChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveCover: () => void;
}

export const NewsMediaSection: React.FC<NewsMediaSectionProps> = ({
  coverPreview,
  onCoverChange,
  onRemoveCover,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerUpload = () => fileInputRef.current?.click();

  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
      <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
        Media
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:gap-5">
          {coverPreview ? (
            <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden border border-[#E5E7EB] bg-[#F9FAFB] mb-3 md:mb-0">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-full md:w-48 h-32 rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] flex items-center justify-center text-xs text-gray-400 mb-3 md:mb-0">
              No cover image
            </div>
          )}

          <div className="flex-1 space-y-2">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Upload Cover Image
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onCoverChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3B3F4E] file:text-white hover:file:bg-[#1E1A9F]"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={triggerUpload}
                className="px-3 py-1.5 text-xs rounded-lg border border-[#3B3F4E] text-[#3B3F4E] font-medium hover:bg-[#F6F7FB]"
              >
                Replace
              </button>
              {coverPreview && (
                <button
                  type="button"
                  onClick={onRemoveCover}
                  className="px-3 py-1.5 text-xs rounded-lg border border-red-200 text-red-600 font-medium hover:bg-red-50"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="text-xs text-gray-400">
              Recommended size: 1200×630px – JPG/PNG, &lt; 2MB.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
