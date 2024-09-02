export const isClient = typeof window !== 'undefined'

export function noop() {}

/**
 * 一个返回 `true` 的占位函数
 *
 * @returns `true`
 */
export function toTrue(...args: any[]): true
export function toTrue() {
  return true
}
