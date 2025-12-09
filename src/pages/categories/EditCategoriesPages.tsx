import { CategoryForm } from "@/components/categories/CategoryForm";
import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { useCategoryDetailQuery, useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import { useLoading } from "@/hooks/loading/useLoading";
import { CategoryItem } from "@/types/category";
import { useNavigate, useParams } from "react-router";




const EditCategoriesPages: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isLoading } = useLoading();
  const { data } = useCategoryTreeQuery();
  const categories = data?.[0]?.children ?? [];
  const {data: categoryDetail} = useCategoryDetailQuery({slug});

  const initCate = categoryDetail ? categoryDetail.items.at(0) : null;

  // console.log("categoryDetail", categoryDetail);
  const handleOnSubmit = () => {
    const form = document.getElementById("category-form") as HTMLFormElement | null;
    form.requestSubmit();

  };

  const handleUpdateCate = async (Cate:Partial<CategoryItem>) => {
    if(!Cate.id) {
      console.error("Category ID is required for update.");
      return;
    }
      try{
        const formData = new FormData();
        const request = {...Cate};
        if(request){
          formData.append("request", JSON.stringify(request));
        }
         console.log("Create category", Cate);

      }catch(err){
        console.error("Failed to update category:", err);
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
