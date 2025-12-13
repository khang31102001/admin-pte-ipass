
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import {  useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import { CategoryItem } from "@/types/category";
import { categoryService } from "@/services/category/categoryService";
import { toast } from "react-toastify";
import ListCategoryItem from "@/components/categories/ListCategoryItem";




export default function ListCategoryPage() {


  const{data, refetch} = useCategoryTreeQuery({categoryType: "HEADER"});

  
  const CATEGORIES = data?.at(0).children || [];

  // console.log("categories", data);
  
  const handleAddSubcategoryInline = async(cate: Partial<CategoryItem>) => {
    if(!cate.parentId) {
      console.error("Parent ID is required to add a subcategory.");
      return;
    };
    try{
        await categoryService.createCategory(cate);
        toast.success("Thêm danh mục con thành công");
        await refetch();
    }catch(err){
      console.error("Failed to add subcategory:", err);
      toast.error("Thêm danh mục con thất bại");
    }
  }

  const handleDelelte = async(categoryId: number) => {
    console.log("categoryId")
    if(!categoryId){
      console.error("Category ID is required for update.");
    }
    try{
        // console.log("Delete categoryId", categoryId);
        await categoryService.deleteCategory(categoryId);
        await refetch();
    }catch(e){
      console.error("Delete cate error! ", e)
    }
  }

  return (
    <>
      <PageMeta
        title="Danh sách khóa học | Admin Dashboard"
        description="Trang quản lý danh sách tất cả các khóa học trong hệ thống. Xem, tìm kiếm, lọc, chỉnh sửa và quản lý trạng thái khóa học."
      />
      <PageBreadcrumb pageTitle="Danh sách khóa học" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách tất cả các khóa học"
          desc="Quản lý danh sách và trạng thái các khóa học."

        >
            <ListCategoryItem
              tree={CATEGORIES}
              onAddSubcategoryInline={handleAddSubcategoryInline}
              onDelete={handleDelelte}
            />
        </ComponentCard>
      </div>
    </>
  );
}
