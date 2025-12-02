import { CourseItemsRes } from "./../../types/courses";
import { get, post, put, httpDelete } from "@/api/http";

export class CourseService {
  async getAllCourses(params: any): Promise<CourseItemsRes> {
    const response = await get("/courses", params);
    return response as CourseItemsRes;
  }
  async getCourseById(id: number): Promise<any> {
    const response = await get(`/courses/${id}`);
    return response;
  }

  async getCourseDetail(params: any): Promise<any> {
    const response = await get('/courses/detail', params);
    return response;
  }

  async createCourse(data: any): Promise<any> {
    const response = await post("/courses", data);
    return response;
  }

  async updateCourse(id: number, data: any): Promise<any> {
    const response = await put(`/courses/${id}`, data);
    return response;
  }

  async deleteCourse(id: number): Promise<any> {
    const response = await httpDelete(`/courses/${id}`);
    return response;
  }
}

export const courseService = new CourseService();
