/**
 * 将一个函数或方法进行防抖
 *
 * @param method 需要防抖的方法，需自行绑定 this
 * @param delay 防抖的限制时间，默认 100ms
 */
export function debounce<T extends (...args: any[]) => any>(method: T, delay = 100) {
  if (typeof method !== 'function') {
    return method
  }

  let timer: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      method(...args)
    }, delay)
  }
}
