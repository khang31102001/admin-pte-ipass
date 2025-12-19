
import { useNavigate, useParams } from "react-router-dom";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import CoursesForm from "@/components/courses/CoursesForm";
import ActionButtons from "@/components/common/ActionButtons";
import { courseService } from "@/services/course/courseService";
import { toast } from "react-toastify";
import { useLoading } from "@/hooks/loading/useLoading";
import { useCategoryTreeQuery } from "@/hooks/category/useCategoryQuery";
import { ROUTES } from "@/config/routes";
import { useQueryClient } from "@tanstack/react-query";
import PageLoading from "@/components/loading/PageLoading";
import EmptyState from "@/components/common/EmptyState";
import { courseKeys, useCourseDetailQuery } from "@/hooks/courses/useCoursesQuery";
import { smoothNavigate } from "@/lib/helper";


export default function EditCoursesPage() {
    const { slug } = useParams<{ slug: string }>();
    const { withLoading, isLoading: isSaving } = useLoading();
    const navigate = useNavigate();
    const { data: course, isLoading, error } = useCourseDetailQuery(slug);
    const { data: cate } = useCategoryTreeQuery({ categoryType: "HEADER" });
    const categories = cate?.[0]?.children ?? [];
    const queryClient = useQueryClient();


    const handleOnSubmit = () => {
        const form = document.getElementById("courses-form") as HTMLFormElement | null;
        form.requestSubmit();

    };
    const handleUpdateCourse = async (courseData: FormData, courseId?: number) => {
        if (!courseId) {
            console.warn("Course ID is missing. Cannot update the course.");
            return;
        }
        try {
            await withLoading(courseService.updateCourse(courseId, courseData));
            await queryClient.invalidateQueries({ queryKey: courseKeys.all });
            toast.success("Tạo khóa học thành công");
            smoothNavigate(navigate, ROUTES.COURSES.LIST)
        } catch (error) {
            console.error("Lỗi khi tạo khóa học:", error);
            toast.error("Có lỗi xảy ra khi tạo khóa học. Vui lòng thử lại.");
        };
    };

    if (!slug) return <EmptyState title="Đường dẫn không hợp lệ" />;
    if (isLoading) return <PageLoading title="Đang tải thông tin khóa học" />
    if (error) return <EmptyState title="Không thể tải dữ liệu" />;
    if (!course) {
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
                            saveLabel="Lưu thay đổi"
                            onCancel={() => navigate(-1)}
                            onSave={handleOnSubmit}
                            isSaving={isSaving}
                        />
                    }

                >
                    <div className={isSaving ? "pointer-events-none opacity-60" : ""}>
                        <CoursesForm
                            mode="update"
                            initCourseData={course}
                            onSubmit={handleUpdateCourse}
                            categories={categories}
                        />
                    </div>
                </ComponentCard>
            </div>
        </>
    );
}
