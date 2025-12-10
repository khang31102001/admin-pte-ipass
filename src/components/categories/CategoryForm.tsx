import React, { useEffect, useState } from "react";
import type { CategoryItem } from "@/types/category";
import { generateSlug } from "@/lib/helper";
import { toast } from "react-toastify";
import { CategoryTypeSection } from "./CategoryTypeSection";

export type Mode = "create" | "update";

interface CategoryFormProps {
  mode: Mode;
  initialData?: Partial<CategoryItem>;
  allCategories?: CategoryItem[]; 
  onSubmit: (data: Partial<CategoryItem>) => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  mode,
  initialData,
  allCategories = [],
  onSubmit,
}) => {
  const [form, setForm] = useState<Partial<CategoryItem>>({
    categoryId: undefined,
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

  const handleChange =(values: Partial<CategoryItem>)  => {
      setForm((prev) => ({
        ...prev,
        ...values,
        slug: mode === "create" && !prev.slug ? generateSlug(values.name) : prev.slug,
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

  console.log("Category Form Data:", form);

  // không cho chọn chính nó làm parent


  return (
    <form id="category-form" onSubmit={handleSubmit} className="space-y-6">
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
                  onChange={(e)=>handleChange({name: e.target.value})}
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
                  onChange={(e)=> handleChange({slug: e.target.value})}
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
                  onChange={(e)=> handleChange({url: e.target.value})}
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
                  onChange={(e)=> handleChange({description: e.target.value})}
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
                  onChange={(e)=> handleChange({icon: e.target.value})}
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
                  onChange={(e)=> handleChange({h1Heading: e.target.value})}
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
                  onChange={(e)=> handleChange({seoContentTop: e.target.value})}
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
                  onChange={(e)=> handleChange({seoContentBottom: e.target.value})}
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
         <CategoryTypeSection
            categories={allCategories}
            parentId={form.parentId ?? null}
            cateData={form}
            onChangeCategory={handleChange}
         />

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
                  onChange={(e)=> handleChange({metaTitle: e.target.value})}
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
                  onChange={(e)=> handleChange({metaDescription: e.target.value})}
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
                  onChange={(e)=> handleChange({canonicalUrl: e.target.value})}
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
                    Bật nếu bạn không muốn Google index trang danh mục này
                    (noindex).
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
                <>
                  • Cập nhật lần cuối:{" "}
                  {new Date(form.updatedAt).toLocaleString()}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};
