# Developer Guide - Complete Project Flow

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Flow](#architecture-flow)
3. [File Structure](#file-structure)
4. [Request/API Flow](#requestapi-flow)
5. [Page/Routing Flow](#pagerouting-flow)
6. [Component Flow](#component-flow)
7. [Data Flow (React Query)](#data-flow-react-query)
8. [State Management](#state-management)
9. [Authentication Flow](#authentication-flow)
10. [Error Handling Flow](#error-handling-flow)
11. [Lazy Loading Flow](#lazy-loading-flow)
12. [Module Structure](#module-structure)
13. [Adding New Features](#adding-new-features)
14. [Common Patterns](#common-patterns)

---

## 🎯 Project Overview

This is an **enterprise-grade React application** built for a **Hotel/Dhaba QR Ordering System** with:

- **Tech Stack**: Vite + React + TypeScript
- **Styling**: MUI + TailwindCSS
- **State Management**: React Query (TanStack Query)
- **API Client**: Axios with interceptors
- **i18n**: react-i18next (English, Hindi, Punjabi)
- **Architecture**: Modular, feature-based

---

## 🏗️ Architecture Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interaction                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      App.tsx (Root)                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  ErrorBoundary (Global Error Handler)                │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │  QueryClientProvider (React Query)              │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │  ThemeWrapper (MUI Theme)                │  │  │  │
│  │  │  │  ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │  │  BrowserRouter (React Router)      │  │  │  │  │
│  │  │  │  │  ┌──────────────────────────────┐  │  │  │  │  │
│  │  │  │  │  │  Layout (Header + Nav)       │  │  │  │  │  │
│  │  │  │  │  │  ┌────────────────────────┐  │  │  │  │  │  │
│  │  │  │  │  │  │  Routes                │  │  │  │  │  │  │
│  │  │  │  │  │  │  └─ Pages (Lazy)       │  │  │  │  │  │  │
│  │  │  │  │  │  └────────────────────────┘  │  │  │  │  │  │
│  │  │  │  │  └──────────────────────────────┘  │  │  │  │  │
│  │  │  │  └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

### **Root Level**
```
react/
├── src/                    # Source code
├── public/                 # Static assets
├── package.json           # Dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # TailwindCSS config
└── .env.development       # Environment variables
```

### **Source Structure (`src/`)**
```
src/
├── components/            # Reusable UI components
│   ├── ui/               # Base components (Button, Input, etc.)
│   ├── layout/           # Layout components (Header, Navigation)
│   ├── routes/           # Route components (ProtectedRoute)
│   ├── errors/           # Error boundaries & fallbacks
│   └── lazy/             # Lazy loading components
│
├── modules/               # Feature modules (MODULAR ARCHITECTURE)
│   ├── auth/             # Authentication module
│   ├── login/            # Login page module
│   ├── dashboard/        # Dashboard module
│   ├── profile/          # Profile module
│   ├── list/             # List module
│   └── roles/            # Role-based access control
│
├── services/             # API services
│   └── api/              # API client & utilities
│       ├── client.ts     # Axios wrapper
│       ├── deduplication.ts
│       ├── rateLimiter.ts
│       └── types.ts
│
├── hooks/                # Custom React hooks
│   ├── useTheme.ts       # Theme management
│   ├── useQuery.ts       # React Query wrapper
│   ├── useMutation.ts    # Mutation wrapper
│   ├── usePagination.ts  # Pagination hook
│   ├── useInfiniteScroll.ts
│   ├── useLazyLoad.ts    # Lazy loading hook
│   └── useSafeState.ts   # Safe state management
│
├── config/               # Configuration files
│   ├── env.ts            # Environment variables
│   ├── theme.ts          # MUI theme config
│   ├── breakpoints.ts    # Responsive breakpoints
│   └── queryClient.ts    # React Query config
│
├── utils/                # Utility functions
│   ├── security.ts       # Security utilities
│   ├── cache.ts          # Cache manager
│   ├── classNames.ts     # CSS class utilities
│   ├── errorHandler.ts   # Error logging
│   └── lazyLoad.ts       # Lazy loading utilities
│
├── locales/              # i18n translation files
│   ├── en.json           # English
│   ├── hi.json           # Hindi
│   └── pa.json           # Punjabi
│
├── styles/               # Global styles
│   └── globals.css       # TailwindCSS + global styles
│
├── App.tsx               # Root component
├── main.tsx              # Entry point
├── i18n.ts              # i18n configuration
└── vite-env.d.ts        # Vite type definitions
```

---

## 🔄 Request/API Flow

### **Complete API Request Journey**

```
┌─────────────────────────────────────────────────────────────┐
│                    Component/Page                           │
│  const { data } = useApiQuery({ endpoint: '/api/users' })  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              useApiQuery Hook (hooks/useQuery.ts)           │
│  - Creates React Query query                               │
│  - Sets up query key                                       │
│  - Configures caching, stale time                          │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         React Query (QueryClient)                           │
│  - Checks cache first                                       │
│  - Deduplicates requests                                    │
│  - Manages loading/error states                            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│         apiClient.get() (services/api/client.ts)            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Rate Limiter Check                               │  │
│  │     - Prevents too many requests                     │  │
│  │                                                       │  │
│  │  2. Request Deduplication                            │  │
│  │     - Prevents duplicate calls                       │  │
│  │                                                       │  │
│  │  3. Cache Check                                      │  │
│  │     - Returns cached data if available               │  │
│  │                                                       │  │
│  │  4. Request Interceptor                              │  │
│  │     - Adds Authorization header                      │  │
│  │     - Adds CSRF token                                │  │
│  │                                                       │  │
│  │  5. Axios Request                                    │  │
│  │     - Sends HTTP request                             │  │
│  │                                                       │  │
│  │  6. Response Interceptor                             │  │
│  │     - Handles 401 (token refresh)                    │  │
│  │     - Formats errors                                 │  │
│  │                                                       │  │
│  │  7. Cache Response                                   │  │
│  │     - Stores in cache with TTL                      │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend API                               │
│              (http://localhost:8000/api)                     │
└─────────────────────────────────────────────────────────────┘
```

### **Where to Find API Code**

1. **API Client**: `src/services/api/client.ts`
   - Main Axios wrapper
   - All HTTP methods (GET, POST, PUT, DELETE, PATCH)
   - Interceptors for auth, errors, CSRF

2. **API Hooks**: `src/hooks/useQuery.ts`, `src/hooks/useMutation.ts`
   - React Query wrappers
   - Simplified API calls

3. **Module Services**: `src/modules/[module]/services/`
   - Module-specific API calls
   - Example: `src/modules/auth/services/authService.ts`

4. **API Types**: `src/services/api/types.ts`
   - TypeScript interfaces for API responses

### **Making an API Call**

**Option 1: Using useApiQuery (Recommended)**
```tsx
import { useApiQuery } from '@/hooks/useQuery'

const { data, isLoading, error } = useApiQuery<User>({
  endpoint: '/api/users/me',
  enabled: true,
  staleTime: 5 * 60 * 1000 // 5 minutes
})
```

**Option 2: Using apiClient directly**
```tsx
import { apiClient } from '@/services/api/client'

const response = await apiClient.get<User>('/api/users/me', {
  skipCache: false,
  ttl: 300000
})
```

**Option 3: Using React Query directly**
```tsx
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

const { data } = useQuery({
  queryKey: ['users', 'me'],
  queryFn: () => apiClient.get<User>('/api/users/me')
})
```

---

## 🗺️ Page/Routing Flow

### **Routing Architecture**

```
App.tsx
  └─ BrowserRouter
      └─ Layout
          └─ Routes
              ├─ /login → LoginPage (Public)
              ├─ /dashboard → DashboardPage (Protected)
              ├─ /profile → ProfilePage (Protected)
              └─ /list → ListPage (Protected)
```

### **Route Flow**

1. **User navigates to URL** → BrowserRouter matches route
2. **ProtectedRoute checks auth** → Redirects to /login if not authenticated
3. **PageSuspense shows loading** → While lazy loading page
4. **ErrorBoundary catches errors** → Shows fallback if page fails
5. **Page component renders** → Actual page content

### **Where to Find Routing Code**

1. **Routes Definition**: `src/App.tsx`
   - All route definitions
   - Lazy loading setup
   - Error boundaries

2. **Protected Routes**: `src/components/routes/ProtectedRoute.tsx`
   - Authentication check
   - Redirect logic

3. **Pages**: `src/modules/[module]/pages/`
   - Example: `src/modules/dashboard/pages/DashboardPage.tsx`

### **Adding a New Route**

```tsx
// 1. Create page in module
// src/modules/mymodule/pages/MyPage.tsx
export const MyPage = () => {
  return <div>My Page</div>
}

// 2. Export from module index
// src/modules/mymodule/index.ts
export * from './pages/MyPage'

// 3. Add lazy import in App.tsx
const MyPage = lazy(() =>
  import('@/modules/mymodule').then(m => ({ default: m.MyPage }))
)

// 4. Add route
<Route
  path="/mypage"
  element={
    <ProtectedRoute>
      <PageSuspense>
        <ErrorBoundary>
          <MyPage />
        </ErrorBoundary>
      </PageSuspense>
    </ProtectedRoute>
  }
/>
```

---

## 🧩 Component Flow

### **Component Hierarchy**

```
Page Component
  └─ ModuleErrorBoundary (Error isolation)
      └─ Layout Components
          ├─ Header
          ├─ Navigation
          └─ Main Content
              └─ Feature Components
                  ├─ UI Components (Button, Input, etc.)
                  ├─ Lazy Components (Graph, Calendar)
                  └─ Data Components (Table, List)
```

### **Component Types**

1. **UI Components** (`src/components/ui/`)
   - Reusable, generic components
   - Button, Input, Modal, Card, Table, etc.
   - Used across all modules

2. **Layout Components** (`src/components/layout/`)
   - Header, Navigation, Layout
   - App-wide layout structure

3. **Module Components** (`src/modules/[module]/components/`)
   - Feature-specific components
   - Only used within that module

4. **Lazy Components** (`src/components/lazy/`)
   - Lazy loading wrappers
   - Suspense boundaries

### **Where to Find Components**

- **Base UI**: `src/components/ui/`
- **Layout**: `src/components/layout/`
- **Module-specific**: `src/modules/[module]/components/`
- **Errors**: `src/components/errors/`
- **Lazy**: `src/components/lazy/`

### **Using Components**

```tsx
// Import from UI library
import { Button, Input, Card } from '@/components/ui'

// Import lazy components
import { LazyGraph, LazyCalendar } from '@/components/ui'

// Import module components
import { DashboardStats } from '@/modules/dashboard/components'
```

---

## 📊 Data Flow (React Query)

### **React Query Flow**

```
Component
  └─ useApiQuery / useApiMutation
      └─ React Query (QueryClient)
          ├─ Cache Check
          ├─ Request Deduplication
          ├─ Background Refetch
          └─ State Management
              ├─ isLoading
              ├─ isError
              ├─ data
              └─ error
```

### **Query Lifecycle**

1. **Component mounts** → Query starts
2. **Cache check** → Returns cached if fresh
3. **Network request** → If cache stale/missing
4. **Response cached** → Stored for future use
5. **Background refetch** → Keeps data fresh
6. **Component updates** → With new data

### **Where to Find React Query Code**

1. **Query Client Config**: `src/config/queryClient.ts`
   - Global React Query settings
   - Default options

2. **Query Hooks**: `src/hooks/useQuery.ts`
   - `useApiQuery` - For GET requests

3. **Mutation Hooks**: `src/hooks/useMutation.ts`
   - `useApiMutation` - For POST/PUT/DELETE

4. **Pagination**: `src/hooks/usePagination.ts`
   - `usePagination` - Paginated data

5. **Infinite Scroll**: `src/hooks/useInfiniteScroll.ts`
   - `useInfiniteScroll` - Infinite queries

### **Using React Query**

```tsx
// Query (GET)
const { data, isLoading, error, refetch } = useApiQuery<User>({
  endpoint: '/api/users/me',
  staleTime: 5 * 60 * 1000
})

// Mutation (POST/PUT/DELETE)
const mutation = useApiMutation<User, CreateUserData>({
  endpoint: '/api/users',
  method: 'POST',
  invalidateQueries: ['users']
})

mutation.mutate(userData)
```

---

## 🔐 Authentication Flow

### **Auth Journey**

```
1. User enters credentials
   └─ LoginForm component

2. useAuth.login() called
   └─ useLogin mutation (React Query)

3. API call to /auth/login
   └─ apiClient.post() with skipAuth: true

4. Response contains tokens
   └─ Stored in localStorage

5. useCurrentUser query
   └─ Fetches user data with token

6. User state updated
   └─ Available via useAuth() hook

7. Protected routes accessible
   └─ ProtectedRoute checks isAuthenticated
```

### **Where to Find Auth Code**

1. **Auth Types**: `src/modules/auth/types.ts`
   - User, LoginCredentials, AuthResponse interfaces

2. **Auth Service**: `src/modules/auth/services/authService.ts`
   - API calls for auth

3. **Auth Hooks**: `src/modules/auth/hooks/`
   - `useAuth.ts` - Main auth hook
   - `useAuthQuery.ts` - React Query hooks

4. **Login Module**: `src/modules/login/`
   - LoginForm, LoginPage

### **Using Authentication**

```tsx
import { useAuth } from '@/modules/auth'

function MyComponent() {
  const { user, loading, isAuthenticated, login, logout } = useAuth()

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <div>Welcome {user?.name}</div>
}
```

---

## ⚠️ Error Handling Flow

### **Error Handling Layers**

```
1. Component Error
   └─ ComponentErrorFallback
       └─ Shows inline error

2. Module Error
   └─ ModuleErrorBoundary
       └─ Isolates module, rest of app works

3. Query Error
   └─ QueryErrorFallback
       └─ Shows error with retry button

4. Global Error
   └─ ErrorBoundary (App level)
       └─ Shows full-page error
```

### **Where to Find Error Handling**

1. **Error Boundaries**: `src/components/errors/`
   - `ErrorBoundary.tsx` - Global error boundary
   - `ModuleErrorBoundary.tsx` - Module-level
   - `QueryErrorFallback.tsx` - Query errors
   - `ComponentErrorFallback.tsx` - Component errors

2. **Error Handler**: `src/utils/errorHandler.ts`
   - Error logging
   - Error tracking

### **Error Handling in Practice**

```tsx
// Component with error handling
<ModuleErrorBoundary moduleName="Orders">
  <QueryErrorFallback error={error} refetch={refetch}>
    <OrdersList />
  </QueryErrorFallback>
</ModuleErrorBoundary>
```

---

## 🚀 Lazy Loading Flow

### **Lazy Loading Strategy**

```
1. Route Navigation
   └─ React.lazy() loads page chunk
       └─ PageSuspense shows loading
           └─ Page renders

2. Component Render
   └─ Lazy component (Graph, Calendar)
       └─ ComponentSuspense shows loading
           └─ Component renders

3. Image Loading
   └─ LazyImage with Intersection Observer
       └─ Loads when in viewport
```

### **Where to Find Lazy Loading**

1. **Lazy Components**: `src/components/lazy/`
   - `LazySuspense.tsx` - Suspense wrappers
   - `LazyImage.tsx` - Lazy image component

2. **Lazy Hooks**: `src/hooks/useLazyLoad.ts`
   - Intersection Observer hooks

3. **Lazy Utilities**: `src/utils/lazyLoad.ts`
   - Script/stylesheet loading

### **Using Lazy Loading**

```tsx
// Lazy load page
const MyPage = lazy(() => import('./MyPage'))

<PageSuspense>
  <MyPage />
</PageSuspense>

// Lazy load component
<LazyGraph type="line" data={data} />

// Lazy load image
<LazyImage src="/image.jpg" alt="Description" />
```

---

## 📦 Module Structure

### **Module Architecture**

Each module is **completely independent**:

```
modules/
└─ [module-name]/
    ├── components/        # Module-specific components
    ├── pages/           # Page components
    ├── hooks/           # Module-specific hooks
    ├── services/        # Module API services
    ├── types.ts         # TypeScript types
    └── index.ts         # Public exports
```

### **Module Example: Dashboard**

```
modules/dashboard/
├── components/
│   └── DashboardStats.tsx    # Stats cards component
├── pages/
│   └── DashboardPage.tsx     # Main dashboard page
└── index.ts                  # Exports DashboardPage
```

### **Creating a New Module**

1. **Create module directory**
   ```bash
   mkdir -p src/modules/mymodule/{components,pages,hooks,services}
   ```

2. **Create types**
   ```typescript
   // src/modules/mymodule/types.ts
   export interface MyModuleData {
     id: string
     name: string
   }
   ```

3. **Create components**
   ```tsx
   // src/modules/mymodule/components/MyComponent.tsx
   export const MyComponent = () => {
     return <div>My Component</div>
   }
   ```

4. **Create page**
   ```tsx
   // src/modules/mymodule/pages/MyPage.tsx
   export const MyPage = () => {
     return <MyComponent />
   }
   ```

5. **Export from index**
   ```typescript
   // src/modules/mymodule/index.ts
   export * from './pages/MyPage'
   export * from './components/MyComponent'
   ```

6. **Add to App.tsx** (lazy load)
   ```tsx
   const MyPage = lazy(() =>
     import('@/modules/mymodule').then(m => ({ default: m.MyPage }))
   )
   ```

---

## 🔧 Adding New Features

### **Step-by-Step Guide**

#### **1. Add a New Page**

```tsx
// 1. Create page component
// src/modules/orders/pages/OrdersPage.tsx
export const OrdersPage = () => {
  return <div>Orders Page</div>
}

// 2. Export from module
// src/modules/orders/index.ts
export * from './pages/OrdersPage'

// 3. Add lazy import in App.tsx
const OrdersPage = lazy(() =>
  import('@/modules/orders').then(m => ({ default: m.OrdersPage }))
)

// 4. Add route
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <PageSuspense>
        <ErrorBoundary>
          <OrdersPage />
        </ErrorBoundary>
      </PageSuspense>
    </ProtectedRoute>
  }
/>
```

#### **2. Add API Endpoint**

```tsx
// 1. Add to module service
// src/modules/orders/services/orderService.ts
import { apiClient } from '@/services/api/client'

export const orderService = {
  getOrders: async () => {
    return await apiClient.get('/orders')
  },
  createOrder: async (data: CreateOrderData) => {
    return await apiClient.post('/orders', data)
  }
}

// 2. Create React Query hooks
// src/modules/orders/hooks/useOrders.ts
import { useApiQuery, useApiMutation } from '@/hooks'

export const useOrders = () => {
  return useApiQuery({
    endpoint: '/orders',
    staleTime: 30000
  })
}

export const useCreateOrder = () => {
  return useApiMutation({
    endpoint: '/orders',
    method: 'POST',
    invalidateQueries: ['orders']
  })
}
```

#### **3. Add Translations**

```json
// src/locales/en.json
{
  "orders": {
    "title": "Orders",
    "createOrder": "Create Order",
    "orderStatus": "Order Status"
  }
}

// src/locales/hi.json
{
  "orders": {
    "title": "ऑर्डर",
    "createOrder": "ऑर्डर बनाएं",
    "orderStatus": "ऑर्डर स्थिति"
  }
}

// src/locales/pa.json
{
  "orders": {
    "title": "ਆਰਡਰ",
    "createOrder": "ਆਰਡਰ ਬਣਾਓ",
    "orderStatus": "ਆਰਡਰ ਸਥਿਤੀ"
  }
}
```

---

## 🎨 Common Patterns

### **Pattern 1: Page with Data Fetching**

```tsx
import { useApiQuery } from '@/hooks/useQuery'
import { QueryErrorFallback } from '@/components/errors'
import { ModuleErrorBoundary } from '@/components/errors'
import { ComponentSuspense } from '@/components/lazy'

export const MyPage = () => {
  const { t } = useTranslation()
  const { data, isLoading, error, refetch } = useApiQuery({
    endpoint: '/api/data'
  })

  if (isLoading) return <Loading />
  if (error) return <QueryErrorFallback error={error} refetch={refetch} />

  return (
    <ModuleErrorBoundary moduleName="MyModule">
      <ComponentSuspense>
        <div>{data?.name}</div>
      </ComponentSuspense>
    </ModuleErrorBoundary>
  )
}
```

### **Pattern 2: Form with Mutation**

```tsx
import { useApiMutation } from '@/hooks/useMutation'
import { Button, Input, Form } from '@/components/ui'

export const MyForm = () => {
  const mutation = useApiMutation({
    endpoint: '/api/data',
    method: 'POST',
    invalidateQueries: ['data']
  })

  const onSubmit = (data: FormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        // Handle success
      },
      onError: (error) => {
        // Handle error
      }
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Input name="name" label="Name" />
      <Button type="submit" loading={mutation.isPending}>
        Submit
      </Button>
    </Form>
  )
}
```

### **Pattern 3: List with Pagination**

```tsx
import { usePagination } from '@/hooks/usePagination'
import { Table } from '@/components/ui'

export const MyList = () => {
  const {
    data,
    page,
    totalPages,
    setPage,
    isLoading
  } = usePagination({
    endpoint: '/api/items',
    pageSize: 10
  })

  return (
    <>
      <Table rows={data || []} />
      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, newPage) => setPage(newPage)}
      />
    </>
  )
}
```

---

## 🔍 Quick Reference

### **Where to Find Things**

| What You Need | Where to Look |
|--------------|---------------|
| **API Calls** | `src/services/api/client.ts` |
| **React Query Hooks** | `src/hooks/useQuery.ts`, `src/hooks/useMutation.ts` |
| **Pages** | `src/modules/[module]/pages/` |
| **Components** | `src/components/ui/` or `src/modules/[module]/components/` |
| **Routes** | `src/App.tsx` |
| **Types** | `src/modules/[module]/types.ts` |
| **Translations** | `src/locales/*.json` |
| **Theme Config** | `src/config/theme.ts` |
| **Environment Variables** | `src/config/env.ts` |
| **Error Handling** | `src/components/errors/` |
| **Lazy Loading** | `src/components/lazy/` |

### **Common Imports**

```tsx
// UI Components
import { Button, Input, Card, Table } from '@/components/ui'

// Hooks
import { useApiQuery, useApiMutation } from '@/hooks'
import { useAuth } from '@/modules/auth'
import { useTranslation } from 'react-i18next'

// Utilities
import { apiClient } from '@/services/api/client'
import { errorHandler } from '@/utils/errorHandler'

// Error Handling
import { ErrorBoundary, ModuleErrorBoundary } from '@/components/errors'

// Lazy Loading
import { PageSuspense, ComponentSuspense, LazyImage } from '@/components/lazy'
```

---

## 🚦 Development Workflow

### **1. Starting Development**

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run linter
npm run lint

# Format code
npm run format

# Type check
npm run type-check
```

### **2. Adding a Feature**

1. **Create module structure**
2. **Add types** (`types.ts`)
3. **Create components** (`components/`)
4. **Create pages** (`pages/`)
5. **Add API hooks** (`hooks/`)
6. **Add translations** (`locales/*.json`)
7. **Add route** (`App.tsx`)
8. **Test & verify**

### **3. Code Style**

- **2 spaces** indentation
- **Single quotes** for strings
- **No semicolons** (where possible)
- **TypeScript strict mode**
- **ESLint + Prettier** enforced

---

## 📚 Additional Resources

- **Project Structure**: `PROJECT_STRUCTURE.md`
- **React Query Setup**: `REACT_QUERY_SETUP.md`
- **i18n Setup**: `I18N_SETUP.md`
- **Error Handling**: `ERROR_HANDLING_GUIDE.md`
- **Lazy Loading**: `LAZY_LOADING_GUIDE.md`
- **Product Roadmap**: `PRODUCT_ROADMAP.md`

---

## ✅ Checklist for New Developers

- [ ] Read this guide completely
- [ ] Understand modular architecture
- [ ] Know where API calls are made
- [ ] Understand React Query flow
- [ ] Know error handling patterns
- [ ] Understand lazy loading strategy
- [ ] Know how to add new modules
- [ ] Understand authentication flow
- [ ] Know i18n usage
- [ ] Run the project locally

---

**Happy Coding! 🚀**

