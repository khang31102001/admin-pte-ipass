export interface Author {
  authorname?: string;
  avatar?: string;
}

export interface User{
  user_id: number;
  username?: string;
  password?: string;
  email?: string;
  full_name?: string;
  avatar?: string;
}

export interface UserItemsRes {
  items: User[];
  page: number | null;
  pageSize: number | null;
  total: number | null;
  total_pages: number | null;
}
