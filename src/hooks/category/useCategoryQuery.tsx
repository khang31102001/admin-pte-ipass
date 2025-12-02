import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { categoryService } from "@/services/category/categoryService";


export interface CategoryQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}
export function useCategoryQuery(params?: CategoryQueryParams) {
  return useQuery<unknown, Error>({
    queryKey: ["categories", params],
    queryFn: () => categoryService.getCateByType(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}
