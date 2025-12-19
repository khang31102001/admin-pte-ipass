import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import ComponentCard from "../../components/common/ComponentCard"
import PageMeta from "../../components/common/PageMeta"

import TeacherForm from "@/components/teacher/teacherForm"
import ActionButtons from "@/components/common/ActionButtons"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { ROUTES } from "@/config/routes"
import { useLoading } from "@/hooks/loading/useLoading"
import { teachersService } from "@/services/teacher/teacherService"
import { useQueryClient } from "@tanstack/react-query"
import { teacherKeys } from "@/hooks/teacher/useTeachersQuery"
import { smoothNavigate } from "@/lib/helper"

export default function CreateTeacherPage() {

  const { withLoading, isLoading } = useLoading();
   const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const handleOnSubmit = () => {
    const form = document.getElementById("form-teacher") as HTMLFormElement | null
    form?.requestSubmit()
  }
  const handleCreateTeacher = async (teacherData: FormData) => {
    // xem xét Loading → Success → Invalidate → Navigate
    try {
      await withLoading(teachersService.createTeachers(teacherData));
      await queryClient.invalidateQueries({queryKey: teacherKeys.all});
      toast.success("Tạo giáo viên thành công!");
      smoothNavigate(navigate, ROUTES.COURSES.LIST)
    } catch (error) {
      console.error(error)
      toast.error("Có lỗi xảy ra khi tạo giáo viên, vui lòng thử lại.")
    }
  }

  return (
    <>
      <PageMeta
        title="Tạo giáo viên | Admin Dashboard"
        description="Thêm mới giáo viên và quản lý thông tin giảng dạy trong hệ thống."
      />

      <PageBreadcrumb pageTitle="Tạo giáo viên" />
        <ComponentCard
          title="Tạo giáo viên mới"
          desc="Nhập đầy đủ thông tin giáo viên trước khi lưu vào hệ thống."
          actionsSlot={
            <ActionButtons
              cancelLabel="Hủy / Quay lại"
              onCancel={() => {
                navigate(ROUTES.TEACHER.LIST)
              }}
              onSave={handleOnSubmit}
              saveLabel="Lưu"
              isSaving={isLoading}
            />
          }
        >
          <TeacherForm
            mode="create"
            onSubmit={handleCreateTeacher}
          />
        </ComponentCard>
      
    </>
  )
}
