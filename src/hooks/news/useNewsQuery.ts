import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { newsService } from "@/services/news/newsService";
import { NewsItemsRes } from "@/types/news";

export interface NewsQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}

/**
 * newsKeys
 * Quy ước quản lý cache cho module News (React Query)
 *
 * Cấu trúc cache:
 * news
 * ├─ list
 * │   └─ params (page, pageSize, search, sort, status...)
 * └─ details
 *     └─ slug
 */

export const newsKeys = {
  /**
   * ROOT KEY
   * Dùng khi muốn thao tác TOÀN BỘ cache của news
   *
   * Ví dụ:
   * - queryClient.invalidateQueries({ queryKey: newsKeys.all })
   * - queryClient.removeQueries({ queryKey: newsKeys.all })
   *
   * ⚠️ Ít dùng trong thực tế, chỉ dùng khi:
   * - logout
   * - switch account
   */
  all: ["news"] as const,

  /**
   * LIST ROOT KEY
   * Dùng để invalidate / refetch TOÀN BỘ danh sách news
   * (bất kể page, search, filter, sort...)
   *
   * Match:
   * - ["news","list",{page:1}]
   * - ["news","list",{page:2, search:"ai"}]
   *
   * Ví dụ dùng:
   * - CREATE news → invalidate list
   * - UPDATE news → invalidate list
   * - DELETE news → invalidate list
   */
  lists: () => ["news", "list"] as const,

  /**
   * LIST WITH PARAMS
   * Cache cho 1 danh sách news cụ thể theo params
   *
   * Ví dụ:
   * - page = 1, search = "react"
   * - status = "PUBLISHED"
   * - sort = "createdAt"
   *
   * Ví dụ dùng:
   * - useQuery(list(params))
   * - setQueryData để update UI mượt mà cho page hiện tại
   */
  list: (params?: NewsQueryParams) =>
    ["news", "list", params ?? {}] as const,

  /**
   * DETAILS ROOT KEY
   * Dùng để invalidate / remove TOÀN BỘ cache detail của news
   *
   * Match:
   * - ["news","details","react-hooks"]
   * - ["news","details","nextjs-14"]
   *
   * Ví dụ dùng:
   * - logout
   * - clear cache khi đổi role / quyền
   */
  details: () => ["news", "details"] as const,

  /**
   * DETAIL BY SLUG
   * Cache cho CHI TIẾT 1 news cụ thể
   *
   * Ví dụ:
   * - slug = "react-hooks-guide"
   * - slug = "nextjs-14-release"
   *
   * Ví dụ dùng:
   * - useNewsDetailQuery(slug)
   * - setQueryData sau UPDATE
   * - removeQueries sau DELETE
   */
  detail: (slug: string) =>
    ["news", "details", slug] as const,
};




export function useNewsQuery(params?: NewsQueryParams) {
  return useQuery<NewsItemsRes, Error>({
    queryKey: newsKeys.list(params),
    queryFn: () => newsService.getAllNews(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}

export function useNewsDetailQuery(slug: string) {
  return useQuery<any, Error>({
    enabled: !!slug,
    queryKey: newsKeys.detail(slug),
    queryFn: () => {
      if(!slug) {
        console.log(" Missing slug");
      }
      return newsService.getNewsDetail({slug: slug!})
    },
    placeholderData: keepPreviousData,
    staleTime: 1000,

  });
}

