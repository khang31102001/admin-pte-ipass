import React, { useEffect, useState, ChangeEvent, KeyboardEvent } from "react";

type Mode = "create" | "update";

interface CategoryOption {
  id: number | string;
  name: string;
}

interface AuthorOption {
  id: number | string;
  name: string;
  avatarUrl?: string;
}

export interface NewsFormValues {
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImageFile?: File | null;
  coverImageUrl?: string; // dùng để hiển thị preview nếu đã có sẵn
  status: "draft" | "published" | "scheduled";
  startDate?: string;
  endDate?: string;
  categoryId?: string | number;
  authorId?: string | number;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  isFeatured: boolean;
}

interface NewsFormProps {
  mode: Mode;
  initialValues?: Partial<NewsFormValues>;
  categories?: CategoryOption[];
  authors?: AuthorOption[];
  onSubmit: (values: NewsFormValues) => void;
  onCancel?: () => void;
  onPreview?: (values: NewsFormValues) => void; // chỉ dùng cho update
}

const defaultValues: NewsFormValues = {
  title: "",
  slug: "",
  description: "",
  content: "",
  coverImageFile: null,
  coverImageUrl: "",
  status: "draft",
  startDate: "",
  endDate: "",
  categoryId: undefined,
  authorId: undefined,
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  tags: [],
  isFeatured: false,
};

