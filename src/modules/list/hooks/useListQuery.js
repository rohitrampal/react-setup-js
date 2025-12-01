import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useApiMutation } from '@/hooks/useMutation'
import { apiClient } from '@/services/api/client'

const LIST_KEYS = {
  all: ['list'],
  items: () => [...LIST_KEYS.all, 'items'],
  item: id => [...LIST_KEYS.items(), id],
  search: term => [...LIST_KEYS.items(), 'search', term],
}

export const useListItems = searchTerm => {
  return useQuery({
    queryKey: searchTerm ? LIST_KEYS.search(searchTerm) : LIST_KEYS.items(),
    queryFn: async () => {
      const response = await apiClient.get('/list/items', {
        params: searchTerm ? { search: searchTerm } : undefined,
        skipCache: false,
        ttl: 60000,
      })
      return response.data
    },
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  })
}

export const useCreateListItem = () => {
  const queryClient = useQueryClient()

  return useApiMutation({
    endpoint: '/list/items',
    method: 'POST',
    invalidateQueries: ['list'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_KEYS.items() })
    },
    optimisticUpdate: {
      queryKey: Array.from(LIST_KEYS.items()),
      updateFn: variables => oldData => {
        const old = oldData
        const newItem = {
          id: `temp-${Date.now()}`,
          name: variables.name,
          email: variables.email,
          role: variables.role,
          status: 'Active',
        }
        return old ? [...old, newItem] : [newItem]
      },
    },
  })
}

export const useUpdateListItem = () => {
  const queryClient = useQueryClient()

  return useApiMutation({
    endpoint: '/list/items',
    method: 'PUT',
    invalidateQueries: ['list'],
    onSuccess: (data, variables) => {
      queryClient.setQueryData(LIST_KEYS.item(variables.id), data.data)
      queryClient.invalidateQueries({ queryKey: LIST_KEYS.items() })
    },
    optimisticUpdate: {
      queryKey: Array.from(LIST_KEYS.items()),
      updateFn: variables => oldData => {
        const old = oldData
        if (!old) return old
        return old.map(item => (item.id === variables.id ? { ...item, ...variables } : item))
      },
    },
  })
}

export const useDeleteListItem = () => {
  const queryClient = useQueryClient()

  return useApiMutation({
    endpoint: '/list/items',
    method: 'DELETE',
    invalidateQueries: ['list'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LIST_KEYS.items() })
    },
    optimisticUpdate: {
      queryKey: Array.from(LIST_KEYS.items()),
      updateFn: variables => oldData => {
        const old = oldData
        if (!old) return old
        return old.filter(item => item.id !== variables.id)
      },
    },
  })
}
