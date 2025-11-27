# Quick Start Guide

## 🚀 Getting Started (5 Minutes)

### **1. Install Dependencies**
```bash
npm install
```

### **2. Setup Environment**
Create `.env.development`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_MODE=development
VITE_ENABLE_DEV_TOOLS=true
```

### **3. Run Development Server**
```bash
npm run dev
```

### **4. Open Browser**
Navigate to `http://localhost:3000`

---

## 📍 Key Locations

### **Where is...?**

| Need | Location |
|------|----------|
| **API calls** | `src/services/api/client.ts` |
| **Pages** | `src/modules/[module]/pages/` |
| **Components** | `src/components/ui/` |
| **Routes** | `src/App.tsx` |
| **Hooks** | `src/hooks/` |
| **Types** | `src/modules/[module]/types.ts` |
| **Translations** | `src/locales/*.json` |

---

## 🔄 Common Flows

### **Making an API Call**
```tsx
import { useApiQuery } from '@/hooks/useQuery'

const { data, isLoading } = useApiQuery({
  endpoint: '/api/users'
})
```

### **Adding a New Page**
1. Create `src/modules/mymodule/pages/MyPage.tsx`
2. Export from `src/modules/mymodule/index.ts`
3. Add lazy import in `src/App.tsx`
4. Add route in `src/App.tsx`

### **Using Components**
```tsx
import { Button, Input, Card } from '@/components/ui'
```

### **Handling Errors**
```tsx
import { ModuleErrorBoundary } from '@/components/errors'

<ModuleErrorBoundary moduleName="MyModule">
  <MyComponent />
</ModuleErrorBoundary>
```

---

## 📖 Full Documentation

See `DEVELOPER_GUIDE.md` for complete documentation.

