
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import { CategoryItem } from "@/types/category";
import { categoryService } from "@/services/category/categoryService";
import { toast } from "react-toastify";
import ListCategoryItem from "@/components/categories/ListCategoryItem";
import EmptyState from "@/components/common/EmptyState";
import ListSkeleton from "@/components/loading/ListSkeleton";




export default function ListCategoryPage() {

  const { data, isLoading, error, refetch } = useCategoryTreeQuery({ categoryType: "HEADER" });
  const CATEGORIES = data?.at(0).children || [];

  // console.log("categories", data);

  const handleAddSubcategoryInline = async (cate: Partial<CategoryItem>) => {
    if (!cate.parentId) {
      console.error("Parent ID is required to add a subcategory.");
      return;
    };
    try {
      await categoryService.createCategory(cate);
      toast.success("Thêm danh mục con thành công");
      await refetch();
    } catch (err) {
      console.error("Failed to add subcategory:", err);
      toast.error("Thêm danh mục con thất bại");
    }
  }

  const handleDelelte = async (categoryId: number) => {
    console.log("categoryId")
    if (!categoryId) {
      console.error("Category ID is required for update.");
    }
    try {
      // console.log("Delete categoryId", categoryId);
      await categoryService.deleteCategory(categoryId);
      await refetch();
    } catch (e) {
      console.error("Delete cate error! ", e)
    }
  }

  if (isLoading) return <ListSkeleton rows={10} variant="table" />
  if (error) return <EmptyState title="Không thể tải dữ liệu" />;

  return (
    <>
      <PageMeta
        title="Danh mục khóa học | Admin Dashboard"
        description="Trang quản lý danh mục khóa học trong hệ thống. Tạo, sắp xếp, chỉnh sửa, xóa danh mục và danh mục con để tổ chức khóa học."
      />

      <PageBreadcrumb pageTitle="Danh mục khóa học" />

      <div className="space-y-6">
        <ComponentCard
          title="Quản lý danh mục khóa học"
          desc="Tạo và sắp xếp danh mục (cấp 1–2–3) để phân loại khóa học rõ ràng và dễ quản trị."
        >
          {!isLoading && (!CATEGORIES || CATEGORIES.length === 0) ? (
            <EmptyState
              title="Chưa có danh mục khóa học"
              description="Hãy tạo danh mục đầu tiên để bắt đầu tổ chức và quản lý các khóa học trong hệ thống."
              action={
                <button className="rounded-lg bg-[#04016C] px-4 py-2 text-xs font-medium text-white">
                  ➕ Tạo danh mục mới
                </button>
              }
            />
          ) : (
            <ListCategoryItem
              tree={CATEGORIES}
              onAddSubcategoryInline={handleAddSubcategoryInline}
              onDelete={handleDelelte}
            />
          )}
        </ComponentCard>
      </div>
    </>

  );
}
