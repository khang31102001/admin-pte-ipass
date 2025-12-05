import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import NewsForm, {
  AuthorOption,

} from "@/components/news/NewsForm";
import { ROUTES } from "@/config/routes";
import { newsService } from "@/services/news/newsService";
import { News } from "@/types/news";

const mockCategories: CategoryOption[] = [
  { id: 1, name: "PTE Tips" },
  { id: 2, name: "PTE Exam News" },
];

const mockAuthors: AuthorOption[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Hanna" },
];

const normalizeStatus = (
  status?: News["status"]
): News["status"] => {
  if (!status) return "draft";
  const normalized = status.toString().toLowerCase();
  if (normalized === "published") return "published";
  if (normalized === "scheduled") return "scheduled";
  return "draft";
};

const mapNewsToFormValues = (news: News): News => ({
  title: news.title ?? "",
  slug: news.slug ?? "",
  description: news.description ?? "",
  content: news.content ?? "",
  image: news.image ?? "",
  status: normalizeStatus(news.status),
  startDate: news.startDate ?? "",
  endDate: news.endDate ?? "",
  categoryId: news.categoryId ?? undefined,
  authorId: news.authorId ?? undefined,
  metaTitle: news.metaTitle ?? "",
  metaDescription: news.metaDescription ?? "",
  keywords: news.keywords ?? [],
  tags: news.tags ?? [],
  isFeatured: news.isFeatured ?? false,
});

const EditNewsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState<News | null>(
    null
  );
  const [newsId, setNewsId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchNewsDetail = async () => {
      setLoading(true);
      try {
        const detail: News = await newsService.getNewsDetail({ slug });
        setNewsId(detail?.newsId ?? null);
        setInitialValues(mapNewsToFormValues(detail));
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [slug]);


  const handleUpdateNews = async (values: Partial<News>) => {
    if (!newsId) return;
    try {
      await newsService.updateNews(newsId, values);
      navigate(ROUTES.NEWS.LIST);
    } catch (error) {
      console.error("Failed to update news:", error);
    }
  };

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
              onSave={()=>console.log("sử lý lại")}
              onCancel={handleCancel}
            />
          }
        >
          {loading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : initialValues ? (
            <NewsForm
              newsData={initialValues}
              categories={mockCategories}
              authors={mockAuthors}
              onUpdateNewsData={handleUpdateNews}
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
