import { countWords, isEmpty } from "@/lib/helper";
import { News } from "@/types/news";


export type NewsValidationErrors = Partial<Record<keyof News, string>>;

export function validateNews(news: News): NewsValidationErrors {
  const errors: NewsValidationErrors = {};

  if (isEmpty(news.image)) {
    errors.image = "Vui lòng chọn ảnh đại diện cho bài viết";
  }
  // Tiêu đề bài viết
  if (isEmpty(news.title)) {
    errors.title = "Vui lòng nhập tiêu đề bài viết";
  } else if (String(news.title).length > 150) {
    errors.title = "Tiêu đề tối đa 150 ký tự";
  }

  // Slug (nếu auto-gen thì chỉ check length)
  if (news.slug && news.slug.length > 160) {
    errors.slug = "Slug tối đa 160 ký tự";
  }

  // Category
  // if (!news.categoryId && !news.category) {
  //   errors.categoryId = "Vui lòng chọn danh mục cho bài viết";
  // }

  // Mô tả ngắn
  if (news.description && news.description.length > 250) {
    errors.description = "Mô tả ngắn tối đa 250 ký tự";
  }

  // Nội dung chi tiết
  if (isEmpty(news.content)) {
    errors.content = "Vui lòng nhập nội dung bài viết";
  } else if (typeof news.content === "string") {
    const wordCount = countWords(news.content);
    if (wordCount > 3000) {
      errors.content = `Nội dung không được vượt quá 3000 từ (hiện tại: ${wordCount} từ)`;
    }
  }

  // Status (nếu bạn có quy ước trạng thái)
  const allowedStatus = ["draft", "published", "scheduled"];
  if (news.status && !allowedStatus.includes(news.status)) {
    errors.status = "Trạng thái bài viết không hợp lệ";
  }

  // Ngày bắt đầu / kết thúc (nếu dùng để schedule hiển thị)
  if (news.startDate && news.endDate) {
    const start = new Date(news.startDate);
    const end = new Date(news.endDate);
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end < start) {
      errors.endDate = "Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu";
    }
  }

  // SEO
  if (news.metaTitle && news.metaTitle.length > 60) {
    errors.metaTitle = "Meta title nên dưới 60 ký tự";
  }
  if (news.metaDescription && news.metaDescription.length > 160) {
    errors.metaDescription = "Meta description nên dưới 160 ký tự";
  }

  // Tags / Keywords (optional rule)
  if (news.tags && news.tags.length > 20) {
    errors.tags = "Tags không nên vượt quá 20 thẻ";
  }
  if (news.keywords && news.keywords.length > 20) {
    errors.keywords = "Keywords không nên vượt quá 20 từ khóa";
  }

  return errors;
}


export function isNewsValid(errors: NewsValidationErrors): boolean {
  return Object.keys(errors).length === 0;
}