// helper generate slug từ title
const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const NewsForm: React.FC<NewsFormProps> = ({
  mode,
  initialValues,
  categories = [],
  authors = [],
  onSubmit,
  onCancel,
  onPreview,
}) => {
  const [values, setValues] = useState<NewsFormValues>({
    ...defaultValues,
    ...initialValues,
    keywords: initialValues?.keywords ?? [],
    tags: initialValues?.tags ?? [],
  });

  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    initialValues?.coverImageUrl
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // auto-generate slug từ title nếu user chưa sửa slug bằng tay
  useEffect(() => {
    if (!slugManuallyEdited) {
      setValues((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [values.title, slugManuallyEdited]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSlugChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    setValues((prev) => ({
      ...prev,
      slug: e.target.value,
    }));
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValues((prev) => ({
        ...prev,
        coverImageFile: file,
      }));
      const previewUrl = URL.createObjectURL(file);
      setCoverPreview(previewUrl);
    }
  };

  const handleRemoveCover = () => {
    setValues((prev) => ({
      ...prev,
      coverImageFile: null,
      coverImageUrl: "",
    }));
    setCoverPreview(undefined);
  };

  const handleAddKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const val = target.value.trim();
      if (val && !values.keywords.includes(val)) {
        setValues((prev) => ({
          ...prev,
          keywords: [...prev.keywords, val],
        }));
      }
      target.value = "";
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setValues((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }));
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const val = target.value.trim();
      if (val && !values.tags.includes(val)) {
        setValues((prev) => ({
          ...prev,
          tags: [...prev.tags, val],
        }));
      }
      target.value = "";
    }
  };

  const handleRemoveTag = (tag: string) => {
    setValues((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const handlePreviewClick = () => {
    if (onPreview) {
      onPreview(values);
    }
  };

  const pageTitle = mode === "create" ? "Create News" : "Edit News";
  const primaryButtonLabel = mode === "create" ? "Create" : "Save Changes";

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
        {/* PAGE HEADER */}
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
            {mode === "update" && onPreview && (
              <button
                type="button"
                onClick={handlePreviewClick}
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

        {/* MAIN FORM */}
        <form id="news-form" onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* LEFT COLUMN */}
            <div className="space-y-6 lg:space-y-8">
              {/* SECTION: BASIC INFO */}
              <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
                <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
                  News Basic Information
                </h2>

                <div className="space-y-4">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                      placeholder="Enter news title"
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={values.slug}
                      onChange={handleSlugChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                      placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Auto-generated from title. You can override manually.
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Short Description
                    </label>
                    <textarea
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent resize-none"
                      placeholder="Short summary shown on listing pages."
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Content
                    </label>
                    <textarea
                      name="content"
                      value={values.content}
                      onChange={handleChange}
                      rows={10}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                      placeholder="Rich text / HTML content editor placeholder..."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Tích hợp sau: rich text editor (Quill, TipTap, TinyMCE,
                      v.v.)
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION: MEDIA */}
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
                          type="file"
                          accept="image/*"
                          onChange={handleCoverChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3B3F4E] file:text-white hover:file:bg-[#1E1A9F]"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            (document.querySelector(
                              'input[type="file"]'
                            ) as HTMLInputElement)?.click()
                          }
                          className="px-3 py-1.5 text-xs rounded-lg border border-[#3B3F4E] text-[#3B3F4E] font-medium hover:bg-[#F6F7FB]"
                        >
                          Replace
                        </button>
                        {coverPreview && (
                          <button
                            type="button"
                            onClick={handleRemoveCover}
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

              {/* SECTION: SCHEDULING */}
              <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-5 lg:p-6">
                <h2 className="text-lg font-semibold mb-4 border-b border-[#F0F1F4] pb-3">
                  Content Scheduling
                </h2>

                <div className="grid gap-4 md:grid-cols-3">
                  {/* Status */}
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium mb-1.5">
                      Status
                    </label>
                    <select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>

                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={values.startDate || ""}
                      onChange={handleChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1.5">
                      End Date
                    </label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={values.endDate || ""}
                      onChange={handleChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN (SIDEBAR) */}
            <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
              {/* CATEGORY */}
              <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
                <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
                  Category
                </h3>
                <div>
                  <label className="block text-xs font-medium mb-1.5">
                    Select category
                  </label>
                  <select
                    name="categoryId"
                    value={values.categoryId?.toString() || ""}
                    onChange={handleChange}
                    className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                  >
                    <option value="">-- Select category --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              {/* AUTHOR INFO */}
              <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
                <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
                  Author
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Author
                    </label>
                    <select
                      name="authorId"
                      value={values.authorId?.toString() || ""}
                      onChange={handleChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                    >
                      <option value="">-- Select author --</option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Avatar preview (read-only) */}
                  {values.authorId && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3B3F4E] flex items-center justify-center text-xs font-semibold text-white">
                        {
                          authors.find(
                            (a) => a.id.toString() === values.authorId?.toString()
                          )?.name[0]
                        }
                      </div>
                      <div className="text-xs text-gray-500">
                        Avatar preview (read-only). Có thể nâng cấp cho phép
                        override sau.
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* SEO META */}
              <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
                <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
                  SEO Meta
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      name="metaTitle"
                      value={values.metaTitle}
                      onChange={handleChange}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                      placeholder="SEO meta title"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Meta Description
                    </label>
                    <textarea
                      name="metaDescription"
                      value={values.metaDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent resize-none"
                      placeholder="SEO meta description"
                    />
                  </div>

                  {/* Keywords */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Keywords
                    </label>
                    <input
                      type="text"
                      onKeyDown={handleAddKeyword}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                      placeholder="Press Enter to add keyword"
                    />
                    {values.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {values.keywords.map((k) => (
                          <span
                            key={k}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#04016C]/5 text-[#04016C] text-xs"
                          >
                            {k}
                            <button
                              type="button"
                              onClick={() => handleRemoveKeyword(k)}
                              className="text-[10px] hover:text-red-500"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* TAGS + FEATURED */}
              <section className="border border-[#E5E7EB] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] p-4 lg:p-5">
                <h3 className="text-sm font-semibold mb-3 border-b border-[#F0F1F4] pb-2.5">
                  Tags & Featured
                </h3>
                <div className="space-y-3">
                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-medium mb-1.5">
                      Tags
                    </label>
                    <input
                      type="text"
                      onKeyDown={handleAddTag}
                      className="w-full border border-[#E5E7EB] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3E3AA7] focus:border-transparent"
                      placeholder="Press Enter to add tag"
                    />
                    {values.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {values.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F6E10E]/20 text-[#3B3F4E] text-xs"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="text-[10px] hover:text-red-500"
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Featured toggle */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#F0F1F4] mt-3">
                    <div>
                      <p className="text-xs font-medium">Featured</p>
                      <p className="text-[11px] text-gray-500">
                        Display this news in featured section.
                      </p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={values.isFeatured}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-[#04016C] relative transition">
                        <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm peer-checked:translate-x-5 transition-transform" />
                      </div>
                    </label>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
