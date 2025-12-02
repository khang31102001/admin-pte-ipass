import { SEODataInput } from "@/types/seo";
export function evaluateSeo(data: SEODataInput) {
  let score = 0;
  const messages: string[] = [];

  if (data.title) score += 10;
  else messages.push("Thiếu tiêu đề.");

  if (data.metaTitle) score += 15;
  else messages.push("Thiếu Meta Title.");

  if (data.metaDescription) score += 15;
  else messages.push("Thiếu Meta Description.");

  if (data.slug) score += 10;
  else messages.push("Thiếu slug.");

  if (data.contentHtml && data.contentHtml.length > 500) score += 20;
  else messages.push("Nội dung quá ngắn.");

  if (data.keywords?.length) score += 10;
  else messages.push("Thiếu từ khóa.");

  if (data.image) score += 10;
  else messages.push("Thiếu ảnh đại diện.");

  if (score > 100) score = 100;

  const level = score >= 70 ? "good" : score >= 40 ? "ok" : "bad";

  return { score, level, messages };
}
