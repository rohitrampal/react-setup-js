import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

export function useApiQuery(options) {
  const { endpoint, enabled = true, staleTime, gcTime, queryKey, ...queryOptions } = options

  return useQuery({
    queryKey: [endpoint, queryKey?.[1]],
    queryFn: async () => {
      return await apiClient.get(endpoint, {
        skipCache: true,
        skipDeduplication: false,
      })
    },
    enabled,
    staleTime,
    gcTime,
    ...queryOptions,
  })
}
