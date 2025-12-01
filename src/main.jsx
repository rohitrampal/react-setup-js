import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n'
import { performanceMonitor } from './utils/performance'

// Initialize performance monitoring
if (typeof window !== 'undefined') {
  performanceMonitor.init()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
