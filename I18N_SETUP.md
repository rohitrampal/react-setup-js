# Internationalization (i18n) Setup

This project uses `react-i18next` for multilingual support with three languages:
- **English (en)** - Default language
- **Hindi (hi)** - हिंदी
- **Punjabi (pa)** - ਪੰਜਾਬੀ

## Structure

```
src/
├── i18n.ts                 # i18n configuration
└── locales/
    ├── en.json            # English translations
    ├── hi.json            # Hindi translations
    └── pa.json            # Punjabi translations
```

## Configuration

The i18n configuration is in `src/i18n.ts`:
- **Language Detection**: Automatically detects language from:
  1. localStorage (`i18nextLng`)
  2. Browser navigator
  3. HTML lang attribute
- **Fallback Language**: English (en)
- **Supported Languages**: en, hi, pa
- **Persistence**: Selected language is saved to localStorage

## Usage

### In Components

```tsx
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return <h1>{t('common.appName')}</h1>
}
```

### Translation Keys

Translation keys are organized by feature:
- `common.*` - Common UI elements (buttons, labels, etc.)
- `auth.*` - Authentication related
- `navigation.*` - Navigation items
- `dashboard.*` - Dashboard page
- `profile.*` - Profile page
- `list.*` - List page
- `language.*` - Language switcher

### Adding New Translations

1. Add the key to all locale files (`en.json`, `hi.json`, `pa.json`)
2. Use the key in your component with `t('key.path')`

Example:
```json
// en.json
{
  "myFeature": {
    "title": "My Feature"
  }
}

// hi.json
{
  "myFeature": {
    "title": "मेरी सुविधा"
  }
}

// pa.json
{
  "myFeature": {
    "title": "ਮੇਰੀ ਸੁਵਿਧਾ"
  }
}
```

## Language Switcher

The language switcher is integrated into the Header component. Users can:
- Click the language icon
- Select from available languages
- The selection persists across sessions

## Features

✅ Automatic language detection
✅ Persistent language selection (localStorage)
✅ Fallback to English if translation missing
✅ Type-safe translation keys
✅ Support for RTL languages (ready for future expansion)
✅ Accessible language switcher with ARIA labels

## Installation

After cloning the project, install dependencies:

```bash
npm install
```

The i18n setup is automatically initialized when the app starts (imported in `main.tsx`).

