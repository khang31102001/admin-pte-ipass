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

export default function EditTeacherPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const {data} = useTeacherDetailQuery(slug);
    const {withLoading, isLoading} = useLoading();
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
      navigate(ROUTES.TEACHER.LIST);
    } catch (error) {
      console.error(error)
      toast.error("Có lỗi xảy ra khi cập nhật giáo viên.")
    }
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
              isSaving={isLoading}
            />
          }
        >
          <TeacherForm
            mode="update"
            initialData={teacher}
            onSubmit={handleUpdateTeacher}
          />
        </ComponentCard>
   
    </>
  )
}
