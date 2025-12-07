import { processImageForWeb } from "@/lib/image";
import { News } from "@/types/news";
import React, { ChangeEvent, useRef } from "react";

export interface MediaState {
  file?: File | null;
  preview?: string;
  deleteImageUrl?: string;
  isImageChanged?: boolean;

}
interface NewsMediaSectionProps {
  coverPreview?: string;
  onChangeNewsData?: (updates: Partial<News>) => void;
  onChangeImge?: (imgPreview: Partial<MediaState>) => void;
}

export const NewsMediaSection: React.FC<NewsMediaSectionProps> = ({
  coverPreview,
  onChangeImge

}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChangeImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (imgFile) {
      const { file, previewUrl } = await processImageForWeb(imgFile);
      onChangeImge({
        file: file,
        preview: previewUrl,
      });
    }
  };


  const handleRemoveImage = () => {

    onChangeImge?.({
      file: null,
      preview: "",
    });

    // cũng có thể clear input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };


  return (
    <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
      <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
        Media
      </h2>
      <div className="space-y-4">
        <div className="border rounded-lg bg-white shadow-sm">
          <div className="px-4 py-3 border-b">
            <h3 className="text-base font-semibold">Hình ảnh đại diện</h3>
          </div>

          <div className="p-4 space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
              {coverPreview ? (
                <div className="space-y-2">
                  <div className="relative">
                    <img
                      src={coverPreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />


                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute right-2 top-2 inline-flex items-center rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-red-600 shadow hover:bg-red-50"
                    >
                      Xoá ảnh
                    </button>
                  </div>

                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium bg-white hover:bg-slate-50 transition"
                    onClick={handleChangeImageClick}
                  >
                    Thay đổi hình ảnh
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <svg
                    className="h-8 w-8 mx-auto text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 9l4.5-4.5L16.5 9M12 4.5V15"
                    />
                  </svg>

                  <label className="cursor-pointer inline-flex flex-col items-center gap-1">
                    <span className="text-sm font-medium text-slate-700">
                      Tải hình ảnh lên
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                  </label>

                  <p className="text-xs text-slate-500">
                    Kích thước đề xuất: 1200 x 675px
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
