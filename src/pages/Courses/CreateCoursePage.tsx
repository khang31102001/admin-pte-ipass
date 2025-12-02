import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import Button from "@/components/ui/button/Button";
import { Course } from "@/types/courses";
import { useState } from "react";




export default function CreateCoursePage() {

  const [courseData, setCourseData] = useState<Course>({
    title: "",
    slug: "",
    level: "Beginner",
    category: null,
    category_id: null,
    description: "",
    is_disbale: false,
    is_featured: false,
    image: null,
    content: "",
    duration: "",
    startDate: "",
    endDate: "",
    metaTitle: "",
    metaDescription: "",
    audience: [],
    keywords: [],
    schemaEnabled: true,
    schemaMode: "auto",
    schemaData: "",
  });


  const updateCourseData = (updates: Partial<Course>) => {
    setCourseData((prev) => ({ ...prev, ...updates }));

  };
  console.log("courseData: ", courseData)

  const btnUI = {
    actions: (
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          Hủy
        </Button>
        <Button size="sm" >
          Lưu nháp
        </Button>
        <Button size="sm" variant="primary">
          Lưu &amp; xuất bản
        </Button>
      </div>
    ),
  };



  return (
    <>
      <PageMeta
        title="Thêm khóa học mới | Admin Dashboard"
        description="Tạo khóa học mới trong hệ thống quản lý. Nhập thông tin cơ bản, nội dung chi tiết, SEO và thời gian học để hoàn thiện khóa học."
      />
      <PageBreadcrumb pageTitle="Thêm khóa học" />
      <div className="space-y-6">
        <ComponentCard
          title="Thông tin khóa học"
          desc="Điền thông tin để tạo khóa học mới."
          actionsSlot={btnUI.actions}
        >
          <CoursesForm
            courseData={courseData}
            updateCourseData={updateCourseData}
            categories={[]}
          />
        </ComponentCard>
      </div>
    </>
  );
}
