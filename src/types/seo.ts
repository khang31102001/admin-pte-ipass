export interface SEODataInput {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  contentHtml?: string | null;
  image?: string | null;

  // meta fields
  metaTitle?: string | null;
  metaDescription?: string | null;
  keywords?: string[] | null;
}

export type SeoAnalysisResult = {
  score: number;
  issues: string[];
  suggestions: string[];
  overallComment: string;
};

export type SeoAnalysisResponse = {
  success: boolean;
  data: SeoAnalysisResult;
};
