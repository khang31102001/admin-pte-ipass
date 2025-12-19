import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import ComponentCard from "../../components/common/ComponentCard"
import PageMeta from "../../components/common/PageMeta"
import TeacherForm from "@/components/teacher/teacherForm"
import ActionButtons from "@/components/common/ActionButtons"
import { toast } from "react-toastify"
import { ROUTES } from "@/config/routes"
import { useNavigate, useParams } from "react-router"
import { teacherKeys, useTeacherDetailQuery } from "@/hooks/teacher/useTeachersQuery"
import { useLoading } from "@/hooks/loading/useLoading"
import { teachersService } from "@/services/teacher/teacherService"
import { useQueryClient } from "@tanstack/react-query"
import EmptyState from "@/components/common/EmptyState"
import PageLoading from "@/components/loading/PageLoading"
import { smoothNavigate } from "@/lib/helper"

export default function EditTeacherPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const {data, isLoading, error} = useTeacherDetailQuery(slug);
    const {withLoading, isLoading: isSaving} = useLoading();
    const teacher = data ?? null;
    const queryClient = useQueryClient(); 

  const handleOnSubmit = () => {
    const form = document.getElementById("form-teacher") as HTMLFormElement | null
    form?.requestSubmit()
  }

  const handleUpdateTeacher = async (teacherData: FormData, id?: number | null) => {
    if(!id){
      console.log("missing id, when you update!!!")
    }
    try {
      await withLoading(teachersService.updateTeachers(id, teacherData));
      await queryClient.invalidateQueries({ queryKey: teacherKeys.all });
      toast.success("Cập nhật giáo viên thành công!")
      smoothNavigate( navigate,ROUTES.TEACHER.LIST)
    } catch (error) {
      console.error(error)
      toast.error("Có lỗi xảy ra khi cập nhật giáo viên.")
    }
  }

   if (!slug) return <EmptyState title="Đường dẫn không hợp lệ" />;
  if (isLoading) return <PageLoading title="Đang tải dử liệu" />
  if (error) return <EmptyState title="Không thể tải dữ liệu" />;
  if (!teacher) {
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
        title="Cập nhật giáo viên | Admin Dashboard"
        description="Chỉnh sửa thông tin giáo viên trong hệ thống."
      />

      <PageBreadcrumb pageTitle="Cập nhật giáo viên" />
        <ComponentCard
          title="Cập nhật giáo viên"
          desc="Chỉnh sửa thông tin giáo viên và lưu thay đổi vào hệ thống."
          actionsSlot={
            <ActionButtons
              cancelLabel="Hủy / Quay lại"
              onCancel={() => {
                navigate(ROUTES.TEACHER.LIST)
              }}
              onSave={handleOnSubmit}
              saveLabel="Lưu thay đổi"
              isSaving={isSaving}
            />
          }
        >
         <div className={isSaving ? "pointer-events-none opacity-60" : ""}>
           <TeacherForm
            mode="update"
            initialData={teacher}
            onSubmit={handleUpdateTeacher}
          />
         </div>
        </ComponentCard>
   
    </>
  )
}
