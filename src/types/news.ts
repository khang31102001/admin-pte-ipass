import { CategoryItem } from "./category";
export enum NewsStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  SCHEDULED = "SCHEDULED",
}
export interface News {
    newsId: number,
    author?: number;
    image?: string | null
    title?: string | null,
    slug?: string,
    description?: string | null; // Tóm tắt ngắn
    content?: string | null; // Nội dung chi tiết render bằng html
    categoryId?: number | null,
    category?: CategoryItem;
    createdAt?: string;
    updatedAt?: string;

    status?: NewsStatus;
    isFeatured?: boolean;
    startDate?: string; 
    endDate?: string;   
    metaTitle?: string;
    metaDescription?: string;
    tags?: string[];
    keywords?: string[];
    noindex?: boolean; 
    canonical?: string | null;
    deleteImageUrl?: string;
    isImageChanged? : boolean;
}

export interface NewsFormValues {
  title: string;
  slug: string;
  description: string; // summary ngắn
  content: string; // HTML full

  categoryId: number | null;

  imageFile?: File | null;        // file upload (local)
  imagePreview?: string | null;   // base64 dùng để hiển thị preview

  status: NewsStatus; // "draft" | "published" | "scheduled"
  isFeatured: boolean;

  startDate?: string | null; // scheduling
  endDate?: string | null;

  metaTitle?: string;
  metaDescription?: string;
  tags: string[];
  keywords: string[];
  noindex: boolean;
  canonical?: string | null;

  // flags hỗ trợ backend update
  isImageChanged: boolean; // true nếu user thay ảnh

  // Delete old image (chỉ dùng khi update nhưng tạo luôn ở form để đồng bộ)
  deleteImageUrl?: string | null;
}


export interface NewsItemsRes {
  items: News[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface IUpdateNewsRq {
  newsId?: number; 
  title?: string;
  slug?: string;
  description?: string;
  content?: string;
  image?: File | string | null;
  categoryId?: number | null;
  status?: NewsStatus;
  isFeatured?: boolean;
  startDate?: string | null;
  endDate?: string | null;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  tags?: string[];
  noindex?: boolean;
  canonical?: string | null;
  imgFile?: File | null;
  deleteImageUrl?: string;
  isImageChanged? : boolean;
}



