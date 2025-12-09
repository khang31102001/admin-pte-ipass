// components/categories/CategoryForm.tsx
import React, { useEffect, useState } from "react";
import type { CategoryItem } from "@/types/category";
import { generateSlug } from "@/lib/helper";
import { toast } from "react-toastify";

export type Mode = "create" | "update";

interface CategoryFormProps {
  mode: Mode;
  initialData?: Partial<CategoryItem>;
  allCategories?: CategoryItem[]; // dùng để chọn parentId
  onSubmit: (data: Partial<CategoryItem>) => void;

}



export const CategoryForm: React.FC<CategoryFormProps> = ({
  mode,
  initialData,
  allCategories = [],
  onSubmit,
 
}) => {
  const [form, setForm] = useState<Partial<CategoryItem>>({
    id: undefined,
    name: "",
    slug: "",
    description: "",
    parentId: null,
    categoryType: "",
    icon: "",
    url: "",
    isFeatured: false,
    isDisable: false,
    metaTitle: "",
    metaDescription: "",
    h1Heading: "",
    seoContentTop: "",
    seoContentBottom: "",
    canonicalUrl: "",
    noindex: false,
    ...initialData,
  });

 
  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange =
    <K extends keyof CategoryItem>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setForm((prev) => ({
        ...prev,
        [key]: key === "parentId"
          ? value === "" ? null : Number(value)
          : value,
      }));
    };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      name: value,
      // chỉ auto slug khi create hoặc slug đang trống
      slug: mode === "create" && !prev.slug ? generateSlug(value) : prev.slug,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // validation đơn giản
    if (!form.name || form.name.trim() === "") {
      toast.error("Tên danh mục không được để trống.");
      return;
    }

    const payload: Partial<CategoryItem> = {
      ...form,
      parentId:
        form.parentId === undefined || form.parentId === null
          ? null
          : Number(form.parentId),
    };

    onSubmit(payload);
  };

  // không cho chọn chính nó làm parent
  const parentOptions = allCategories.filter(
    (cate) => cate.id !== (initialData?.id ?? 0)
  );


  return (
    <form
      id="category-form"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
     
     

      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">

        <div className="space-y-6">
          {/* Card: Thông tin cơ bản */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="border-b border-gray-100 pb-3 text-base font-semibold text-gray-900">
              Thông tin danh mục
            </h2>
            <div className="mt-4 space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Tên danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name ?? ""}
                  onChange={handleNameChange}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ví dụ: PTE Nâng cao"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={form.slug ?? ""}
                  onChange={handleChange("slug")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="pte-nang-cao"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Tự động sinh từ tên, bạn vẫn có thể chỉnh tay.
                </p>
              </div>

              {/* URL */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  URL hiển thị
                </label>
                <input
                  type="text"
                  value={form.url ?? ""}
                  onChange={handleChange("url")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="/courses/pte-nang-cao"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Mô tả ngắn
                </label>
                <textarea
                  value={form.description ?? ""}
                  onChange={handleChange("description")}
                  rows={3}
                  className="block w-full resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mô tả ngắn về danh mục để hiển thị ở trang listing..."
                />
              </div>

              {/* Icon */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Icon (class / URL)
                </label>
                <input
                  type="text"
                  value={form.icon ?? ""}
                  onChange={handleChange("icon")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="heroicons:academic-cap / /icons/pte.svg"
                />
              </div>
            </div>
          </div>

          {/* Card: Nội dung SEO Top/Bottom */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="border-b border-gray-100 pb-3 text-base font-semibold text-gray-900">
              Nội dung SEO trên trang
            </h2>
            <div className="mt-4 space-y-4">
              {/* H1 Heading */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  H1 Heading
                </label>
                <input
                  type="text"
                  value={form.h1Heading ?? ""}
                  onChange={handleChange("h1Heading")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Các khóa học PTE nâng cao tại PTE iPASS"
                />
              </div>

              {/* SEO Content Top */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nội dung SEO phía trên (SEO Content Top)
                </label>
                <textarea
                  value={form.seoContentTop ?? ""}
                  onChange={handleChange("seoContentTop")}
                  rows={3}
                  className="block w-full resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Đoạn nội dung xuất hiện phía trên danh sách khóa học..."
                />
              </div>

              {/* SEO Content Bottom */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Nội dung SEO phía dưới (SEO Content Bottom)
                </label>
                <textarea
                  value={form.seoContentBottom ?? ""}
                  onChange={handleChange("seoContentBottom")}
                  rows={3}
                  className="block w-full resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Đoạn nội dung xuất hiện dưới danh sách, thường để tối ưu từ khóa..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Hierarchy / Status / SEO Meta */}
        <div className="space-y-6">
          {/* Card: Phân cấp & loại danh mục */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="border-b border-gray-100 pb-3 text-base font-semibold text-gray-900">
              Phân cấp & loại danh mục
            </h2>
            <div className="mt-4 space-y-4">
              {/* Parent */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Danh mục cha
                </label>
                <select
                  value={form.parentId ?? ""}
                  onChange={handleChange("parentId")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">— Không có (Level 1) —</option>
                  {parentOptions.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-400">
                  Không chọn = danh mục cấp 1. Chọn danh mục cha để tạo cấp 2/3.
                </p>
              </div>

              {/* Category Type */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Loại danh mục (categoryType)
                </label>
                <input
                  type="text"
                  value={form.categoryType ?? ""}
                  onChange={handleChange("categoryType")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="course / news / product..."
                />
              </div>

              {/* Flags */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Trạng thái hiển thị
                </label>
                {/* <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={!!form.isFeatured}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        isFeatured: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Hiển thị nổi bật (Featured)
                </label> */}
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={!!form.isDisable}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        isDisable: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Vô hiệu hóa (Disable)
                </label>
              </div>
            </div>
          </div>

          {/* Card: SEO Meta */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="border-b border-gray-100 pb-3 text-base font-semibold text-gray-900">
              SEO Meta
            </h2>
            <div className="mt-4 space-y-4">
              {/* Meta Title */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={form.metaTitle ?? ""}
                  onChange={handleChange("metaTitle")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Khóa học PTE nâng cao - PTE iPASS"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Meta Description
                </label>
                <textarea
                  value={form.metaDescription ?? ""}
                  onChange={handleChange("metaDescription")}
                  rows={3}
                  className="block w-full resize-none rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Mô tả xuất hiện trên kết quả tìm kiếm Google..."
                />
              </div>

              {/* Canonical */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={form.canonicalUrl ?? ""}
                  onChange={handleChange("canonicalUrl")}
                  className="block w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="https://pteipass.com/courses/pte-nang-cao"
                />
              </div>

              {/* Noindex */}
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Indexing
                </label>
                <div className="mt-2 space-y-1.5">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={!!form.noindex}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          noindex: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    Không cho index (noindex)
                  </label>
                  <p className="text-xs text-gray-400">
                    Bật nếu bạn không muốn Google index trang danh mục này (noindex).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Version (read-only nếu cần) */}
          {form.version !== undefined && (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
              Version: {form.version}{" "}
              {form.updatedAt && (
                <>• Cập nhật lần cuối: {new Date(form.updatedAt).toLocaleString()}</>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
