import api from "@/api/axiosClient";
import { get, post, put,  httpDeleteWithBody } from "@/api/http";

export class TeacherService {
  async getAllTeachers(params: any): Promise<any> {
    const response = await get("/teachers", params);
    return response;
  }
  async getTeachersById(id: number): Promise<any> {
    const response = await get(`/teachers/${id}`);
    return response;
  }

  async getTeacherDetail(params: any): Promise<any> {
    // console.log("audit cal api:", params)
    const response = await get('/teachers/detail', params);
    return response;
  }

  async createTeachers(data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.post("/teachers", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await post("/teachers", data);
    return response;
  }

  async updateTeachers(id: number, data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.put(`/teachers/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await put(`/teachers/${id}`, data);
    return response;
  }

  async deleteTeachers(ids: any[]): Promise<any> {
    const response = await httpDeleteWithBody(`/teachers`,{ids: ids});
    return response;
  }
}

export const teachersService = new TeacherService();
