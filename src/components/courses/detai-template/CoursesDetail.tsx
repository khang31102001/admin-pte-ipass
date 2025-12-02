import React from "react";
import type { Course } from "@/types/courses";


type CoursePreviewPageProps = {
  course: Course;
  onBack?: () => void;
  onEdit?: () => void;
  onPublish?: () => void;
};

const fallbackImage =
  "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function CoursePreviewPage({
  course,
  onBack,
  onEdit,
  onPublish,
}: CoursePreviewPageProps) {
  const {
    image,
    title,
    slug,
    description,
    content,
    benefits,
    audience,
    level,
    duration,
    tuition,
    category,
    is_featured,
    is_disbale,
    startDate,
    endDate,
    metaTitle,
    metaDescription,
    keywords,
    schemaEnabled,
    schemaMode,
    schemaData,
  } = course;

  const isActive = !is_disbale;
  const hasDateRange = startDate || endDate;

  return (
    <div className="min-h-screen bg-slate-50/80">
      {/* PAGE WRAPPER */}
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 lg:py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <nav className="text-xs text-slate-500 mb-1">
              <span className="hover:underline cursor-pointer" onClick={onBack}>
                Khóa học
              </span>{" "}
              / <span className="text-slate-700 font-medium">Xem trước</span>
            </nav>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#04016C]">
              Xem trước khóa học
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Kiểm tra lại tất cả thông tin trước khi xuất bản khóa học.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBack}
              className="px-3 py-2 text-sm rounded-full border border-slate-300 bg-white hover:bg-slate-50"
            >
              Hủy / Quay lại
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[#04016C]/15 text-[#04016C] bg-white hover:bg-[#04016C]/5"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={onPublish}
              className="px-4 py-2 text-sm font-semibold rounded-full text-[#04016C] shadow-sm"
              style={{
                background:
                  "color-mix(in oklab, #F6E10E 90%, transparent 10%)",
              }}
            >
              Lưu &amp; xuất bản
            </button>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)] gap-6 lg:gap-8">
          {/* LEFT: MAIN CONTENT */}
          <div className="space-y-6">
            {/* CARD: Basic Info */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Thông tin cơ bản
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tiêu đề, slug, cấp độ và danh mục của khóa học.
                  </p>
                </div>
                {is_featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#04016C]/5 px-3 py-1 text-xs font-medium text-[#04016C]">
                    ★ Khóa học nổi bật
                  </span>
                )}
              </div>

              <div className="px-5 py-5 space-y-4">
                {/* Title */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    Tên khóa học
                  </div>
                  <p className="text-lg font-semibold text-slate-900">
                    {title || "Chưa có tiêu đề"}
                  </p>
                </div>

                {/* Slug + Level + Category */}
                <div className="grid gap-4 md:grid-cols-3">
                  <DetailField
                    label="Slug"
                    value={slug || "Sẽ tự động tạo từ tiêu đề"}
                    mono
                  />
                  <DetailField
                    label="Level"
                    value={level || "Chưa chọn"}
                  />
                  <DetailField
                    label="Danh mục"
                    value={category?.name || "Chưa chọn danh mục"}
                  />
                </div>

                {/* Description */}
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    Mô tả ngắn
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {description || "Chưa có mô tả ngắn cho khóa học."}
                  </p>
                </div>
              </div>
            </section>

            {/* CARD: Content */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Nội dung khóa học
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nội dung chi tiết sẽ hiển thị trên trang khóa học.
                  </p>
                </div>
              </div>

              <div className="px-5 py-5 space-y-5">
                {/* Main content */}
                <div className="prose max-w-none prose-sm text-slate-800">
                  {content ? (
                    // Nếu content là HTML: dùng dangerouslySetInnerHTML
                    <div
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  ) : (
                    <p className="text-sm text-slate-500 italic">
                      Chưa có nội dung chi tiết.
                    </p>
                  )}
                </div>

                {/* Benefits */}
                <div className="border-t border-dashed border-slate-200 pt-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                    Lợi ích / Kết quả
                  </h3>
                  {benefits ? (
                    <p className="text-sm text-slate-700 whitespace-pre-line">
                      {benefits}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Bạn chưa thêm nội dung lợi ích cho khóa học.
                    </p>
                  )}
                </div>

                {/* Audience */}
                <div className="border-t border-dashed border-slate-200 pt-4">
                  <h3 className="text-sm font-semibold text-slate-900 mb-1.5">
                    Đối tượng phù hợp
                  </h3>
                  {audience && audience.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {audience.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Bạn chưa thêm đối tượng mục tiêu.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* CARD: Time & Tuition */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="px-5 py-4 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-900">
                  Thời gian &amp; Học phí
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Thông tin giúp học viên hiểu rõ lộ trình và chi phí.
                </p>
              </div>

              <div className="px-5 py-5 grid gap-4 md:grid-cols-2">
                <DetailField
                  label="Thời lượng khóa học"
                  value={duration || "Có thể bỏ trống"}
                />
                <DetailField
                  label="Học phí"
                  value={tuition ? `${tuition} VND` : "Chưa thiết lập"}
                />
                <DetailField
                  label="Ngày bắt đầu"
                  value={startDate || "Không giới hạn"}
                />
                <DetailField
                  label="Ngày kết thúc"
                  value={endDate || "Không giới hạn / Mở liên tục"}
                />
                <DetailField
                  label="Tình trạng khóa học"
                  value={
                    hasDateRange
                      ? `${startDate || "Không rõ"} - ${endDate || "Không rõ"}`
                      : "Không có ngày bắt đầu / kết thúc cụ thể"
                  }
                />
              </div>
            </section>

            {/* CARD: SEO & Schema */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">
                    SEO &amp; Schema
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Thông tin hiển thị trên Google và cấu trúc dữ liệu.
                  </p>
                </div>
              </div>

              <div className="px-5 py-5 space-y-4">
                <DetailField
                  label="Meta Title"
                  value={metaTitle || "Chưa thiết lập"}
                />
                <DetailField
                  label="Meta Description"
                  value={metaDescription || "Chưa thiết lập"}
                />
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-1">
                    Keywords
                  </div>
                  {keywords && keywords.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((k, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-700"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Chưa có từ khóa SEO.
                    </p>
                  )}
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-slate-500">
                      Schema (JSON-LD)
                    </span>
                    <span
                      className={
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold " +
                        (schemaEnabled
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-500")
                      }
                    >
                      {schemaEnabled ? "Đã bật" : "Đang tắt"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">
                    Chế độ:{" "}
                    <span className="font-semibold text-slate-700">
                      {schemaMode === "auto" ? "Tự động" : "Tùy chỉnh"}
                    </span>
                  </p>
                  {schemaEnabled && schemaMode === "custom" && (
                    <pre className="mt-1 max-h-52 overflow-auto rounded-lg bg-slate-900/95 text-[11px] text-slate-50 p-3">
                      {schemaData}
                    </pre>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT: SIDEBAR SUMMARY */}
          <aside className="space-y-6">
            {/* Course Image */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">
                  Hình ảnh khóa học
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ảnh đại diện sẽ hiển thị trên trang danh sách khóa học.
                </p>
              </div>
              <div className="p-4">
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border border-dashed border-slate-200 bg-slate-100">
                  <img
                    src={image || fallbackImage}
                    alt={title || "Course thumbnail"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-2 text-[11px] text-slate-500 text-center">
                  Khuyến nghị: 1200 x 675px
                </p>
              </div>
            </section>

            {/* Quick Settings */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-100">
              <div className="px-5 py-4 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900">
                  Cài đặt nhanh
                </h3>
              </div>
              <div className="px-5 py-4 space-y-3 text-sm">
                <TogglePreview
                  label="Đánh dấu là khóa học nổi bật"
                  value={!!is_featured}
                />
                <TogglePreview
                  label="Kích hoạt khóa học"
                  value={isActive}
                />

                <div className="mt-3 border-t border-dashed border-slate-200 pt-3 space-y-1.5 text-xs">
                  <div className="font-semibold text-slate-900">
                    Tóm tắt
                  </div>
                  <p className="text-slate-600">
                    <span className="font-medium">Mức độ: </span>
                    {level || "Chưa xác định"}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Danh mục: </span>
                    {category?.name || "Chưa chọn"}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Thời lượng: </span>
                    {duration || "Chưa thiết lập"}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">Học phí: </span>
                    {tuition ? `${tuition} VND` : "Chưa thiết lập"}
                  </p>
                </div>
              </div>
            </section>

            {/* Hint */}
            <section className="bg-[#04016C]/5 border border-[#04016C]/10 rounded-2xl p-4 text-xs text-slate-700">
              <div className="font-semibold text-[#04016C] mb-1">
                Gợi ý trước khi xuất bản
              </div>
              <ul className="list-disc list-inside space-y-1">
                <li>Tiêu đề rõ ràng, có từ khóa chính.</li>
                <li>Mô tả ngắn gọn nhưng đủ hấp dẫn.</li>
                <li>Thêm lợi ích và đối tượng mục tiêu cụ thể.</li>
                <li>Hoàn thiện meta title, description & keywords.</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ------------ SMALL SUB COMPONENTS ------------- */

type DetailFieldProps = {
  label: string;
  value: string;
  mono?: boolean;
};

function DetailField({ label, value, mono }: DetailFieldProps) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500 mb-0.5">
        {label}
      </div>
      <p
        className={
          "text-sm text-slate-800 " + (mono ? "font-mono text-xs" : "")
        }
      >
        {value}
      </p>
    </div>
  );
}

function TogglePreview({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-slate-700">{label}</span>
      <span
        className={
          "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold " +
          (value
            ? "bg-emerald-50 text-emerald-700"
            : "bg-slate-100 text-slate-500")
        }
      >
        {value ? "Bật" : "Tắt"}
      </span>
    </div>
  );
}
