import { CategoryForm } from "@/components/categories/CategoryForm";
import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import EmptyState from "@/components/common/EmptyState";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import PageLoading from "@/components/loading/PageLoading";
import { categoryKeys, useCategoryAllQuery, useCategoryDetailQuery } from "@/hooks/category/useCategoryQuery";
import { useLoading } from "@/hooks/loading/useLoading";
import { categoryService } from "@/services/category/categoryService";
import { CategoryItem } from "@/types/category";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";




const EditCategoriesPages: React.FC = () => {

  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { withLoading , isLoading:isSaving } = useLoading();
  const { data, isLoading, error } = useCategoryAllQuery();
  const categories = data?.items ?? [];
  const {data: categoryDetail} = useCategoryDetailQuery({slug});
   const queryClient = useQueryClient(); 


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
        await withLoading(categoryService.updateCategory(cate, cate.categoryId!));
        queryClient.invalidateQueries({queryKey: categoryKeys.all})
        toast.success("Cập nhật danh mục thành công");
      }catch(err){
        console.error("Failed to update category:", err);
        toast.error("Cập nhật danh mục thất bại");
      }
   
  };

    if (!slug) return <EmptyState title="Đường dẫn không hợp lệ" />;
    if (isLoading) return <PageLoading title="Đang tải thông tin" />
    if (error) return <EmptyState title="Không thể tải dữ liệu" />;
    if (!initCate) {
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
              isSaving={isSaving}
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
