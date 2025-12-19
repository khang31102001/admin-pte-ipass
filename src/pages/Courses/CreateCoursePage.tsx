import ActionButtons from "@/components/common/ActionButtons";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import { ROUTES } from "@/config/routes";
import { useNavigate } from "react-router";
import { courseService } from "@/services/course/courseService";

import { useLoading } from "@/hooks/loading/useLoading";
import { toast } from "react-toastify";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import { useQueryClient } from "@tanstack/react-query";
import { courseKeys } from "@/hooks/courses/useCoursesQuery";
import { smoothNavigate } from "@/lib/helper";

export default function CreateCoursePage() {



  const navigate = useNavigate();
  const { withLoading, isLoading } = useLoading();
  const { data } = useCategoryTreeQuery({ categoryType: "HEADER" });
  const categories = data?.[0]?.children ?? [];
  const queryClient = useQueryClient(); 

  // console.log("check data:", data);

  const handleOnSubmit = () => {
    const form = document.getElementById("courses-form") as HTMLFormElement | null;
    if(!form) {
      console.error("Không tìm thấy form courses-form.")
    }
    form.requestSubmit();

  };
  const handleCreateCourse = async (courseData: FormData) => {
   // xem xét Loading → Success → Invalidate → Navigate
    try {
      await withLoading(courseService.createCourse(courseData));
      await queryClient.invalidateQueries({ queryKey: courseKeys.list()});
      toast.success("Tạo khóa học thành công");
      smoothNavigate( navigate, ROUTES.COURSES.LIST);
    } catch (error) {
      console.error("Lỗi khi tạo khóa học:", error);
      toast.error("Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại.");
    };
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
                onSave={handleOnSubmit}
                isSaving={isLoading}
              />
            }
          >
            <CoursesForm
              mode="create"
              initCourseData={null}
              onSubmit={handleCreateCourse}
              categories={categories}

            />
          </ComponentCard>
        </div>
      </>
    );
  }
