
import { useParams } from "react-router-dom";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import SearchBoxInput from "@/components/form/input/SearchBoxInput";
import ActionButtons from "@/components/common/ActionButtons";
import { courseService } from "@/services/course/courseService";
import { toast } from "react-toastify";
import { useLoading } from "@/hooks/loading/useLoading";
import { useDetailCoursesQuery } from "@/hooks/courses/useCoursesQuery";


export default function UpdateCoursePage() {
    const { slug } = useParams<{ slug: string }>();
     const { withLoading, isLoading } = useLoading();
    const{data} = useDetailCoursesQuery(slug);


    const RenderSearchBox = () => {
        return (
            <SearchBoxInput
                placeholder="Nhập mã / tên / slug khóa học..."
                onSearch={(value) => console.log("call api từ giá trị search value:", value)}
            />
        )
    }

    const handleOnSubmit = () => {
       const form = document.getElementById("courses-form") as HTMLFormElement | null;
       form.requestSubmit();
   
     };
     const handleUpdateCourse = async (courseData: FormData, courseId?: number) => {
    //    console.log("update courseData:", courseData);

        if (!courseId) {
            console.warn("Course ID is missing. Cannot update the course.");
            return;
        }

       try {
         await withLoading(courseService.updateCourse(courseId, courseData));
         toast.success("Tạo khóa học thành công");
         // navigate(ROUTES.COURSES.LIST);
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
                            onSave={handleOnSubmit}
                            isSaving={isLoading}
                        />
                    }
                    filtersSlot={RenderSearchBox()}
                >
                    <CoursesForm
                        mode="update"
                        initCourseData={data ?? null}
                        onSubmit={handleUpdateCourse}
                        categories={[]}
                    />
                </ComponentCard>
            </div>
        </>
    );
}
