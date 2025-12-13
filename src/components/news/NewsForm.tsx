import React, {
  useState,
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
import { generateSlug } from "@/lib/helper";
import { News, NewsStatus } from "@/types/news";
import { isNewsValid, NewsValidationErrors, validateNews } from "@/validators/newsValidation";
import FormErrorSummary from "../common/FormErrorSummary";
import { IMedia } from "@/types/media";

export type Mode = "create" | "update";


export interface AuthorOption {
  id: number | string;
  name: string;
  avatarUrl?: string;
}

interface NewsFormProps {
  mode?: Mode;
  initnewsData?: News | null;
  categories?: CategoryItem[];
  authors?: AuthorOption[];
  onSubmit: (form: FormData, newsId?: number | null ) => void;

}

const defaultValues: News = {
  newsId: null,
  title: "",
  slug: "",
  description: "",
  content: "",
  image: "",
  status: NewsStatus.DRAFT,
  startDate: "",
  endDate: "",
  categoryId: undefined,
  categoryType: "",
  category: null,
  author: undefined,
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  tags: [],
  isFeatured: false,
};



const NewsForm: React.FC<NewsFormProps> = ({
  mode,
  initnewsData = null,
  categories = [],
  onSubmit
}) => {

  const [newsData, setNewsData] = useState<News>({
     ...defaultValues,
    ...initnewsData,
    keywords: initnewsData?.keywords ?? [],
    tags: initnewsData?.tags ?? [],
  });

  const [coverPreview, setCoverPreview] = useState<IMedia | null>({
    file: null,
    preview:  "",
    isImageChanged: false,
    deleteImageUrl: ""
  });

  const [errors, setErrors] = useState<NewsValidationErrors>({});

  const isEdit = mode === "update";

  // console.log("ccheck audit newsdata:", newsData)
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

   useEffect(() => {
    if (isEdit ) {
      setNewsData((prev) => ({
        ...prev,
        ...initnewsData,
      
      }))
    }
  }, [initnewsData, isEdit]);

  useEffect(() => {
    if (!isEdit && !slugManuallyEdited) {
      setNewsData((prev) => ({
        ...prev,
        slug: generateSlug(newsData?.title)
        
      }))
    }
  }, [newsData?.title, slugManuallyEdited, isEdit]);

  useEffect(()=>{
    if(mode === "update"){
     setCoverPreview((prev) => ({
      ...prev,
        preview: initnewsData.image ?? "",
        deleteImageUrl: initnewsData.image ?? "",
        isImageChanged: false,
    }));
    }

  },[initnewsData, mode]);

  
  useEffect(() => {
    if (!newsData.categoryId) return;

    const getId = (cate: CategoryItem) =>
      (cate as any).categoryId ?? (cate as any).id;

    const findCategoryById = (
      items: CategoryItem[],
      id: number
    ): CategoryItem | null => {
      for (const item of items) {
        if (getId(item) === id) return item;

        if (item.children?.length) {
          const found = findCategoryById(item.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    const found = findCategoryById(categories, newsData.categoryId);

    if (!found) return;

    setNewsData((prev) => ({
      ...prev,
      categoryType: found.categoryType,
    }));
  }, [newsData.categoryId, categories]);



  const handleChangeImageState =(update: Partial<IMedia>)=>{
      setCoverPreview((prev)=>({
          ...prev,
        ...update,
        isImageChanged: isEdit ? true : false,
        deleteImageUrl: isEdit ? initnewsData.image : "",
      }));

     
      setNewsData((prev)=>({
        ...prev,
        image: update.preview, 
      }))
  }
  // console.log("check audit coverPreview:", coverPreview);
  const handleSlugManualEdit =  () => {
    setSlugManuallyEdited(true);
  };

  const handleUpdateNewsData = (updates: Partial<News>) => {
    setNewsData((prev) => ({ ...prev, ...updates }))
  }

  // console.log("check audit coverPreview.file:", coverPreview.file);
  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateNews(newsData);
    setErrors(validation);

    if (!isNewsValid(validation)) {
      return;
    }

    const formData = new FormData();
    if(coverPreview.file){
      formData.append('file', coverPreview.file);
    }

    if(newsData){
      const payload: News = {
        ...newsData,
        isImageChanged: !!coverPreview.isImageChanged,
        deleteImageUrl: coverPreview.deleteImageUrl,
      }
      delete payload.image;
      delete payload.newsId;
      formData.append('request', JSON.stringify(payload) ??  null);
    }


    onSubmit?.(formData, isEdit ? initnewsData?.newsId : null);
  }

  // console.log(" news content", newsData.content)


  return (
    <div className="min-h-screen bg-white text-[#1A1A1A]">
      <FormErrorSummary errors={errors} />
      <form id="news-form" onSubmit={handleSumit}>
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-10">
          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* LEFT */}
            <div className="space-y-6 lg:space-y-8">
              <NewsBasicInfoSection
                title={newsData?.title}
                slug={newsData?.slug}
                description={newsData?.description}
                content={newsData?.content}
                onChangeNewsData={handleUpdateNewsData}
                onSlugManualEdit={handleSlugManualEdit}
                readOnluSlug={isEdit}

              />

              <NewsMediaSection
                coverPreview={coverPreview?.preview}
                onChangeImge={handleChangeImageState}
              />

              <NewsSchedulingSection
                status={newsData?.status}
                startDate={newsData?.startDate}
                endDate={newsData?.endDate}
                onChangeNewsData={handleUpdateNewsData}
              />
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="lg:sticky lg:top-20 h-fit space-y-6 lg:space-y-7">
              <NewsCategorySection
                categories={categories}
                value={newsData?.categoryId as number}
                onChange={(cateId) => handleUpdateNewsData({ categoryId: Number(cateId) })}
              />


              {/* <NewsAuthorSection
                authors={authors}
                author={values.author}
                onChange={handleChange}
              /> */}

              <NewsSeoMetaSection
                metaTitle={newsData?.metaTitle}
                metaDescription={newsData?.metaDescription}
                keywords={newsData?.keywords}
                onChangeNewsData={handleUpdateNewsData}
              />

              <NewsTagsFeaturedSection
                tags={newsData.tags}
                isFeatured={newsData.isFeatured}
                onChangeNewsData={handleUpdateNewsData}
              />
            </aside>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
