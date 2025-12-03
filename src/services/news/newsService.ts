import { NewsItemsRes } from "../../types/news";
import { get, post, put, httpDelete } from "@/api/http";

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
    const response = await get('/news/detail', params);
    return response;
  }

  async createNews(data: any): Promise<any> {
    const response = await post("/news", data);
    return response;
  }

  async updateNews(id: number, data: any): Promise<any> {
    const response = await put(`/news/${id}`, data);
    return response;
  }

  async deleteNews(id: number): Promise<any> {
    const response = await httpDelete(`/news/${id}`);
    return response;
  }
}

export const newsService = new NewsService();
