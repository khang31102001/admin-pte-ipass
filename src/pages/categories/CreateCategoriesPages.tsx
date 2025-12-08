import { CategoryForm } from "@/components/categories/CategoryForm";
import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { ROUTES } from "@/config/routes";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { useLoading } from "@/hooks/loading/useLoading";

import {
  NewsValidationErrors,

} from "@/validators/newsValidation";
import { useState } from "react";
import { useNavigate } from "react-router";




const CreateCategoriesPage: React.FC = () => {

  const [errors, setErrors] = useState<NewsValidationErrors>({});
  const navigate = useNavigate();
  const { isLoading } = useLoading();
  const { data } = useCategoryQuery({});
  const categories = data?.[0]?.children ?? [];

  const handleOnSubmit = () => {
    const form = document.getElementById("category-form") as HTMLFormElement | null;
    form.requestSubmit();

  };

  const handleCreateNews = async () => {
    console.log("Create category");
  };


  const handleCancel = () => {
    navigate(ROUTES.NEWS.LIST);
  };

  return (
    <>
      <PageMeta
        title="Thêm danh mục mới | Admin Dashboard"
        description="Tạo danh mục mới cho hệ thống, thiết lập phân cấp, URL hiển thị và thông tin SEO."
      />

      <PageBreadcrumb pageTitle="Thêm danh mục" />

      <div className="space-y-6">
        <ComponentCard
          title="Thông tin danh mục"
          desc="Điền thông tin để tạo danh mục mới và cấu hình hiển thị trên website."
          actionsSlot={
            <ActionButtons
              cancelLabel="Hủy / Quay lại"
              onCancel={handleCancel}
              onSave={handleOnSubmit}
              saveLabel="Lưu danh mục"
              isSaving={isLoading}
            />
          }
        >
          <CategoryForm
            mode="create"
            allCategories={categories}
            onSubmit={handleCreateNews} 
          />
        </ComponentCard>
      </div>
    </>
  )
}

export default CreateCategoriesPage;
