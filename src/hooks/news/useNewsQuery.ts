import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { newsService } from "@/services/news/newsService";
import { NewsItemsRes } from "@/types/news";

export interface NewsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}

export function useNewsQuery(params?: NewsQueryParams) {
  return useQuery<NewsItemsRes, Error>({
    queryKey: ["news", params],
    queryFn: () => newsService.getAllNews(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}
