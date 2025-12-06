import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { aboutService } from "@/services/about/aboutService";
import { About } from "@/types/about";

export function useAboutInfoQuery(params?: any) {
  return useQuery<About, Error>({
    queryKey: ["about-info"],
    queryFn: () => aboutService.getAboutInfo(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  });
}