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
import { newsKeys, useNewsDetailQuery } from "@/hooks/news/useNewsQuery";
import { smoothNavigate } from "@/lib/helper";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import PageLoading from "@/components/loading/PageLoading";
import EmptyState from "@/components/common/EmptyState";
import { useQueryClient } from "@tanstack/react-query";




const EditNewsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: news, isLoading,error  } = useNewsDetailQuery(slug);
  const { withLoading, isLoading: isSaving } = useLoading();
  const { data: cate } = useCategoryTreeQuery({ categoryType: "NEWS" });
  const categories = cate?.[0]?.children ?? [];
  const queryClient = useQueryClient();
 


  const handleOnSubmit = () => {
    const form = document.getElementById("news-form") as HTMLFormElement | null;
    form.requestSubmit();

  };

  const handleCreateNews = async (newsData: FormData, newsId: number) => {
    if (!newsId) return;

    try {
      await withLoading(newsService.updateNews(newsId, newsData));
      queryClient.invalidateQueries({queryKey: newsKeys.all})
      toast.success("Cập nhật tin tức thành công!");
      smoothNavigate(navigate, ROUTES.NEWS.LIST);
    } catch (e) {
      console.log(" có lỗi sãy ra:", e)
      toast.error("Có lỗi khi cập nhật tin tức");
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.NEWS.LIST);
  };

  if (!slug) return <EmptyState title="Đường dẫn không hợp lệ" />;
  if (isLoading) return <PageLoading title="Đang tải tin tức" />
  if (error) return <EmptyState title="Không thể tải dữ liệu" />;
  if (!news) {
    return (
      <>
        <PageMeta title="Không tìm thấy tin tức | Admin Dashboard" description="Tin tức không tồn tại hoặc đã bị xóa." />
        <PageBreadcrumb pageTitle="Cập nhật khóa học" />
        <EmptyState
          title="Không tìm thấy khóa học"
          description="Vui lòng kiểm tra lại đường dẫn hoặc quay lại danh sách."
          action={
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg bg-[#04016C] px-4 py-2 text-xs font-medium text-white hover:opacity-90"
            >
              ← Quay lại danh sách
            </button>
          }
        />
      </>
    );
  }

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
              isSaving={isSaving}
            />
          }
        >
          <div className={isSaving ? "pointer-events-none opacity-60" : ""}>
            <NewsForm
              mode="update"
              initnewsData={news}
              categories={categories}
              onSubmit={handleCreateNews}
            />

          </div>

        </ComponentCard>
      </div>
    </>
  );
};

export default EditNewsPage;
