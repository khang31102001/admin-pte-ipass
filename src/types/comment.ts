export interface Comment {
  id: string;
  courseId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  rating?: number; // 1-5 stars
  createdAt: string;
  updatedAt?: string;
  likes: number;
  replies?: Comment[];
  parentId?: string;
}

export interface CommentsItemsRes {
  items: Comment[];
  page: number | null;
  page_size: number | null;
  total: number | null;
  total_pages: number | null;
}


export interface CommentFormData {
  content: string;
  rating?: number;
}
