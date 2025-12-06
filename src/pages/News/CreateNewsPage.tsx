import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import NewsForm from "@/components/news/NewsForm";
import { ROUTES } from "@/config/routes";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { useLoading } from "@/hooks/loading/useLoading";
import { newsService } from "@/services/news/newsService";
import { News } from "@/types/news";
import {
  isNewsValid,
  NewsValidationErrors,
  validateNews,
} from "@/validators/newsValidation";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const initialValues: News = {
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
  category: null,
  author: undefined,
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  tags: [],
  isFeatured: false,
};

const defaultValues: News = {
  newsId: null,
  title: "abc",
  slug: "",
  description: "",
  content: "",
  image: "",
  status: "draft",
  startDate: "",
  endDate: "",
  categoryId: undefined,
  category: null,
  author: undefined,
  metaTitle: "",
  metaDescription: "",
  keywords: [],
  tags: [],
  isFeatured: false,
};

const CreateNewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<News>({
    ...defaultValues,
    ...initialValues,
    keywords: initialValues?.keywords ?? [],
    tags: initialValues?.tags ?? [],
    image: initialValues?.image ?? "",
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<NewsValidationErrors>({});
  const navigate = useNavigate();
  const { withLoading, isLoading } = useLoading();
  const { data } = useCategoryQuery({ categoryType: "NEWS" });
  const categories = data?.[0]?.children ?? [];

  const handleCreateNews = async () => {
    const validation = validateNews(newsData);
    setErrors(validation);

    if (!isNewsValid(validation)) {
      return;
    }

    try {
      const formData = new FormData();
      if (coverFile) {
        formData.append("file", coverFile);
      }
      if (newsData) {
        const request = { ...newsData };
        delete request.image;
        formData.append("request", request ? JSON.stringify(request) : "");
      }

      await withLoading(newsService.createNews(formData));

      toast.success("Tạo tin tức thành công!");
      navigate(ROUTES.NEWS.LIST);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi tạo tin tức, vui lòng thử lại.");
    }
  };

  const handleUpdateNewsData = (updates: Partial<News>) => {
    setNewsData((prev) => ({ ...prev, ...updates }));
  };

  const handleCancel = () => {
    navigate(ROUTES.NEWS.LIST);
  };

  return (
    <>
      <PageMeta
        title="Thêm tin tức mới | Admin Dashboard"
        description="Tạo tin tức mới, nhập nội dung, SEO và trạng thái hiển thị."
      />
      <PageBreadcrumb pageTitle="Thêm tin tức" />
      <div className="space-y-6">
        <ComponentCard
          title="Thông tin tin tức"
          desc="Điền thông tin để tạo tin tức mới."
          actionsSlot={
            <ActionButtons
              cancelLabel="Hủy/Quay lại"
              onCancel={handleCancel}
              onSave={handleCreateNews}
              saveLabel="Lưu"
              isSaving={isLoading}
            />
          }
        >
          <NewsForm
            newsData={newsData}
            categories={categories}
            onUpdateNewsData={handleUpdateNewsData}
            errors={errors}
            onCoverFileChange={setCoverFile}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateNewsPage;
