
import { useNavigate, useParams } from "react-router-dom";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import ActionButtons from "@/components/common/ActionButtons";
import { courseService } from "@/services/course/courseService";
import { toast } from "react-toastify";
import { useLoading } from "@/hooks/loading/useLoading";
import { useDetailCoursesQuery } from "@/hooks/courses/useCoursesQuery";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import { ROUTES } from "@/config/routes";
import { useQueryClient } from "@tanstack/react-query";


export default function UpdateCoursePage() {
    const { slug } = useParams<{ slug: string }>();
     const { withLoading, isLoading } = useLoading();
     const navigate = useNavigate();
    const{data} = useDetailCoursesQuery(slug);
    const { data: cate } = useCategoryTreeQuery({ categoryType: "HEADER" });
    const categories = cate?.[0]?.children ?? [];
    const queryClient = useQueryClient();
    //  console.log("check data", data)

    const handleOnSubmit = () => {
       const form = document.getElementById("courses-form") as HTMLFormElement | null;
       form.requestSubmit();
   
     };
     const handleUpdateCourse = async (courseData: FormData, courseId?: number) => {
       console.log("update courseData:", courseData);

        if (!courseId) {
            console.warn("Course ID is missing. Cannot update the course.");
            return;
        }

       try {
         await withLoading(courseService.updateCourse(courseId, courseData));
         await queryClient.invalidateQueries({ queryKey: ["courses"] });
         await queryClient.invalidateQueries({ queryKey: ["courses", slug] }); 
         toast.success("Tạo khóa học thành công");
         navigate(ROUTES.COURSES.LIST);
       } catch (error) {
         console.error("Lỗi khi tạo khóa học:", error);
         toast.error("Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại.");
       };
     };
    return (
        <>
            <PageMeta
                title="Cập nhật khóa học | Admin Dashboard"
                description="Chỉnh sửa thông tin khóa học, nội dung chi tiết, SEO và thời gian học rồi lưu thay đổi."
            />

            <PageBreadcrumb pageTitle="Cập nhật khóa học" />

            <div className="space-y-6">
                <ComponentCard
                    title="Thông tin khóa học"
                    desc="Chỉnh sửa thông tin, nội dung và cấu hình khóa học."
                    actionsSlot={
                        <ActionButtons
                            saveLabel= "Lưu thay đổi"
                            onCancel={()=>navigate(-1)}
                            onSave={handleOnSubmit}
                            isSaving={isLoading}
                        />
                    }
                  
                >
                    <CoursesForm
                        mode="update"
                        initCourseData={data ?? null}
                        onSubmit={handleUpdateCourse}
                        categories={categories}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
