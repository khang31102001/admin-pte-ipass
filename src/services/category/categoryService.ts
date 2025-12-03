import { get } from "@/api/http";
import { CategoryItem } from "@/types/category";

export interface CateQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  category_id?: number;
  category_type? : string;
}
export class CategoryService {
    async getCateByType(params: CateQueryParams): Promise<CategoryItem> {
         const qs = params ? '?' + new URLSearchParams(
            Object.entries(params).map(([k, v]) => [k, String(v)])
            ).toString() : '';
        const url = `/categories/category-tree${qs}`;
      const response = await get(url);
      return response as CategoryItem ;
    }
  
}

export const categoryService = new CategoryService();
