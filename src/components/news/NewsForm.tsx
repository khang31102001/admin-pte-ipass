import React, {
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
import { fileToBase64 } from "@/lib/helper";
import { News } from "@/types/news";
import { NewsValidationErrors } from "@/validators/newsValidation";
import FormErrorSummary from "../common/FormErrorSummary";

export type Mode = "create" | "update";


export interface AuthorOption {
  id: number | string;
  name: string;
  avatarUrl?: string;
}


interface NewsFormProps {
  newsData?: Partial<News>;
  categories?: CategoryItem[];
  authors?: AuthorOption[];
  onSubmit: (values: Partial<News>) => void;
  errors? : NewsValidationErrors;

}

const NewsForm: React.FC<NewsFormProps> = ({
  newsData = null,
  categories = [],
  errors,
  onSubmit,
}) => {

  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    newsData?.image
  );
  // const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  

 
  // const handleSlugChange = () => {
  //   setSlugManuallyEdited(true);
  //   // onsubmit({slug: newsData.slug});
  // };

  const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        onSubmit({
          // coverImageFile: file,
          // coverImageUrl: base64,
          image: base64, 
        })
        setCoverPreview(base64);
      } catch (error) {
        console.error("Failed to convert file to base64", error);
      }
    }
  };

  const handleRemoveCover = () => {
    // setValues((prev) => ({
    //   ...prev,
    //   coverImageFile: null,
    //   coverImageUrl: "",
    //   image: "",
    // }));
    setCoverPreview(undefined);
  };

  const handleAddKeyword = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const val = target.value.trim();
      if (val && !newsData.keywords.includes(val)) {
        // onsubmit({keywords: [...prev.keywords, val]})
      }
      target.value = "";
    }
  };

  // const handleRemoveKeyword = (keyword: string) => {
  //   const removeKey = newsData.keywords.filter((k) => k !== keyword);
  //   // onsubmit.()
  // };

  // const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     const target = e.target as HTMLInputElement;
  //     const val = target.value.trim();
  //     if (val && !newsData.tags.includes(val)) {
  //       setValues((prev) => ({
  //         ...prev,
  //         tags: [...prev.tags, val],
  //       }));
  //     }
  //     target.value = "";
  //   }
  // };

  // const handleRemoveTag = (tag: string) => {
  //   setValues((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((t) => t !== tag),
  //   }));
  // };



  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
         <FormErrorSummary errors={errors} />
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* LEFT */}
            <div className="space-y-6 lg:space-y-8">
              <NewsBasicInfoSection
                title={newsData.title}
                slug={newsData.slug}
                description={newsData.description}
                content={newsData.content}
                onChangeNewsData={onSubmit}
                // onSlugChange={()=>console.log("sử lý lại")}
              />

             <NewsMediaSection
                coverPreview={coverPreview}
                onCoverChange={handleCoverChange}
                onRemoveCover={handleRemoveCover}
              />

              <NewsSchedulingSection
                status={newsData.status}
                startDate={newsData.startDate}
                endDate={newsData.endDate}
                onChangeNewsData={onSubmit}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
              <NewsCategorySection
                categories={categories ?? []}
                value={newsData.categoryId as number}
                onChange={(cateId)=>onSubmit({categoryId: Number(cateId) })}
              />
                

              {/* <NewsAuthorSection
                authors={authors}
                authorId={values.authorId}
                onChange={handleChange}
              /> */}

              <NewsSeoMetaSection
                metaTitle={newsData.metaTitle}
                metaDescription={newsData.metaDescription}
                keywords={newsData.keywords}
                onChangeNewsData={onSubmit}
                onAddKeyword={handleAddKeyword}
                onRemoveKeyword={()=>console.log("chưa sử lý")}
              />

              <NewsTagsFeaturedSection
                tags={newsData.tags}
                isFeatured={newsData.isFeatured}
                onAddTag={()=>console.log("chưa sử lý")}
                onRemoveTag={()=>console.log("chưa sử lý")}
                onChangeNewsData={onSubmit}
              />
            </aside>
          </div>
      </div>
    </div>
  );
};

export default NewsForm;
