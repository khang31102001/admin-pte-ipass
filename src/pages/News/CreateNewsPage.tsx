import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import NewsForm from "@/components/news/NewsForm";
import { ROUTES } from "@/config/routes";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";

import { useLoading } from "@/hooks/loading/useLoading";
import { newsService } from "@/services/news/newsService";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";



const CreateNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { withLoading, isLoading } = useLoading();
  const { data } = useCategoryTreeQuery({ categoryType: "NEWS" });
  const categories = data?.[0]?.children ?? [];

  const handleOnSubmit = () => {
    const form = document.getElementById("news-form") as HTMLFormElement | null;
    form.requestSubmit();

  };

  const handleCreateNews = async (newsData: FormData) => {
    
    try {
     
      await withLoading(newsService.createNews(newsData));

      toast.success("Tạo tin tức thành công!");
      // navigate(ROUTES.NEWS.LIST);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi tạo tin tức, vui lòng thử lại.");
    }
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
              onSave={handleOnSubmit}
              saveLabel="Lưu"
              isSaving={isLoading}
            />
          }
        >
          <NewsForm
            mode="create"
            categories={categories}
            onSubmit={handleCreateNews}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateNewsPage;
