import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { courseService } from "@/services/course/courseService";
import { CourseItemsRes } from "@/types/courses";

export interface CoursesQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}


/**
 * courseKeys
 * Quy ước quản lý cache cho module Courses (React Query)
 *
 * Cấu trúc cache:
 * courses
 * ├─ list
 * │   └─ params (page, pageSize, search, sort...)
 * └─ details
 *     └─ slug
 */

export const courseKeys = {
  /**
   * ROOT KEY
   * Dùng khi muốn thao tác TOÀN BỘ cache của courses
   *
   * Ví dụ:
   * - queryClient.invalidateQueries({ queryKey: courseKeys.all })
   * - queryClient.removeQueries({ queryKey: courseKeys.all })
   *
   * ⚠️ Ít dùng trong thực tế, chỉ dùng khi:
   * - logout
   * - switch account
   */
  all: ["courses"] as const,

  /**
   * LIST ROOT KEY
   * Dùng để invalidate / refetch TOÀN BỘ danh sách courses
   * (bất kể page, search, sort...)
   *
   * Match:
   * - ["courses","list",{page:1}]
   * - ["courses","list",{page:2, search:"react"}]
   *
   * Ví dụ dùng:
   * - CREATE course → invalidate list
   * - UPDATE course → invalidate list
   * - DELETE course → invalidate list
   */
  lists: () => ["courses", "list"] as const,

  /**
   * LIST WITH PARAMS
   * Cache cho 1 danh sách courses cụ thể theo params
   *
   * Ví dụ:
   * - page = 1, search = "react"
   * - page = 2, sort = "createdAt"
   *
   * Ví dụ dùng:
   * - useQuery(list(params))
   * - setQueryData để update UI mượt mà cho page hiện tại
   */
  list: (params?: CoursesQueryParams) =>
    ["courses", "list", params ?? {}] as const,

  /**
   * DETAILS ROOT KEY
   * Dùng để invalidate / remove TOÀN BỘ cache detail của courses
   *
   * Match:
   * - ["courses","details","react-basic"]
   * - ["courses","details","nodejs"]
   *
   * Ví dụ dùng:
   * - logout
   * - clear cache khi đổi role / quyền
   */
  details: () => ["courses", "details"] as const,

  /**
   * DETAIL BY SLUG
   * Cache cho CHI TIẾT 1 course cụ thể
   *
   * Ví dụ:
   * - slug = "react-basic"
   * - slug = "nextjs-master"
   *
   * Ví dụ dùng:
   * - useDetailCoursesQuery(slug)
   * - setQueryData sau UPDATE
   * - removeQueries sau DELETE
   */
  detail: (slug: string) =>
    ["courses", "details", slug] as const,
};



export function useCoursesQuery(params?: CoursesQueryParams) {
  return useQuery<CourseItemsRes, Error>({
    queryKey: courseKeys.list(params),
    queryFn: () => courseService.getAllCourses(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}

export function useDetailCoursesQuery(slug?: string) {
  return useQuery<any, Error>({
    enabled: !!slug,
    queryKey: courseKeys.detail(slug),
    queryFn: () => {
      if (!slug) {
        console.warn(" missing slug!");
      };
      return courseService.getCourseDetail({ slug: slug });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}

