import { CategoryItem } from "./category";

export interface Course {
  course_id?: number | null;
  author_id?: number | null;
  image?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null; // Tóm tắt ngắn
  content?: string | null;     // Nội dung chi tiết
  level?: string | null;
  duration?: string | null;
  schedule?: string | null;
  tuition?: string | null;
  category?: CategoryItem | null;
  created_at?: string | null;
  updated_at?: string | null;
  isFeatured?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
  schemaEnabled: boolean;
  schemaMode: "auto" | "custom";
  schemaData: string;
}

export interface CourseListResponse {
  items: Course[];
  page: number | null;
  page_size: number | null;
  total: number | null;
  total_pages: number | null;
}


export type TabValue = "basic" | "content" | "time-tuition" | "seo";
export type TabItem = {
  label: string;
  value: TabValue;
  content: React.ComponentType<CourseTabProps>;
};
export interface CourseTabProps {
  courseData: Course;
  updateCourseData: (updates: Partial<Course>) => void;
}
