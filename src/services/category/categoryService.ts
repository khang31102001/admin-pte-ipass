import { get } from "@/api/http";

export interface CateQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  category_id?: number;
  category_type? : string;
}
export class CategoryService {
    async getCateByType(params: CateQueryParams): Promise<unknown> {
         const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
            ).toString() : '';
        const url = `/categories/category-tree${qs}`;
      const response = await get(url);
      return response ;
    }
  
}

export const categoryService = new CategoryService();
