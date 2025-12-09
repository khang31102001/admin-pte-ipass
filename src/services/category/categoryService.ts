import { get } from "@/api/http";


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
  
}

export const categoryService = new CategoryService();
