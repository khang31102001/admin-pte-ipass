import { countWords, isEmpty } from "@/lib/helper";
import { Course } from "@/types/courses";


export type CourseValidationErrors = Partial<Record<keyof Course, string>>;

// Tùy luật của bạn, mình đưa ví dụ cơ bản:
export function validateCourse(course: Course): CourseValidationErrors {
  const errors: CourseValidationErrors = {};

  // Tên khóa học
  if (isEmpty(course.title)) {
    errors.title = "Vui lòng nhập tên khóa học";
  } else if (String(course.title).length > 150) {
    errors.title = "Tên khóa học tối đa 150 ký tự";
  }

  // Slug (nếu bạn cho auto-gen thì có thể bỏ required)
  if (course.slug && course.slug.length > 160) {
    errors.slug = "Slug tối đa 160 ký tự";
  }

  // Level
  if (isEmpty(course.level)) {
    errors.level = "Vui lòng chọn level";
  }

  // Category
  if (!course.categoryId && !course.category) {
    errors.categoryId = "Vui lòng chọn danh mục cho khóa học";
  }

  // Mô tả ngắn
  if (course.description && course.description.length > 250) {
    errors.description = "Mô tả ngắn tối đa 250 ký tự";
  }

  // Nội dung chi tiết
 if (isEmpty(course.content)) {
  errors.content = "Vui lòng nhập nội dung khóa học";
} else {
  const wordCount = countWords(course.content);

  if (wordCount > 2000) {
    errors.content = `Nội dung không được vượt quá 2000 từ (hiện tại: ${wordCount} từ)`;
  }
}

  // Thời lượng
  if (isEmpty(course.duration)) {
    errors.duration = "Vui lòng nhập thời lượng khóa học";
  }

  // Ngày bắt đầu / kết thúc (tùy yêu cầu)
  // nếu bạn muốn bắt buộc:
  // if (isEmpty(course.startDate)) errors.startDate = "Vui lòng chọn ngày bắt đầu";

  // SEO
  if (course.metaTitle && course.metaTitle.length > 60) {
    errors.metaTitle = "Meta title nên dưới 60 ký tự";
  }
  if (course.metaDescription && course.metaDescription.length > 160) {
    errors.metaDescription = "Meta description nên dưới 160 ký tự";
  }

  return errors;
}

// Helper: check có lỗi hay không
export function isCourseValid(errors: CourseValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
