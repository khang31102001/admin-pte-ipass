export interface Author {
  authorname?: string;
  avatar?: string;
}

export interface User{
  userId: number;
  username?: string;
  password?: string;
  email?: string;
  fullName?: string;
  avatar?: string;
}

export interface UserItemsRes {
  items: User[];
  page: number | null;
  pageSize: number | null;
  total: number | null;
  totalPages: number | null;
}
