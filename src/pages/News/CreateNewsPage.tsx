import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import NewsForm, {
  AuthorOption,
} from "@/components/news/NewsForm";
import { ROUTES } from "@/config/routes";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { newsService } from "@/services/news/newsService";
import { News } from "@/types/news";
import { useNavigate } from "react-router";



const mockAuthors: AuthorOption[] = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Hanna" },
];

const CreateNewsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data} = useCategoryQuery({categoryType: "NEWS"});
    const categories = data?.[0]?.children ?? [];
  
    console.log("categories data:", categories);

  const submitForm = () => {
    const form = document.getElementById("news-form") as HTMLFormElement | null;
    form?.requestSubmit();
  };

  const handleCreateNews = async (values: News) => {
    try {
      console.log("Creating news with values:", values);
      await newsService.createNews(values);
      navigate(ROUTES.NEWS.LIST);
    } catch (error) {
      console.error("Failed to create news:", error);
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
              onCancel={handleCancel}
              onSave={submitForm}
              saveLabel="Lưu"
            />
          }
        >
          <NewsForm
            categories={categories}
            authors={mockAuthors}
            onSubmit={handleCreateNews}
          />
        </ComponentCard>
      </div>
    </>
  );
};

export default CreateNewsPage;
