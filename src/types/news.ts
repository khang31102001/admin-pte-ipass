
export interface News {
    id: number,
    authorId?: number;
    image?: string | null
    title?: string | null,
    slug?: string,
    description?: string | null; // Tóm tắt ngắn
    content?: string | null; // Nội dung chi tiết render bằng html
    categoryId?: number | null,
    category?: string | null;
    createdAt?: string;
    updatedAt?: string;
    authorName?: string | null;
    authorAvatar?: string | null;
    status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
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


