import { useParams, useNavigate } from "react-router";
import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import NewsForm from "@/components/news/NewsForm";
import { ROUTES } from "@/config/routes";
import { newsService } from "@/services/news/newsService";
import { toast } from "react-toastify";
import { useLoading } from "@/hooks/loading/useLoading";
import { useNewsDetailQuery } from "@/hooks/news/useNewsQuery";
import { smoothNavigate } from "@/lib/helper";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";




const EditNewsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useNewsDetailQuery(slug);
  const {withLoading, isLoading: loadingUpdate} = useLoading();
   const { data: cate } = useCategoryTreeQuery({ categoryType: "NEWS" });
    const categories = cate?.[0]?.children ?? [];
    console.log("check news",data);


  const handleOnSubmit = () => {
    const form = document.getElementById("news-form") as HTMLFormElement | null;
    form.requestSubmit();

  };

  const handleCreateNews = async(newsData: FormData, newsId: number) => {
    if (!newsId) return;

    try {
       await withLoading(newsService.updateNews(newsId, newsData));
      toast.success("Cập nhật tin tức thành công!");
      await refetch();
      smoothNavigate(navigate, ROUTES.NEWS.LIST);
    } catch (e) {
      console.log(" có lỗi sãy ra:", e)
      toast.error("Có lỗi khi cập nhật tin tức");
    }
  }



  const handleCancel = () => {
    navigate(ROUTES.NEWS.LIST);
  };

  return (
    <>
      <PageMeta
        title="Cập nhật tin tức | Admin Dashboard"
        description="Chỉnh sửa thông tin, nội dung, SEO và trạng thái tin tức."
      />

      <PageBreadcrumb pageTitle="Cập nhật tin tức" />

      <div className="space-y-6">
        <ComponentCard
          title="Thông tin tin tức"
          desc="Chỉnh sửa nội dung, SEO và trạng thái hiển thị."
          actionsSlot={
            <ActionButtons
              saveLabel="Lưu thay đổi"
              onSave={handleOnSubmit}
              onCancel={handleCancel}
              isSaving={loadingUpdate}
            />
          }
        >
          {isLoading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : data ? (
            <NewsForm
              mode="update"
              initnewsData={data}
              categories={categories}
              onSubmit={handleCreateNews}
            />
          ) : (
            <div className="py-10 text-center text-sm text-red-500">
              Không tìm thấy dữ liệu tin tức.
            </div>
          )}
        </ComponentCard>
      </div>
    </>
  );
};

export default EditNewsPage;
