// export function isObject<T extends Record<string, any> = Record<string, any>>(
//   value: unknown
// ): value is T
//
// export function has(
//   value: Record<string, any>,
//   key: string | symbol
// ): key is keyof typeof value
//
// export function isFunction() {}
//
export function isObject<T extends Record<string, any>>(value: unknown): value is T {
  return is(value, 'Object')
}

export function isFunction<T extends Record<string, any>>(value: unknown): value is T {
  return is(value, 'Function')
}

export function is(value: unknown, type: string) {
  return toString.call(value) === `[object ${type}]`
}
