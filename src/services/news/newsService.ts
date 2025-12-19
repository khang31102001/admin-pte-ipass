import api from "@/api/axiosClient";
import { NewsItemsRes } from "../../types/news";
import { get, post, put, httpDeleteWithBody } from "@/api/http";

export class NewsService {
  async getAllNews(params: any): Promise<NewsItemsRes> {
    const response = await get("/news", params);
    return response as NewsItemsRes;
  }
  async getNewsById(id: number): Promise<any> {
    const response = await get(`/news/${id}`);
    return response;
  }

  async getNewsDetail(params: any): Promise<any> {
    // console.log("audit cal api:", params)
    const response = await get('/news/detail', params);
    return response;
  }

  async createNews(data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.post("/news", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await post("/news", data);
    return response;
  }

  async updateNews(id: number, data: any): Promise<any> {
    if (data instanceof FormData) {
      const response = await api.put(`/news/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    }
    const response = await put(`/news/${id}`, data);
    return response;
  }

  async deleteNews(ids: any[]): Promise<any> {
    const response = await httpDeleteWithBody('/news', {ids: ids});
    return response;
  }

}

export const newsService = new NewsService();
