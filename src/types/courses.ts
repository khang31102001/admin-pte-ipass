import { User } from "./author";
import { CategoryItem } from "./category";

export interface Course {
  courseId?: number | null;
  authorId?: number | null;
  image?: string | null;
  deleteImageUrl?: string;
  isImageChanged?: boolean;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  content?: string | null;
  benefits?: string
  audience?: string[]
  level?: string | null;
  duration?: string | null;
  tuition?: string | null;
  category?: CategoryItem | null;
  categoryType?: string;
  categoryId?: number | null;
  createdAt?: string | null;
  createdBy?: string | null;
  updatedAt?: string | null;
  updatedBy?: string | null;
  isFeatured?: boolean | null;
  isDisabled?: boolean | null;
  schedule?: string;
  startDate?: string | null;
  endDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
  schemaEnabled: boolean;
  schemaMode: "auto" | "custom";
  schemaData: string;
}


export interface CourseDetail {
  courseId?: number | null;
  authorId?: number | null;
  image?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  content?: string | null;
  benefits?: string;
  audience?: string[];
  tags?: string[];
  level?: string | null;
  duration?: string | null;
  tuition?: string | null;
  schedule?: string | null;
  author?: User | null;
  category?: CategoryItem | null;
  categoryId?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  isFeatured?: boolean | null;
  isDisabled?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
  deleteImageUrl?: string;
  isImageChanged?: boolean;

}


export interface CourseItemsRes {
  items: Course[];
  page?: number | null;
  pageSize?: number | null;
  total?: number | null;
  totalPages?: number | null;

}


