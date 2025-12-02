import { User } from "./author";
import { CategoryItem } from "./category";

export interface Course {
  course_id?: number | null;
  author_id?: number | null;
  image?: string | null;
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
  category_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_featured?: boolean | null;
  is_disbale?: boolean | null;
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
  course_id?: number | null;
  author_id?: number | null;
  image?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null; 
  content?: string | null;  
  benefits?: string;
  audience?: string[]  ;
  tags?: string[];
  level?: string | null;
  duration?: string | null;
  tuition?: string | null;
  schedule?: string | null;
  author?: User | null;
  category?: CategoryItem | null;
  category_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  is_featured?: boolean | null;
  is_disbale?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;

}


export interface CourseItemsRes {
  items: Course[];
  page?: number | null;
  page_size?: number | null;
  total?: number | null;
  total_pages?: number | null;
  filter?:{
    search?: string;
  }
}


