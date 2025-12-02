import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { userService } from "@/services/course/courseService";
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
    queryFn: () => userService.getAllCourses(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}
