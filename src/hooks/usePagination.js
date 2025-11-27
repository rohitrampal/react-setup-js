import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { apiClient } from '@/services/api/client'

export function usePagination(options) {
  const { endpoint, pageSize = 10, enabled = true, staleTime } = options
  const [page, setPage] = useState(1)

  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [endpoint, 'pagination', page, pageSize],
    queryFn: async () => {
      return await apiClient.get(endpoint, {
        params: { page, pageSize },
        skipCache: false,
        ttl: 30000,
      })
    },
    enabled,
    staleTime: staleTime || 30000,
    placeholderData: previousData => previousData,
  })

  const paginatedData = response?.data
  const totalPages = paginatedData?.totalPages || 0
  const total = paginatedData?.total || 0

  const nextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1)
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1)
    }
  }

  return {
    data: paginatedData?.data,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    isError,
    error: error || null,
    refetch,
    setPage,
    nextPage,
    previousPage,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }
}

