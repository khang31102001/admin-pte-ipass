import api from "@/api/axiosClient";
import { CourseItemsRes } from "./../../types/courses";
import { get, post, put, httpDeleteWithBody } from "@/api/http";

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
    if (data instanceof FormData) {
      const response = await api.post("/courses", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await post("/courses", data);
    return response;
  }

  async updateCourse(id: number, data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.put(`/courses/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await put(`/courses/${id}`, data);
    return response;
  }

  async deleteCourse(ids: any[]): Promise<any> {
    const response = await httpDeleteWithBody('/courses', {ids: ids});
    return response;
  }
}

export const courseService = new CourseService();
