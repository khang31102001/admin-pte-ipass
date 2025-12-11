import { CategoryForm } from "@/components/categories/CategoryForm";
import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { useCategoryAllQuery, useCategoryDetailQuery } from "@/hooks/category/useCategoryQuery";
import { useLoading } from "@/hooks/loading/useLoading";
import { categoryService } from "@/services/category/categoryService";
import { CategoryItem } from "@/types/category";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";




const EditCategoriesPages: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { withLoading ,isLoading } = useLoading();
  const { data } = useCategoryAllQuery();
  const categories = data?.items ?? [];
  const {data: categoryDetail} = useCategoryDetailQuery({slug});


  const initCate = categoryDetail ? categoryDetail.items.at(0) : null;
  //  console.log("audit check cate", categories);
  // console.log("categoryDetail", categoryDetail);
  const handleOnSubmit = () => {
    const form = document.getElementById("category-form") as HTMLFormElement | null;
    form.requestSubmit();

  };

  const handleUpdateCate = async (cate:Partial<CategoryItem>) => {
    if(!cate.categoryId) {
      console.error("Category ID is required for update.");
      return;
    }
      try{
        console.log("Update category", cate);
        await withLoading(categoryService.updateCategory(cate, cate.categoryId!))
        toast.success("Cập nhật danh mục thành công");
      }catch(err){
        console.error("Failed to update category:", err);
        toast.error("Cập nhật danh mục thất bại");
      }
   
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
              onCancel={()=> navigate(-1)}
              onSave={handleOnSubmit}
              saveLabel="Lưu danh mục"
              isSaving={isLoading}
            />
          }
        >
          <CategoryForm
            mode="update"
            initialData={initCate}
            allCategories={categories}
            onSubmit={handleUpdateCate} 
          />
        </ComponentCard>
      </div>
    </>
  )
}

export default EditCategoriesPages;
