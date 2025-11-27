# React Query (TanStack Query) Setup

This project uses **@tanstack/react-query** for advanced data fetching, caching, and state management with full integration with Axios.

## Features Implemented

✅ **Caching** - Automatic caching with configurable TTL  
✅ **Background Refetching** - Automatic background updates  
✅ **Stale-while-revalidate** - Show cached data while fetching fresh data  
✅ **Automatic Retry** - Configurable retry logic with exponential backoff  
✅ **Pagination** - Built-in pagination hooks  
✅ **Infinite Scroll** - Infinite query support  
✅ **Auto-refetch on Tab Focus** - Refetch when window regains focus  
✅ **Auto-refetch on Network Reconnect** - Refetch when network comes back  
✅ **Request Deduplication** - Built-in deduplication (works with Axios deduplication)  
✅ **Server Synchronization** - Keep UI in sync with server state  
✅ **Optimistic Updates** - Instant UI updates with rollback on error  

## Configuration

### QueryClient Setup (`src/config/queryClient.ts`)

```typescript
- staleTime: 5 minutes (data considered fresh)
- gcTime: 10 minutes (cache retention)
- refetchOnWindowFocus: true
- refetchOnReconnect: true
- refetchOnMount: true
- retry: 3 attempts with exponential backoff
```

## Custom Hooks

### 1. `useApiQuery` - Basic Query Hook

```tsx
import { useApiQuery } from '@/hooks/useQuery'

const { data, isLoading, error, refetch } = useApiQuery<User>({
  endpoint: '/users/me',
  enabled: true,
  staleTime: 5 * 60 * 1000
})
```

### 2. `useApiMutation` - Mutation Hook with Optimistic Updates

```tsx
import { useApiMutation } from '@/hooks/useMutation'

const mutation = useApiMutation<User, CreateUserData>({
  endpoint: '/users',
  method: 'POST',
  invalidateQueries: ['users'],
  optimisticUpdate: {
    queryKey: ['users'],
    updateFn: (variables) => (oldData) => {
      // Optimistically add new user
      return [...oldData, { id: 'temp', ...variables }]
    }
  }
})

mutation.mutate(newUserData)
```

### 3. `usePagination` - Pagination Hook

```tsx
import { usePagination } from '@/hooks/usePagination'

const {
  data,
  page,
  totalPages,
  nextPage,
  previousPage,
  setPage,
  hasNextPage,
  hasPreviousPage
} = usePagination<ListItem>({
  endpoint: '/list/items',
  pageSize: 10
})
```

### 4. `useInfiniteScroll` - Infinite Query Hook

```tsx
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'

const {
  allItems,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
} = useInfiniteScroll<ListItem>({
  endpoint: '/list/items',
  pageSize: 10
})
```

## Integration with Axios

React Query works seamlessly with the existing Axios client:

- **Caching**: React Query handles caching, Axios handles HTTP
- **Deduplication**: Both layers provide deduplication
- **Error Handling**: React Query handles errors, Axios handles HTTP errors
- **Interceptors**: Axios interceptors still work (auth, CSRF, etc.)

## Example: Optimistic Updates

```tsx
const updateMutation = useApiMutation<ListItem, UpdateListItemData>({
  endpoint: '/list/items',
  method: 'PUT',
  optimisticUpdate: {
    queryKey: ['list', 'items'],
    updateFn: (variables) => (oldData) => {
      // Immediately update UI
      return oldData.map(item =>
        item.id === variables.id ? { ...item, ...variables } : item
      )
    }
  },
  onError: (error, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['list', 'items'], context.previousData)
  }
})
```

## Example: Pagination

```tsx
const PaginatedList = () => {
  const {
    data,
    page,
    totalPages,
    setPage,
    isLoading
  } = usePagination<ListItem>({
    endpoint: '/list/items',
    pageSize: 10
  })

  return (
    <>
      <Table rows={data} />
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
      />
    </>
  )
}
```

## Example: Infinite Scroll

```tsx
const InfiniteList = () => {
  const {
    allItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteScroll<ListItem>({
    endpoint: '/list/items',
    pageSize: 10
  })

  return (
    <>
      <Table rows={allItems} />
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </Button>
      )}
    </>
  )
}
```

## Query Keys

Use consistent query keys for proper cache invalidation:

```typescript
const QUERY_KEYS = {
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,
  userPosts: (userId: string) => ['users', userId, 'posts'] as const
}
```

## DevTools

React Query DevTools are enabled in development mode. Access them via the floating button in the bottom-left corner.

## Best Practices

1. **Use Query Keys Consistently**: Create constants for query keys
2. **Invalidate Related Queries**: When mutating, invalidate related queries
3. **Use Optimistic Updates**: For better UX, update UI immediately
4. **Handle Loading States**: Always show loading indicators
5. **Error Boundaries**: Wrap queries in error boundaries
6. **Stale Time**: Set appropriate stale times based on data freshness needs

## Migration from Old Auth Hook

The `useAuth` hook now uses React Query internally:

```tsx
// Old way (still works, but uses React Query under the hood)
const { user, loading, login, logout } = useAuth()

// New way (direct React Query)
const { data: user, isLoading } = useCurrentUser()
const loginMutation = useLogin()
const logoutMutation = useLogout()
```

## Performance Benefits

- **Reduced API Calls**: Automatic deduplication and caching
- **Better UX**: Instant UI updates with optimistic updates
- **Background Sync**: Keep data fresh without blocking UI
- **Smart Refetching**: Only refetch when necessary
- **Memory Efficient**: Automatic garbage collection of unused queries

