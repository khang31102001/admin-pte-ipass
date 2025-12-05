import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import {
  CourseValidationErrors,
  isCourseValid,
  validateCourse,
} from "@/validators/courseValidation";
import { ROUTES } from "@/config/routes";
import { Course } from "@/types/courses";
import { useState } from "react";
import { useNavigate } from "react-router";
import { courseService } from "@/services/course/courseService";
import { useCategoryQuery } from "@/hooks/category/useCategoryQuery";
import { useLoading } from "@/hooks/loading/useLoading";

export default function CreateCoursePage() {
  const [courseData, setCourseData] = useState<Course>({
    title: "",
    slug: "",
    level: "BEGINER",
    category: null,
    categoryId: null,
    description: "",
    isDisabled: false,
    isFeatured: false,
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
  const [errors, setErrors] = useState<CourseValidationErrors>({});
  const navigate = useNavigate();
  const {withLoading, isLoading} = useLoading();
  const { data} = useCategoryQuery({categoryType: "COURSE_MENU"});
  const categories = data?.[0]?.children ?? [];

  // console.log("categories data:", categories);

  const updateCourseData = (updates: Partial<Course>) => {
    setCourseData((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    const validatError = validateCourse(courseData);
    setErrors(validatError);

    if (!isCourseValid(validatError)) {
      // Có lỗi -> không cho save, có thể scroll lên đầu hoặc show toast
      // toast.error("Vui lòng kiểm tra lại thông tin khóa học");
      return;
    }
    withLoading(await courseService.createCourse(courseData));
    navigate(ROUTES.NEWS.LIST);
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
          actionsSlot={
            <ActionButtons
              onCancel={() => navigate(ROUTES.COURSES.LIST)}
              onSave={handleSave}
              isSaving={isLoading}
            />
          }
        >
          <CoursesForm
            courseData={courseData}
            updateCourseData={updateCourseData}
            categories={categories}
            errors={errors}
          />
        </ComponentCard>
      </div>
    </>
  );
}
