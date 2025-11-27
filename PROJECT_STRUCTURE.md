# Project Structure

This document outlines the complete structure of the enterprise React application.

## Directory Structure

```
react/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── index.ts
│   │   └── ui/
│   │       ├── Alert/
│   │       ├── Button/
│   │       ├── Calendar/
│   │       ├── Card/
│   │       ├── Chip/
│   │       ├── Form/
│   │       ├── Graph/
│   │       ├── Input/
│   │       ├── List/
│   │       ├── Modal/
│   │       ├── Table/
│   │       └── index.ts
│   ├── config/
│   │   ├── breakpoints.ts
│   │   ├── env.ts
│   │   └── theme.ts
│   ├── hooks/
│   │   └── useTheme.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts
│   │   │   ├── services/
│   │   │   │   └── authService.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   │   └── DashboardStats.tsx
│   │   │   ├── pages/
│   │   │   │   └── DashboardPage.tsx
│   │   │   └── index.ts
│   │   ├── list/
│   │   │   ├── components/
│   │   │   │   └── DataList.tsx
│   │   │   ├── pages/
│   │   │   │   └── ListPage.tsx
│   │   │   └── index.ts
│   │   ├── login/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── pages/
│   │   │   │   └── LoginPage.tsx
│   │   │   └── index.ts
│   │   └── profile/
│   │       ├── components/
│   │       │   └── ProfileForm.tsx
│   │       ├── pages/
│   │       │   └── ProfilePage.tsx
│   │       └── index.ts
│   ├── services/
│   │   └── api/
│   │       ├── client.ts
│   │       ├── deduplication.ts
│   │       ├── rateLimiter.ts
│   │       └── types.ts
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── cache.ts
│   │   ├── classNames.ts
│   │   ├── security.ts
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintignore
├── .eslintrc.cjs
├── .gitignore
├── .prettierignore
├── .prettierrc
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Key Features

### 1. Modular Architecture
- **Feature-based modules**: Each feature (auth, login, profile, dashboard, list) is completely independent
- **Zero conflicts**: Teams can work on different modules simultaneously
- **Clear separation**: Services, components, pages, and hooks are organized per module

### 2. Reusable UI Components
All components in `src/components/ui/` are:
- Fully typed with TypeScript
- Accessible (ARIA labels, keyboard navigation)
- Styled with MUI + TailwindCSS
- Consistent API and behavior

### 3. Global Configuration
- **Theme**: Centralized in `src/config/theme.ts` - change once, updates everywhere
- **Breakpoints**: Mobile-first responsive design in `src/config/breakpoints.ts`
- **Environment**: Type-safe env variables in `src/config/env.ts`

### 4. API Layer
- **Axios wrapper**: `src/services/api/client.ts`
- **Request deduplication**: Prevents duplicate API calls
- **Caching**: TTL-based caching system
- **Rate limiting**: Client-side protection
- **Auto token refresh**: Seamless authentication
- **Error handling**: Global error management

### 5. Security
- **XSS prevention**: DOMPurify sanitization
- **CSRF tokens**: Auto-generated and validated
- **Input sanitization**: All user inputs cleaned
- **CSP headers**: Content Security Policy in HTML
- **Rate limiting**: DOS protection

### 6. Accessibility
- **ARIA labels**: Every interactive element
- **Keyboard navigation**: Full keyboard support
- **Screen readers**: Semantic HTML and roles
- **WCAG compliance**: Following 2.1 guidelines

## Code Style

- **2 spaces** indentation
- **Single quotes** for strings
- **No semicolons** (where possible)
- **Consistent spacing** throughout
- **TypeScript strict mode** enabled

## Getting Started

1. Install dependencies: `npm install`
2. Create `.env.development` file (see `.env.example`)
3. Run dev server: `npm run dev`
4. Build for production: `npm run build`

## Module Development

When creating a new module:

1. Create directory in `src/modules/[module-name]/`
2. Add `components/`, `pages/`, `services/`, `hooks/` as needed
3. Export from `index.ts`
4. Import in `App.tsx` routes

This ensures zero conflicts with other modules.

