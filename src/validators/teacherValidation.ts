import { isEmpty } from "@/lib/helper"
import { ITeacher } from "@/types/teacher"

export type TeacherValidationErrors = Partial<Record<keyof ITeacher, string>>

export function validateTeacher(teacher: ITeacher): TeacherValidationErrors {
  const errors: TeacherValidationErrors = {}

  // Image
  if (isEmpty(teacher.image)) {
    errors.image = "Vui lòng chọn ảnh đại diện cho giáo viên"
  }

  // Name
  if (isEmpty(teacher.name)) {
    errors.name = "Vui lòng nhập tên giáo viên"
  } else if (String(teacher.name).length > 120) {
    errors.name = "Tên giáo viên tối đa 120 ký tự"
  }

  // Slug (nếu auto-gen thì chỉ check format + length)
  if (isEmpty(teacher.slug)) {
    errors.slug = "Vui lòng nhập slug"
  } else {
    const slugStr = String(teacher.slug)
    if (slugStr.length > 160) {
      errors.slug = "Slug tối đa 160 ký tự"
    } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slugStr)) {
      errors.slug = "Slug không hợp lệ (ví dụ: anna-nguyen)"
    }
  }

  // Bio
  if (isEmpty(teacher.bio)) {
    errors.bio = "Vui lòng nhập giới thiệu ngắn (bio)"
  } else if (String(teacher.bio).length > 250) {
    errors.bio = "Bio tối đa 250 ký tự"
  }

  // Content (optional)
  if (teacher.content && String(teacher.content).length > 20000) {
    errors.content = "Nội dung quá dài (tối đa 20,000 ký tự)"
  }

  // ===== Score rules =====

 const scoreRegex = /^([0-8](\.[0-9])?|9(\.[0-5])?)$/

  const validateScore = (
    value: unknown,
    field: keyof ITeacher,
    label: string
  ) => {

    if (value === null || value === undefined || value === "") {
      errors[field] = `Vui lòng nhập điểm ${label}`
      return
    }

    const num = Number(value)
    if (Number.isNaN(num)) {
      errors[field] = `Điểm ${label} phải là số`
      return
    }
    const s = String(value).trim()
    if (!scoreRegex.test(s)) {
      errors[field] = `Điểm ${label} không hợp lệ (0–9.5, ví dụ: 8.5)`
      return
    }
  }
  validateScore(teacher.overallScore, "overallScore", "Overall")
  validateScore(teacher.listeningScore, "listeningScore", "Listening")
  validateScore(teacher.speakingScore, "speakingScore", "Speaking")
  validateScore(teacher.readingScore, "readingScore", "Reading")
  validateScore(teacher.writingScore, "writingScore", "Writing")

  // System fields (thường backend set) -> optional check nếu bạn muốn cứng hơn
  if (teacher.version != null && teacher.version < 1) {
    errors.version = "Version không hợp lệ"
  }

  return errors
}

export function isTeacherValid(errors: TeacherValidationErrors): boolean {
  return Object.keys(errors).length === 0
}
