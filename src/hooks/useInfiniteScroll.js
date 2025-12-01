import { useInfiniteQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

export function useInfiniteScroll(options) {
  const {
    endpoint,
    pageSize = 10,
    enabled = true,
    getNextPageParam = lastPage => {
      const data = lastPage.data
      return data?.hasMore ? data.nextPage : undefined
    },
  } = options

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: [endpoint, 'infinite', pageSize],
    queryFn: async ({ pageParam = 1 }) => {
      return await apiClient.get(endpoint, {
        params: { page: pageParam, pageSize },
        skipCache: false,
        ttl: 30000,
      })
    },
    getNextPageParam,
    enabled,
    staleTime: 30000,
    initialPageParam: 1,
  })

  const allItems = data?.pages.flatMap(page => page.data?.data || []) || []

  return {
    data,
    fetchNextPage,
    hasNextPage: hasNextPage || false,
    isFetchingNextPage,
    isLoading,
    isError,
    error: error || null,
    refetch,
    allItems,
  }
}
