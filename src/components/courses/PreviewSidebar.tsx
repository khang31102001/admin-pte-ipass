
import { Course } from "@/types/courses"
import type React from "react"
import { useRef } from "react"
import { CoursesCategorySection } from "./CoursesCategorySection";
import { CategoryItem } from "@/types/category";
import { IMedia } from "@/types/media";
import { processImageForWeb } from "@/lib/image";

interface PreviewSidebarProps {
  onChangeMedia?: (media: IMedia | null) => void
  courseData: Course;
  updateCourseData: (updates: Partial<Course>) => void;
  categories?: CategoryItem[];
}

export default function PreviewSidebar({
  categories = [], 
  onChangeMedia ,
  courseData, 
  updateCourseData 
}: PreviewSidebarProps) {

  
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
 const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files?.[0];
    if (!imgFile) return;
    const {file, previewUrl} = await processImageForWeb(imgFile);
    onChangeMedia?.({
      file: file,
      preview: previewUrl,
    })
    
  };

   const handleChangeImageClick = () => {
    fileInputRef.current?.click();
  };


   const handleRemoveImage = () => {
    onChangeMedia?.({
      file: null,
      preview: "",
    });

    // cũng có thể clear input file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  
  // console.log(typeof courseData.isFeatured, courseData.isFeatured);
  return (
    <div className="space-y-4">

      <CoursesCategorySection
        categories={categories}
        value={courseData.categoryId}
        onChange={(CateId)=> updateCourseData({ categoryId: CateId as number}) }
      />
      {/* Course Image */}
      <div className="border rounded-lg bg-white shadow-sm">
        <div className="px-4 py-3 border-b">
          <h3 className="text-base font-semibold">Hình ảnh khóa học</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
            {courseData.image ? (
              <div className="space-y-2">
               <div className="relative">
                 <img
                  src={courseData.image || "/placeholder.svg"}
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
                  onChange={handleImageUpload}
                />
              </div>
            ) : (
              <div className="space-y-2">
                {/* Icon upload đơn giản bằng SVG */}
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
                    Upload image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <p className="text-xs text-slate-500">
                  Suggested size: 1200 x 675px
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="px-4 py-3 border-b">
          <h3 className="text-base font-semibold">Cài đặt nhanh</h3>
        </div>

        {/* Body */}
        <div className="p-4 space-y-6">
          {/* FEATURED SWITCH */}
          <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700 select-none">
                Đánh dấu là khóa học nổi bật
              </span>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={!!courseData.isFeatured}
                  onChange={(e) =>
                    updateCourseData({ isFeatured: e.target.checked })
                  }
                  className="h-5 w-5 rounded border-gray-300 text-brand-500 
                            focus:ring-2 focus:ring-brand-500"
                />
                <span className="text-sm text-slate-700">Nổi bật</span>
              </label>
            </div>

          


          <div className="border-t pt-4 space-y-3">
            {/* Title */}
            <div>
              <p className="text-xs text-slate-500">Tiêu đề</p>
              <p className="text-sm font-medium truncate">
                {courseData.title || "Khóa học không có tiêu đề"}
              </p>
            </div>

            {/* Level */}
            <div>
              <p className="text-xs text-slate-500">Mức độ</p>
              <p className="text-sm font-medium">
                {courseData.level || "Chưa có mức độ"}
              </p>
            </div>

            {/* Duration */}
            <div>
              <p className="text-xs text-slate-500">Khoảng thời gian</p>
              <p className="text-sm font-medium">
                {courseData.duration || "Có thể bỏ trống"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">lịch trình</p>
              <p className="text-sm font-medium">
                {courseData.schedule || "Có thể bỏ trống"}
              </p>
            </div>
          </div>
        </div>
      </div>


      {/* Help Card */}
      <div className="border rounded-lg bg-blue-50 border-blue-200">
        <div className="p-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            💡 Vui lòng điền đầy đủ thông tin vào các trường bắt buộc (có dấu *) trước khi đăng.
            Mọi thông tin đều giúp tăng khả năng hiển thị khóa học và thứ hạng SEO.
          </p>
        </div>
      </div>

    </div>
  )
}
