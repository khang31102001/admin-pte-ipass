import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { courseService } from "@/services/course/courseService";
import { CourseItemsRes } from "@/types/courses";


export interface CoursesQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
}
export function useCoursesQuery(params?: CoursesQueryParams) {
  return useQuery<CourseItemsRes, Error>({
    queryKey: ["courses", params],
    queryFn: () => courseService.getAllCourses(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}

export function useDetailCoursesQuery(slug?: string) {
  return useQuery<any, Error>({
    enabled: !!slug,
    queryKey: ["courses", slug],
    queryFn: () => {
      if (!slug) {
        console.warn(" missing slug ???");
      };
      return courseService.getCourseDetail({ slug: slug });
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}

