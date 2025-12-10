
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import CategorySection from "@/components/categories/CategorySection";
import {  useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";




export default function ListCategoryPage() {


  const{data} = useCategoryTreeQuery({categoryType: "HEADER"});
  
  const CATEGORIES = data?.at(0).children || [];

  // console.log("categories", data);


  
  const handleAddSubcategoryInline = (parentId: number, name: string, categoryType: string) => {
    try{
      console.log("Add subcategory", { parentId, name, categoryType });
    }catch(err){
      console.error("Failed to add subcategory:", err);
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
            <CategorySection
            tree={CATEGORIES}
            onAddSubcategoryInline={handleAddSubcategoryInline}
            />
        </ComponentCard>
      </div>
    </>
  );
}
