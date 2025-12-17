import PageBreadcrumb from "../../components/common/PageBreadCrumb"
import ComponentCard from "../../components/common/ComponentCard"
import PageMeta from "../../components/common/PageMeta"

import TeacherForm from "@/components/teacher/teacherForm"
import ActionButtons from "@/components/common/ActionButtons"
import { toast } from "react-toastify"
import { ITeacher } from "@/types/teacher"
import { ROUTES } from "@/config/routes"
import { useNavigate } from "react-router"

export default function EditTeacherPage() {
    
    const navigate = useNavigate();


  // 🔹 TODO: replace bằng API fetch teacher detail
  const teacherDetail: ITeacher = {
    teacherId: 1,
    name: "Ms. Anna Nguyen",
    slug: "anna-nguyen",
    bio: "IELTS teacher with 8 years of experience.",
    content: "",
    image: "",
    overallScore: "79",
    listeningScore: "80",
    speakingScore: "78",
    readingScore: "79",
    writingScore: "77",
  }

  const handleOnSubmit = () => {
    const form = document.getElementById("form-teacher") as HTMLFormElement | null
    form?.requestSubmit()
  }

  const handleUpdateTeacher = async (teacherData: FormData, id?: number | null) => {
    try {
      console.log("UPDATE TEACHER:", id, teacherData)

      toast.success("Cập nhật giáo viên thành công!")
      // navigate(ROUTES.TEACHER.LIST)
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

      <div className="space-y-6">
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
            />
          }
        >
          <TeacherForm
            mode="update"
            initialData={teacherDetail}
            onSubmit={handleUpdateTeacher}
          />
        </ComponentCard>
      </div>
    </>
  )
}
