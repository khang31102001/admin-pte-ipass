import React, {
  useState,
  ChangeEvent,
  useEffect,
} from "react";

import { NewsBasicInfoSection } from "./NewsBasicInfoSection";
import { NewsMediaSection } from "./NewsMediaSection";
import { NewsSeoMetaSection } from "./NewsSeoMetaSection";
import { NewsTagsFeaturedSection } from "./NewsTagsFeaturedSection";
// import { NewsAuthorSection } from "./NewsAuthorSection";
import { NewsCategorySection } from "./NewsCategorySection";
import { NewsSchedulingSection } from "./NewsSchedulingSection";
import { CategoryItem } from "@/types/category";
import { fileToBase64, generateSlug } from "@/lib/helper";
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
  onUpdateNewsData: (values: Partial<News>) => void;
  errors? : NewsValidationErrors;

}

const NewsForm: React.FC<NewsFormProps> = ({
  newsData = null,
  categories = [],
  errors,
  onUpdateNewsData,
}) => {

  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    newsData?.image
  );
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  useEffect(()=>{
    if(!slugManuallyEdited){
      onUpdateNewsData({
        slug: generateSlug(newsData.title)
      })
    }
  }, [newsData?.title])
  

 
   const handleSlugManualEdit = () => {
    setSlugManuallyEdited(true);
  };

  const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        onUpdateNewsData({ image: base64})
        setCoverPreview(base64);
      } catch (error) {
        console.error("Failed to convert file to base64", error);
      }
    }
  };

  const handleRemoveCover = () => {
    onUpdateNewsData({image: ""});
    setCoverPreview(undefined);
  };




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
                onChangeNewsData={onUpdateNewsData}
                onSlugManualEdit={handleSlugManualEdit}
            
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
                onChangeNewsData={onUpdateNewsData}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
              <NewsCategorySection
                categories={categories ?? []}
                value={newsData.categoryId as number}
                onChange={(cateId)=>onUpdateNewsData({categoryId: Number(cateId) })}
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
                onChangeNewsData={onUpdateNewsData}
              />

              <NewsTagsFeaturedSection
                tags={newsData.tags}
                isFeatured={newsData.isFeatured}
                onChangeNewsData={onUpdateNewsData}
              />
            </aside>
          </div>
      </div>
    </div>
  );
};

export default NewsForm;
