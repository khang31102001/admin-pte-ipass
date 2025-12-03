import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";

import { NewsBasicInfoSection } from "./NewsBasicInfoSection";
import { NewsMediaSection } from "./NewsMediaSection";
import { NewsSeoMetaSection } from "./NewsSeoMetaSection";
import { NewsTagsFeaturedSection } from "./NewsTagsFeaturedSection";
// import { NewsAuthorSection } from "./NewsAuthorSection";
import { NewsCategorySection } from "./NewsCategorySection";
import { NewsSchedulingSection } from "./NewsSchedulingSection";
import { CategoryItem } from "@/types/category";
import { generateSlug } from "@/lib/helper";
import { News } from "@/types/news";

export type Mode = "create" | "update";


export interface AuthorOption {
  id: number | string;
  name: string;
  avatarUrl?: string;
}



interface NewsFormProps {
  initialValues?: Partial<News>;
  categories?: CategoryItem[];
  authors?: AuthorOption[];
  onSubmit: (values: News) => void;

}

const defaultValues: News = {
  newsId: null,
  title: "",
  slug: "",
  description: "",
  content: "",
  image: "",
  status: "draft",
  startDate: "",
  endDate: "",
  categoryId: undefined,
  category:  null,
  authorId: undefined,
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  tags: [],
  isFeatured: false,
};


// Convert file to base64 string for sending as payload
const fileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const NewsForm: React.FC<NewsFormProps> = ({
  initialValues,
  categories = [],

  onSubmit,
}) => {
  const [values, setValues] = useState<News>({
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
        slug: generateSlug(prev.title),
      }));
    }
  }, [values.title, slugManuallyEdited]);

  const handleChangenNewsData = (updates: Partial<News>) => {
      setValues((prev) => ({ ...prev, ...updates }));
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

  

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">


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
                onChangeNewsData={handleChangenNewsData}
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
                onChangeNewsData={handleChangenNewsData}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
              <NewsCategorySection
                categories={categories ?? []}
                value={values.categoryId as number}
                onChangeNewsData={()=>handleChangenNewsData}
              />
               

              {/* <NewsAuthorSection
                authors={authors}
                authorId={values.authorId}
                onChange={handleChange}
              /> */}

              <NewsSeoMetaSection
                metaTitle={values.metaTitle}
                metaDescription={values.metaDescription}
                keywords={values.keywords}
                onChangeNewsData={handleChangenNewsData}
                onAddKeyword={handleAddKeyword}
                onRemoveKeyword={handleRemoveKeyword}
              />

              <NewsTagsFeaturedSection
                tags={values.tags}
                isFeatured={values.isFeatured}
                onAddTag={handleAddTag}
                onRemoveTag={handleRemoveTag}
                onChangeNewsData={handleChangenNewsData}
              />
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
