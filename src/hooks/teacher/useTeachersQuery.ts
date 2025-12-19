import { teachersService } from "@/services/teacher/teacherService";
import { ITeacher } from "@/types/teacher";
import { useQuery, keepPreviousData } from "@tanstack/react-query";


export interface TeacherItemsRes {
  items: ITeacher[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface TeacherQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}

/**
 * teacherKeys
 * Quy ước quản lý cache cho module Teachers (React Query)
 *
 * Cấu trúc cache:
 * teachers
 * ├─ list
 * │   └─ params (page, pageSize, search, sort...)
 * └─ details
 *     └─ teacherId
 */
export const teacherKeys = {
  /**
   * ROOT KEY
   * Thao tác toàn bộ cache teachers
   */
  all: ["teachers"] as const,

  /**
   * LIST ROOT KEY
   * Invalidate toàn bộ danh sách teachers
   */
  lists: () => ["teachers", "list"] as const,

  /**
   * LIST WITH PARAMS
   * Cache theo params
   */
  list: (params?: TeacherQueryParams) =>
    ["teachers", "list", params ?? {}] as const,

  /**
   * DETAILS ROOT KEY
   * Invalidate toàn bộ detail teachers
   */
  details: () => ["teachers", "details"] as const,

  /**
   * DETAIL BY ID
   */
  detail: (slug: string) =>
    ["teachers", "details", slug] as const,
};

export function useTeachersQuery(params?: TeacherQueryParams) {
  return useQuery<TeacherItemsRes, Error>({
    queryKey: teacherKeys.list(params),
    queryFn: () => teachersService.getAllTeachers(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30, 
  });
}

export function useTeacherDetailQuery(slug?: string) {
  return useQuery<any, Error>({
    enabled: !!slug,
    queryKey: slug ? teacherKeys.detail(slug) : [],
    queryFn: () => {
      if (!slug) {
        console.warn("Missing slug!");
        throw new Error("Missing slug");
      }
      return teachersService.getTeacherDetail({slug:slug });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}
