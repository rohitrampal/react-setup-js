class RequestDeduplication {
  constructor() {
    this.pendingRequests = new Map()
    this.DEDUP_WINDOW_MS = 1000
  }

  generateKey(method, url, data) {
    return `${method}:${url}:${JSON.stringify(data || {})}`
  }

  async deduplicate(key, requestFn) {
    const existing = this.pendingRequests.get(key)

    if (existing) {
      const age = Date.now() - existing.timestamp
      if (age < this.DEDUP_WINDOW_MS) {
        return existing.promise
      }
      this.pendingRequests.delete(key)
    }

    const promise = requestFn().finally(() => {
      setTimeout(() => {
        this.pendingRequests.delete(key)
      }, this.DEDUP_WINDOW_MS)
    })

    this.pendingRequests.set(key, {
      promise,
      timestamp: Date.now(),
    })

    return promise
  }

  clear() {
    this.pendingRequests.clear()
  }
}

export const requestDeduplication = new RequestDeduplication()
