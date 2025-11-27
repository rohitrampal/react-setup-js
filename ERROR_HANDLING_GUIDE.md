# Error Handling & Fallback Components Guide

## Overview

This project implements comprehensive error handling to prevent the entire application from crashing when modules or components fail due to undefined errors or other issues.

## Error Handling Strategy

### 1. **Global Error Boundary** ✅
- Catches errors at the root level
- Prevents entire app crash
- Shows user-friendly error message

### 2. **Module-Level Error Boundaries** ✅
- Each module wrapped in `ModuleErrorBoundary`
- Isolates errors to specific modules
- Rest of app continues working

### 3. **Component-Level Error Handling** ✅
- `SafeComponent` wrapper for risky components
- `ComponentErrorFallback` for component errors
- Graceful degradation

### 4. **Query Error Handling** ✅
- `QueryErrorFallback` for React Query errors
- Automatic retry functionality
- Network error detection

### 5. **Error Logging** ✅
- Centralized error handler
- Error tracking and reporting
- Development vs production handling

## Usage Examples

### 1. Wrap Your App with ErrorBoundary

```tsx
import { ErrorBoundary } from '@/components/errors'

function App() {
  return (
    <ErrorBoundary>
      {/* Your app */}
    </ErrorBoundary>
  )
}
```

### 2. Protect Individual Modules

```tsx
import { ModuleErrorBoundary } from '@/components/errors'

function MyModule() {
  return (
    <ModuleErrorBoundary moduleName="MyModule">
      {/* Module content */}
    </ModuleErrorBoundary>
  )
}
```

### 3. Handle React Query Errors

```tsx
import { QueryErrorFallback } from '@/components/errors'
import { useApiQuery } from '@/hooks/useQuery'

function MyComponent() {
  const { data, error, refetch, isLoading } = useApiQuery({ endpoint: '/api/data' })

  if (error) {
    return <QueryErrorFallback error={error} refetch={refetch} isLoading={isLoading} />
  }

  return <div>{data}</div>
}
```

### 4. Use SafeComponent for Risky Components

```tsx
import { SafeComponent } from '@/components/errors'

function MyComponent() {
  return (
    <SafeComponent componentName="MyComponent">
      {/* Component that might fail */}
      {someData?.map(item => <div key={item.id}>{item.name}</div>)}
    </SafeComponent>
  )
}
```

### 5. Use Safe State Hook

```tsx
import { useSafeState, useSafeValue } from '@/hooks/useSafeState'

function MyComponent() {
  const [data, setData] = useSafeState(null)
  const safeValue = useSafeValue(data?.name, 'Default Name')

  return <div>{safeValue}</div>
}
```

## Error Types Handled

### 1. **Undefined Errors**
- `Cannot read property 'x' of undefined`
- `undefined is not a function`
- Missing data errors

### 2. **Network Errors**
- Connection failures
- Timeout errors
- Fetch errors

### 3. **Component Errors**
- Component render failures
- Props errors
- State errors

### 4. **Module Errors**
- Module initialization failures
- Import errors
- Dependency errors

## Best Practices

### ✅ DO:

1. **Always wrap modules in ModuleErrorBoundary**
   ```tsx
   <ModuleErrorBoundary moduleName="Orders">
     <OrdersModule />
   </ModuleErrorBoundary>
   ```

2. **Handle undefined values safely**
   ```tsx
   const name = user?.name || 'Guest'
   const items = data?.items ?? []
   ```

3. **Use optional chaining**
   ```tsx
   const value = data?.nested?.property
   ```

4. **Provide fallbacks**
   ```tsx
   const displayName = useSafeValue(user?.name, 'Anonymous')
   ```

5. **Handle query errors**
   ```tsx
   if (error) {
     return <QueryErrorFallback error={error} refetch={refetch} />
   }
   ```

### ❌ DON'T:

1. **Don't access properties without checking**
   ```tsx
   // ❌ Bad
   const name = user.name
   
   // ✅ Good
   const name = user?.name || 'Guest'
   ```

2. **Don't ignore errors**
   ```tsx
   // ❌ Bad
   try {
     riskyOperation()
   } catch (e) {
     // Silent failure
   }
   
   // ✅ Good
   try {
     riskyOperation()
   } catch (error) {
     errorHandler.logError(error)
     // Show fallback UI
   }
   ```

3. **Don't let errors propagate unhandled**
   ```tsx
   // ❌ Bad
   <ComponentThatMightFail />
   
   // ✅ Good
   <ModuleErrorBoundary moduleName="Component">
     <ComponentThatMightFail />
   </ModuleErrorBoundary>
   ```

## Error Logging

Errors are automatically logged to:
- Console (development)
- Error handler service (production)
- Browser error tracking

Access logged errors:
```tsx
import { errorHandler } from '@/utils/errorHandler'

const errors = errorHandler.getErrors()
const lastError = errorHandler.getLastError()
```

## Testing Error Boundaries

### Test Undefined Errors:
```tsx
function TestComponent() {
  const data = undefined
  return <div>{data.property}</div> // Will trigger error boundary
}
```

### Test Network Errors:
```tsx
const { error } = useApiQuery({
  endpoint: '/api/failing-endpoint'
})
// Will show QueryErrorFallback
```

## Error Messages (i18n)

All error messages are internationalized:
- English
- Hindi
- Punjabi

Add new error messages in `src/locales/*.json`:
```json
{
  "errors": {
    "myCustomError": "Custom error message"
  }
}
```

## Summary

✅ **Global Error Boundary** - Prevents app crash  
✅ **Module Error Boundaries** - Isolates module errors  
✅ **Query Error Fallback** - Handles data loading errors  
✅ **Safe Components** - Protects risky components  
✅ **Error Logging** - Tracks and reports errors  
✅ **i18n Support** - Multilingual error messages  

Your application is now protected against crashes! 🛡️

