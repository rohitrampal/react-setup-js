import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

export function useApiMutation(options) {
  const queryClient = useQueryClient()
  const {
    endpoint,
    method = 'POST',
    invalidateQueries = [],
    optimisticUpdate,
    ...mutationOptions
  } = options

  return useMutation({
    mutationFn: async variables => {
      switch (method) {
        case 'POST':
          return await apiClient.post(endpoint, variables, {
            skipCache: true,
            skipDeduplication: true,
          })
        case 'PUT':
          return await apiClient.put(endpoint, variables, {
            skipCache: true,
            skipDeduplication: true,
          })
        case 'PATCH':
          return await apiClient.patch(endpoint, variables, {
            skipCache: true,
            skipDeduplication: true,
          })
        case 'DELETE':
          return await apiClient.delete(endpoint, {
            skipCache: true,
            skipDeduplication: true,
          })
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    },
    onMutate: optimisticUpdate
      ? async variables => {
          if (optimisticUpdate) {
            await queryClient.cancelQueries({ queryKey: optimisticUpdate.queryKey })
            const previousData = queryClient.getQueryData(optimisticUpdate.queryKey)
            queryClient.setQueryData(
              optimisticUpdate.queryKey,
              optimisticUpdate.updateFn(variables)
            )
            return { previousData }
          }
        }
      : undefined,
    onError: optimisticUpdate
      ? (_error, _variables, context) => {
          if (
            context &&
            typeof context === 'object' &&
            'previousData' in context &&
            context.previousData
          ) {
            queryClient.setQueryData(optimisticUpdate.queryKey, context.previousData)
          }
        }
      : undefined,
    onSettled: () => {
      invalidateQueries.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey: [queryKey] })
      })
    },
    ...mutationOptions,
  })
}
