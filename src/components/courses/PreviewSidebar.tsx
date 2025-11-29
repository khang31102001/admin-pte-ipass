
import { Course } from "@/types/courses"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import Switch from "../form/switch/Switch";

interface PreviewSidebarProps {
  courseData: Course;
  updateCourseData: (updates: Partial<Course>) => void;
}

export default function PreviewSidebar({ courseData, updateCourseData }: PreviewSidebarProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(courseData.image);
   const fileInputRef = useRef<HTMLInputElement | null>(null);
   useEffect(() => {
    if (courseData.image) {
      setImagePreview(courseData.image);
    }
  }, [courseData.image]);

 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      // 1) Cập nhật preview
      setImagePreview(base64);

      // 2) Đẩy dữ liệu vào courseData (tùy backend: base64 / url / file)
      updateCourseData({
        image: base64, // hoặc imageFile: file nếu bạn upload file riêng
      });
    };

    reader.readAsDataURL(file);
  };

   const handleChangeImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Course Image */}
      <div className="border rounded-lg bg-white shadow-sm">
        <div className="px-4 py-3 border-b">
          <h3 className="text-base font-semibold">Hình ảnh khóa học</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
            {imagePreview ? (
              <div className="space-y-2">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />
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

            <Switch
              label="Nổi bật"
              defaultChecked={courseData.is_featured ?? false}
              onChange={(checked) => updateCourseData({ is_featured: checked })}
            />
          </div>

          {/* ACTIVE SWITCH */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-700 select-none">
              Kích hoạt khóa học
            </span>

            <Switch
              label="Kích hoạt"
              defaultChecked={courseData.is_disbale ?? true}
              onChange={(checked) => updateCourseData({ is_disbale: checked })}
            />
          </div>

          {/* Divider */}
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
