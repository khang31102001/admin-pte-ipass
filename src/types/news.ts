import { CategoryItem } from "./category";

export interface News {
    newsId: number,
    authorId?: number;
    image?: string | null
    title?: string | null,
    slug?: string,
    description?: string | null; // Tóm tắt ngắn
    content?: string | null; // Nội dung chi tiết render bằng html
    categoryId?: number | null,
    category?: CategoryItem;
    createdAt?: string;
    updatedAt?: string;
    authorName?: string | null;
    authorAvatar?: string | null;
    status?: string;
    isFeatured?: boolean;
    startDate?: string; 
    endDate?: string;   
    metaTitle?: string;
    metaDescription?: string;
    tags?: string[];
    keywords?: string[];
}

export interface NewsItemsRes {
  items: News[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}


