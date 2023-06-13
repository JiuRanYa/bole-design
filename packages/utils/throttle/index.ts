export function throttle<T extends (...args: any[]) => any>(method: T, delay: number = 100) {
  if (typeof method !== 'function') return

  let start = Date.now()
  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    const current = Date.now()
    const remaining = start + delay - current

    clearTimeout(timer)

    if (remaining <= 0) {
      method(...args)
      start = Date.now()
    } else {
      timer = setTimeout(() => {
        method(...args)
      }, delay)
    }
  }
}
