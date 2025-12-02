import React from "react";
import type { Course } from "@/types/courses";
// import type { CategoryItem } from "@/types/category";

type Props = {
  course: Course;
  onBack?: () => void;
  onEdit?: () => void;
};

export default function CourseAdminColumnDetailPage({
  course,
  onBack,
  onEdit,
}: Props) {
  const {
    title,
    slug,
    description,
    content,
    benefits,
    audience,
    level,
    category,
    duration,
    tuition,
    startDate,
    endDate,
    is_featured,
    is_disbale,
    created_at,
    updated_at,
    metaTitle,
    metaDescription,
    keywords,
    schemaEnabled,
    schemaMode,
    schemaData,
    author_id,
    course_id,
  } = course;

  const isActive = !is_disbale;

  return (
    <div className="min-h-screen bg-slate-50/80">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <nav className="text-xs text-slate-500 mb-1">
              <button
                type="button"
                onClick={onBack}
                className="hover:underline"
              >
                Quản lý khóa học
              </button>{" "}
              /{" "}
              <span className="text-slate-700 font-medium">
                Chi tiết khóa học
              </span>
            </nav>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-[#04016C]">
              Chi tiết khóa học (Admin view)
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Trang hiển thị toàn bộ thông tin khóa học theo dạng cột để tiện
              cho admin kiểm tra & lưu trữ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={onBack}
              className="px-3 py-2 text-sm rounded-full border border-slate-300 bg-white hover:bg-slate-50"
            >
              Quay lại
            </button>
            <button
              onClick={onEdit}
              className="px-4 py-2 text-sm font-medium rounded-full border border-[#04016C]/20 text-[#04016C] bg-white hover:bg-[#04016C]/5"
            >
              Chỉnh sửa khóa học
            </button>
          </div>
        </div>

        {/* MAIN CARD – COLUMN LAYOUT */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Top bar status */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-0.5">
                Tên khóa học
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {title || "Chưa có tiêu đề"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill
                label={isActive ? "Đang kích hoạt" : "Đang tắt"}
                type={isActive ? "success" : "muted"}
              />
              {is_featured && (
                <StatusPill label="Khóa học nổi bật" type="warning" />
              )}
              <StatusPill
                label={level || "Level chưa xác định"}
                type="info"
              />
            </div>
          </div>

          {/* 3 COLUMN GRID */}
          <div className="px-6 py-6 lg:py-7 grid gap-6 lg:grid-cols-3">
            {/* COLUMN 1 – Basic info */}
            <div className="space-y-4">
              <ColumnGroup title="Thông tin cơ bản">
                <FieldRow label="Course ID" value={course_id?.toString()} />
                <FieldRow label="Author ID" value={author_id?.toString()} />
                <FieldRow label="Slug" value={slug} mono />
                <FieldRow
                  label="Danh mục"
                  value={category?.name || "Chưa chọn"}
                />
                <FieldRow label="Level" value={level} />
                <FieldRow
                  label="Trạng thái"
                  value={isActive ? "Hoạt động" : "Không hoạt động"}
                />
              </ColumnGroup>

              <ColumnGroup title="Thời gian tạo / cập nhật">
                <FieldRow
                  label="Ngày tạo"
                  value={created_at || "Chưa có dữ liệu"}
                />
                <FieldRow
                  label="Lần cập nhật gần nhất"
                  value={updated_at || "Chưa có dữ liệu"}
                />
              </ColumnGroup>
            </div>

            {/* COLUMN 2 – Duration & Tuition */}
            <div className="space-y-4">
              <ColumnGroup title="Thời gian & Học phí">
                <FieldRow
                  label="Thời lượng khóa học"
                  value={duration || "Chưa thiết lập"}
                />
                <FieldRow
                  label="Học phí"
                  value={tuition ? `${tuition} VND` : "Chưa thiết lập"}
                />
                <FieldRow
                  label="Ngày bắt đầu"
                  value={startDate || "Không giới hạn"}
                />
                <FieldRow
                  label="Ngày kết thúc"
                  value={endDate || "Không giới hạn / Mở liên tục"}
                />
              </ColumnGroup>

              <ColumnGroup title="Tóm tắt hiển thị">
                <FieldRow
                  label="Mô tả ngắn (preview)"
                  value={
                    description
                      ? description.slice(0, 120) +
                        (description.length > 120 ? "…" : "")
                      : "Chưa có mô tả ngắn"
                  }
                />
                <FieldRow
                  label="Số lượng keywords"
                  value={keywords?.length?.toString() || "0"}
                />
              </ColumnGroup>
            </div>

            {/* COLUMN 3 – SEO & Schema */}
            <div className="space-y-4">
              <ColumnGroup title="SEO (Meta)">
                <FieldRow
                  label="Meta Title"
                  value={metaTitle || "Chưa thiết lập"}
                />
                <FieldRow
                  label="Meta Description"
                  value={
                    metaDescription
                      ? metaDescription.slice(0, 120) +
                        (metaDescription.length > 120 ? "…" : "")
                      : "Chưa thiết lập"
                  }
                />
                <div className="mb-1">
                  <p className="text-[11px] font-medium text-slate-500">
                    Keywords
                  </p>
                  {keywords && keywords.length > 0 ? (
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {keywords.map((k, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic mt-0.5">
                      Chưa có từ khóa SEO.
                    </p>
                  )}
                </div>
              </ColumnGroup>

              <ColumnGroup title="Schema (JSON-LD)">
                <FieldRow
                  label="Trạng thái"
                  value={schemaEnabled ? "Đã bật" : "Đang tắt"}
                />
                <FieldRow
                  label="Chế độ"
                  value={schemaMode === "auto" ? "Tự động" : "Tùy chỉnh"}
                />
                {schemaEnabled && schemaMode === "custom" && (
                  <div className="mt-1">
                    <p className="text-[11px] font-medium text-slate-500 mb-1">
                      Preview dữ liệu Schema
                    </p>
                    <pre className="max-h-40 overflow-auto rounded-lg bg-slate-900 text-[10px] text-slate-50 p-3">
                      {schemaData}
                    </pre>
                  </div>
                )}
              </ColumnGroup>
            </div>
          </div>

          {/* DIVIDER */}
          <div
            className="h-[1px] mx-6 rounded-full mb-4"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in oklab, #F6E10E 90%, transparent), transparent)",
            }}
          />

          {/* FULL-WIDTH SECTIONS: DESCRIPTION / CONTENT / BENEFITS / AUDIENCE */}
          <div className="px-6 pb-8 space-y-6">
            {/* Description */}
            <FullWidthBlock title="Mô tả ngắn">
              {description ? (
                <p className="text-sm text-slate-700 whitespace-pre-line">
                  {description}
                </p>
              ) : (
                <EmptyText />
              )}
            </FullWidthBlock>

            {/* Content */}
            <FullWidthBlock title="Nội dung chi tiết">
              {content ? (
                <div className="prose prose-sm max-w-none text-slate-800">
                  {/* Nếu content là HTML */}
                  <div
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              ) : (
                <EmptyText />
              )}
            </FullWidthBlock>

            {/* Benefits */}
            <FullWidthBlock title="Lợi ích / Kết quả mong đợi">
              {benefits ? (
                <p className="text-sm text-slate-700 whitespace-pre-line">
                  {benefits}
                </p>
              ) : (
                <EmptyText />
              )}
            </FullWidthBlock>

            {/* Audience */}
            <FullWidthBlock title="Đối tượng phù hợp">
              {audience && audience.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {audience.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full bg-[#04016C]/5 text-[#04016C] px-3 py-1 text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <EmptyText />
              )}
            </FullWidthBlock>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- SMALL SUB COMPONENTS ---------- */

type FieldRowProps = {
  label: string;
  value?: string | null;
  mono?: boolean;
};

function FieldRow({ label, value, mono }: FieldRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] font-medium text-slate-500">
        {label}
      </span>
      <span
        className={
          "text-sm text-slate-800 " + (mono ? "font-mono text-xs" : "")
        }
      >
        {value && value.trim() !== "" ? value : "—"}
      </span>
    </div>
  );
}

type ColumnGroupProps = {
  title: string;
  children: React.ReactNode;
};

function ColumnGroup({ title, children }: ColumnGroupProps) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/40 p-4 space-y-3">
      <h3 className="text-xs font-semibold tracking-wide uppercase text-[#04016C]">
        {title}
      </h3>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

type StatusPillProps = {
  label: string;
  type?: "success" | "warning" | "info" | "muted";
};

function StatusPill({ label, type = "info" }: StatusPillProps) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold";
  const variant =
    type === "success"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
      : type === "warning"
      ? "bg-[color-mix(in_ oklab,_#F6E10E_90%,_transparent)]/70 text-[#3b2600] border border-amber-200"
      : type === "muted"
      ? "bg-slate-100 text-slate-600 border border-slate-200"
      : "bg-[#04016C]/5 text-[#04016C] border border-[#04016C]/10";

  return <span className={`${base} ${variant}`}>{label}</span>;
}

type FullWidthBlockProps = {
  title: string;
  children: React.ReactNode;
};

function FullWidthBlock({ title, children }: FullWidthBlockProps) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-slate-50/60 px-4 py-4">
      <h3 className="text-xs font-semibold tracking-wide uppercase text-[#04016C] mb-2">
        {title}
      </h3>
      {children}
    </section>
  );
}

function EmptyText() {
  return (
    <p className="text-xs text-slate-500 italic">
      Chưa có nội dung cho phần này.
    </p>
  );
}
