export const lazyLoadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

export const lazyLoadStylesheet = (href) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    link.onload = () => resolve()
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`))
    document.head.appendChild(link)
  })
}

export const preloadRoute = (routePath) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import(/* @vite-ignore */ routePath).catch(() => {
        // Silently fail if route doesn't exist
      })
    })
  }
}

