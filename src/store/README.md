# Zustand Store Usage Guide

## Overview

This project uses **Zustand** for global state management. Zustand is lightweight (~1KB), secure, and provides built-in persistence.

## Store Structure

### 1. Auth Store (`authStore.js`)
- **Stores**: User profile data (non-sensitive)
- **Does NOT store**: Tokens (kept in encrypted storage)
- **Persistence**: Encrypted localStorage
- **Security**: Validated on load

### 2. UI Store (`uiStore.js`)
- **Stores**: Theme, sidebar state, UI preferences
- **Persistence**: Regular localStorage (safe data)
- **Security**: No sensitive data

### 3. App Store (`appStore.js`)
- **Stores**: App settings, feature flags, language
- **Persistence**: Regular localStorage (safe data)
- **Security**: No sensitive data

## Usage Examples

### Auth Store

```javascript
import { useAuthStore } from '@/store'

function MyComponent() {
  // Get state and actions
  const { user, isAuthenticated, login, logout } = useAuthStore()
  
  // Get specific values (no re-render if other values change)
  const user = useAuthStore(state => state.user)
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)
  
  // Get actions only
  const login = useAuthStore(state => state.login)
  const logout = useAuthStore(state => state.logout)
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login(userData)}>Login</button>
      )}
    </div>
  )
}
```

### UI Store

```javascript
import { useUIStore } from '@/store'

function ThemeToggle() {
  const { theme, toggleTheme } = useUIStore()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}

function Sidebar() {
  const sidebarOpen = useUIStore(state => state.sidebarOpen)
  const setSidebarOpen = useUIStore(state => state.setSidebarOpen)
  
  return (
    <aside className={sidebarOpen ? 'open' : 'closed'}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        Toggle
      </button>
    </aside>
  )
}
```

### App Store

```javascript
import { useAppStore } from '@/store'

function Settings() {
  const { language, setLanguage, timezone, setTimezone } = useAppStore()
  
  return (
    <div>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
      </select>
      
      <select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
        <option value="UTC">UTC</option>
        <option value="America/New_York">EST</option>
      </select>
    </div>
  )
}
```

## Integration with React Query

Zustand works perfectly with React Query:

```javascript
import { useAuthStore } from '@/store'
import { useCurrentUser } from '@/modules/auth/hooks/useAuthQuery'

function UserProfile() {
  // React Query for server data
  const { data: user, isLoading } = useCurrentUser()
  
  // Zustand for client state
  const { setUser } = useAuthStore()
  
  useEffect(() => {
    if (user) {
      // Sync React Query data to Zustand
      setUser(user)
    }
  }, [user, setUser])
  
  // ... rest of component
}
```

## Security Best Practices

### ✅ DO:
- Store user profile in Zustand (validated)
- Store UI preferences in Zustand
- Encrypt sensitive data before storage
- Validate state on load

### ❌ DON'T:
- Store tokens in Zustand (use encrypted storage)
- Store passwords in Zustand
- Store sensitive data without encryption
- Trust data from storage without validation

## Migration from Current Code

### Before (localStorage only):
```javascript
const [theme, setTheme] = useState(() => {
  const stored = localStorage.getItem('theme_mode')
  return stored || 'light'
})

useEffect(() => {
  localStorage.setItem('theme_mode', theme)
}, [theme])
```

### After (Zustand):
```javascript
const { theme, setTheme } = useUIStore()
// Persistence is automatic!
```

## Performance Tips

1. **Selective Subscriptions**: Only subscribe to what you need
   ```javascript
   // ✅ Good - only re-renders when user changes
   const user = useAuthStore(state => state.user)
   
   // ❌ Bad - re-renders on any store change
   const { user } = useAuthStore()
   ```

2. **Actions Outside Components**: Define actions in store, not components
   ```javascript
   // ✅ Good - action in store
   const login = useAuthStore(state => state.login)
   
   // ❌ Bad - action in component
   const handleLogin = () => {
     useAuthStore.getState().setUser(userData)
   }
   ```

## Testing

```javascript
import { renderHook, act } from '@testing-library/react'
import { useAuthStore } from '@/store'

test('login updates user', () => {
  const { result } = renderHook(() => useAuthStore())
  
  act(() => {
    result.current.login(mockUser)
  })
  
  expect(result.current.user).toEqual(mockUser)
  expect(result.current.isAuthenticated).toBe(true)
})
```

## DevTools

Zustand DevTools are enabled in development. Install Redux DevTools extension to see state changes.

---

*For more details, see STATE_MANAGEMENT_RECOMMENDATION.md*

