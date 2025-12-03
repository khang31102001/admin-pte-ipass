import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import { NewsHeader } from "./NewsHeader";
import { NewsBasicInfoSection } from "./NewsBasicInfoSection";
import { NewsMediaSection } from "./NewsMediaSection";
import { NewsSeoMetaSection } from "./NewsSeoMetaSection";
import { NewsTagsFeaturedSection } from "./NewsTagsFeaturedSection";
import { NewsAuthorSection } from "./NewsAuthorSection";
import { NewsCategorySection } from "./NewsCategorySection";
import { NewsSchedulingSection } from "./NewsSchedulingSection";

export type Mode = "create" | "update";

export interface CategoryOption {
  id: number | string;
  name: string;
}

export interface AuthorOption {
  id: number | string;
  name: string;
  avatarUrl?: string;
}

export interface NewsFormValues {
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
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
  onPreview?: (values: NewsFormValues) => void; // dùng cho update
  showHeader?: boolean;
}

const defaultValues: NewsFormValues = {
  title: "",
  slug: "",
  description: "",
  content: "",
  image: "",
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

// Convert file to base64 string for sending as payload
const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const NewsForm: React.FC<NewsFormProps> = ({
  mode,
  initialValues,
  categories = [],
  authors = [],
  onSubmit,
  onCancel,
  onPreview,
  showHeader = true,
}) => {
  const [values, setValues] = useState<NewsFormValues>({
    ...defaultValues,
    ...initialValues,
    keywords: initialValues?.keywords ?? [],
    tags: initialValues?.tags ?? [],
    image: initialValues?.image ?? "",
  });

  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    initialValues?.image
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // auto update slug theo title nếu user chưa sửa tay
  useEffect(() => {
    if (!slugManuallyEdited) {
      setValues((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    }
  }, [values.title, slugManuallyEdited]);

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
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

  const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setValues((prev) => ({
          ...prev,
          coverImageFile: file,
          coverImageUrl: base64,
          image: base64, // lưu base64 vào biến image để gửi lên server
        }));
        setCoverPreview(base64);
      } catch (error) {
        console.error("Failed to convert file to base64", error);
      }
    }
  };

  const handleRemoveCover = () => {
    setValues((prev) => ({
      ...prev,
      coverImageFile: null,
      coverImageUrl: "",
      image: "",
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
    if (onPreview) onPreview(values);
  };

  const pageTitle = mode === "create" ? "Create News" : "Edit News";
  const primaryButtonLabel = mode === "create" ? "Create" : "Save Changes";

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
        {/* HEADER */}
        {showHeader && (
          <NewsHeader
            pageTitle={pageTitle}
            mode={mode}
            primaryButtonLabel={primaryButtonLabel}
            onPreviewClick={mode === "update" ? handlePreviewClick : undefined}
            onCancel={onCancel}
          />
        )}

        {/* MAIN FORM */}
        <form id="news-form" onSubmit={handleSubmit}>
          <button type="submit" className="hidden" aria-hidden />
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* LEFT */}
            <div className="space-y-6 lg:space-y-8">
              <NewsBasicInfoSection
                title={values.title}
                slug={values.slug}
                description={values.description}
                content={values.content}
                onFieldChange={handleChange}
                onSlugChange={handleSlugChange}
              />

              <NewsMediaSection
                coverPreview={coverPreview}
                onCoverChange={handleCoverChange}
                onRemoveCover={handleRemoveCover}
              />

              <NewsSchedulingSection
                status={values.status}
                startDate={values.startDate}
                endDate={values.endDate}
                onFieldChange={handleChange}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
              <NewsCategorySection
                categories={categories}
                categoryId={values.categoryId}
                onChange={handleChange}
              />

              <NewsAuthorSection
                authors={authors}
                authorId={values.authorId}
                onChange={handleChange}
              />

              <NewsSeoMetaSection
                metaTitle={values.metaTitle}
                metaDescription={values.metaDescription}
                keywords={values.keywords}
                onMetaChange={handleChange}
                onAddKeyword={handleAddKeyword}
                onRemoveKeyword={handleRemoveKeyword}
              />

              <NewsTagsFeaturedSection
                tags={values.tags}
                isFeatured={values.isFeatured}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                onFeaturedChange={handleChange}
              />
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
