import { About } from "@/types/about";
import { get, post, put, httpDelete } from "@/api/http";

export class AboutService {
  async getAboutInfo(params?: any): Promise<About> {
    const response = await get("/abouts/detail", params);
    return response as About;
  }

  async getAboutById(id: number): Promise<About> {
    const response = await get(`/abouts/${id}`);
    return response as About;
  }

  async createAbout(data: Partial<About>): Promise<About> {
    const response = await post("/abouts", data);
    return response as About;
  }

  async updateAbout(id: number, data: Partial<About>): Promise<About> {
    const response = await put(`/abouts/${id}`, data);
    return response as About;
  }

  async deleteAbout(id: number): Promise<void> {
    await httpDelete(`/abouts/${id}`);
  }
}

export const aboutService = new AboutService();
