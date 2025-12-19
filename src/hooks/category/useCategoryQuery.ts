import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { categoryService } from "@/services/category/categoryService";



export interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  slug?: string;
  categoryType?: string;
  level?: number;
}
/**
 * categoryKeys
 * Quy ước quản lý cache cho module Categories (React Query)
 *
 * Cấu trúc cache:
 * categories
 * ├─ tree
 * │   └─ params (categoryType, status, ...)
 * ├─ list
 * │   └─ params (page, pageSize, search, ...)
 * └─ details
 *     └─ id | slug
 */

export const categoryKeys = {
  /**
   * ROOT KEY
   * Dùng khi muốn thao tác TOÀN BỘ cache categories
   *
   * Ví dụ:
   * - logout
   * - switch account
   */
  all: ["categories"] as const,

  /**
   * TREE ROOT KEY
   * Dùng để invalidate / refetch TOÀN BỘ cây category
   *
   * Match:
   * - ["categories","tree",{categoryType:"NEWS"}]
   * - ["categories","tree",{categoryType:"HEADER"}]
   */
  trees: () => ["categories", "tree"] as const,

  /**
   * TREE WITH PARAMS
   * Cache cho 1 cây category cụ thể
   *
   * Ví dụ dùng:
   * - useCategoryTreeQuery({ categoryType: "NEWS" })
   * - invalidate sau CREATE / UPDATE / DELETE category
   */
  tree: (params?: CategoryQueryParams) =>
    ["categories", "tree", params ?? {}] as const,

  /**
   * LIST ROOT KEY
   * Dùng để invalidate / refetch TOÀN BỘ danh sách categories
   * (bất kể page, search...)
   */
  lists: () => ["categories", "list"] as const,

  /**
   * LIST WITH PARAMS
   * Cache cho 1 danh sách category theo params
   */
  list: (params?: CategoryQueryParams) =>
    ["categories", "list", params ?? {}] as const,

  /**
   * DETAILS ROOT KEY
   * Dùng để invalidate / remove TOÀN BỘ cache detail category
   */
  details: () => ["categories", "details"] as const,

  /**
   * DETAIL BY ID (hoặc slug nếu backend dùng slug)
   *
   * Ví dụ:
   * - id = 12
   * - slug = "frontend"
   */
  detail: (idOrSlug: number | string) =>
    ["categories", "details", idOrSlug] as const,
};

export function useCategoryTreeQuery(params?: CategoryQueryParams) {
  return useQuery<any, Error>({
    queryKey: categoryKeys.tree(params),
    queryFn: () => categoryService.getCategoryTree(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useCategoryListQuery(params?: CategoryQueryParams) {
  return useQuery<any, Error>({
    queryKey: categoryKeys.list(params),
    queryFn: () => categoryService.getCategoryList(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useCategoryAllQuery() {
  return useQuery<any, Error>({
    queryKey: categoryKeys.all,
    queryFn: () => categoryService.getCategoryList({}),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}

export function useCategoryDetailQuery(params?: CategoryQueryParams) {
  return useQuery<any, Error>({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getCategoryList(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}