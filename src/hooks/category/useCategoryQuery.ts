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
const categoryKeys = {
  all: ["categories"] as const,
  tree: (params?: CategoryQueryParams) => ["categories", "tree", params] as const,
  list: (params?: CategoryQueryParams) => ["categories", "list", params] as const,
  detail: (params?: CategoryQueryParams) => ["categories", "detail", params] as const,
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
    queryKey: ["category", "detail", params],
    queryFn: () => categoryService.getCategoryList(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}