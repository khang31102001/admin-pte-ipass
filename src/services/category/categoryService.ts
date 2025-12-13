import api from "@/api/axiosClient";
import { get, httpDelete, post, put } from "@/api/http";


export interface CateQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  slug?: string;
  categoryId?: number;
  categoryType? : string;
}
export class CategoryService {
    async getCategoryTree(params: CateQueryParams): Promise<any> {
         const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
            ).toString() : '';
        const url = `/categories/category-tree${qs}`;
      const response = await get(url);
      return response  ;
    }
     async getCategoryList(params: CateQueryParams): Promise<any> {
         const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
            ).toString() : '';
        const url = `/categories/${qs}`;
      const response = await get(url);
      return response ;
    }

   async createCategory(data: any): Promise<any> {
    if (data instanceof FormData) {
        const response = await api.post("/categories", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
      }
      const response = await post("/categories", data);
      return response;
  }

     async updateCategory(data: any, id: number): Promise<any> {
      if (data instanceof FormData) {
          const response = await api.put(`/categories/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          return response.data;
        }
        const response = await put(`/categories/${id}`, data);
      return response;
  }

   async deleteCategory(id: number): Promise<any> {
      const response = await httpDelete(`/categories/${id}`);
      return response;
    }
    
}

export const categoryService = new CategoryService();
