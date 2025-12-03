import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { categoryService } from "@/services/category/categoryService";
import { CategoryItem } from "@/types/category";


export interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  categoryType?: string;
}
export function useCategoryQuery(params?: CategoryQueryParams) {
  return useQuery<CategoryItem, Error>({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getCateByType(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}
