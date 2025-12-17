import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import ComponentCard from "../../components/common/ComponentCard"
import PageMeta from "../../components/common/PageMeta"

import TeacherForm from "@/components/teacher/teacherForm"
import ActionButtons from "@/components/common/ActionButtons"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"
import { ROUTES } from "@/config/routes"

export default function CreateTeacherPage() {


  // Submit từ ActionButtons (header)
  const navigate = useNavigate();
  const handleOnSubmit = () => {
    const form = document.getElementById("form-teacher") as HTMLFormElement | null
    form?.requestSubmit()
  }

  // Nhận data từ TeacherForm
  const handleCreateTeacher = async (teacherData: FormData) => {
    try {
      console.log("CREATE TEACHER:", teacherData)

      toast.success("Tạo giáo viên thành công!")
      // navigate(ROUTES.TEACHER.LIST)
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

      <div className="space-y-6">
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
            />
          }
        >
          <TeacherForm
            mode="create"
            onSubmit={handleCreateTeacher}
          />
        </ComponentCard>
      </div>
    </>
  )
}
