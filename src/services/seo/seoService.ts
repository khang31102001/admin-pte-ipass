import { post } from "@/api/http";
import { SeoAnalysisResponse } from "@/types/seo";
import { Course } from "@/types/courses";

class SeoService {
  async analyzeCourse(course: Course): Promise<SeoAnalysisResponse> {
    // Chuẩn hoá payload gửi lên (chỉ gửi field cần thiết)
    const payload = {
      title: course.title,
      slug: course.slug,
      metaTitle: course.metaTitle,
      metaDescription: course.metaDescription,
      description: course.description,
      contentHtml: course.content,
      keywords: course.keywords,
      schemaEnabled: course.schemaEnabled,
      schemaData: course.schemaData,
    };

    const res = await post("/gemini/seo-evaluation", payload);
    // giả sử backend trả đúng structure bạn gửi
    return res as SeoAnalysisResponse ;
  }
}

export const seoService = new SeoService();
