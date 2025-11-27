# Enterprise React Application

A professional, enterprise-grade React application built with Vite, TypeScript, MUI, and TailwindCSS.

## Features

- ✅ **Vite + React + TypeScript** - Modern build tooling
- ✅ **MUI + TailwindCSS** - Professional styling with utility classes
- ✅ **Modular Architecture** - Feature-based modules for large teams
- ✅ **Reusable Components** - Complete UI component library
- ✅ **Global Theming** - Dark/light mode with centralized configuration
- ✅ **Responsive Design** - Mobile-first with PWA support
- ✅ **ESLint + Prettier** - Strict code formatting (2 spaces, single quotes, no semicolons)
- ✅ **Accessibility** - WCAG-compliant with ARIA support
- ✅ **API Layer** - Axios wrapper with interceptors, caching, deduplication, rate-limiting
- ✅ **Security** - XSS prevention, CSRF tokens, input sanitization, CSP headers
- ✅ **Environment Config** - Separate .env files for dev/prod

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # Base components (Button, Input, Modal, etc.)
│   ├── layout/       # Layout components (Header, Navigation)
│   └── routes/       # Route components (ProtectedRoute)
├── modules/          # Feature modules (auth, login, profile, dashboard, list)
├── services/         # API services
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── config/           # Configuration (theme, breakpoints, env)
└── styles/           # Global styles
```

## Environment Variables

Create `.env.development` and `.env.production` files:

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_MODE=development
VITE_ENABLE_DEV_TOOLS=true
```

## Code Style

- 2 spaces indentation
- Single quotes
- No semicolons
- Consistent spacing
- TypeScript strict mode

## Security Features

- XSS prevention with DOMPurify
- CSRF token generation and validation
- Rate limiting on client-side
- Content Security Policy headers
- Input sanitization
- HTML escaping for dynamic content

## Accessibility

All components include:
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- WCAG 2.1 compliance

## 📚 Documentation

- **[Developer Guide](./DEVELOPER_GUIDE.md)** - Complete project flow and architecture
- **[Quick Start](./QUICK_START.md)** - 5-minute setup guide
- **[Project Flow Diagrams](./PROJECT_FLOW_DIAGRAMS.md)** - Visual flow diagrams
- **[Project Structure](./PROJECT_STRUCTURE.md)** - Detailed file structure
- **[React Query Setup](./REACT_QUERY_SETUP.md)** - React Query documentation
- **[i18n Setup](./I18N_SETUP.md)** - Internationalization guide
- **[Error Handling](./ERROR_HANDLING_GUIDE.md)** - Error handling patterns
- **[Lazy Loading](./LAZY_LOADING_GUIDE.md)** - Lazy loading guide
- **[Product Roadmap](./PRODUCT_ROADMAP.md)** - Product development roadmap

## License

MIT

