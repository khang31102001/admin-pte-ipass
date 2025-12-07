import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { newsService } from "@/services/news/newsService";
import { News } from "@/types/news";



export function useNewsDetailQuery(slug: string) {
  return useQuery<News, Error>({
    enabled: !!slug,
    queryKey: ["news", "detail"],
    queryFn: () => {
      if(!slug) {
        console.log(" Missing slug");
      }

      // console.log("audit slug client query:", slug)
      return newsService.getNewsDetail({slug: slug})
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,

  });
}
