import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions:{
     queries: {
      staleTime: 30_000,        // 30s: dữ liệu coi như “còn tươi”
      gcTime: 5 * 60_000,       // 5 phút: giữ trong cache trước khi garbage-collect
      refetchOnWindowFocus: false,
      retry: 1,
    },
    mutations: { retry: 0 },
  }
});

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
