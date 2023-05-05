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
const hasOwnProperty = Object.prototype.hasOwnProperty

export function is(value: unknown, type: string) {
  return toString.call(value) === `[object ${type}]`
}

export function isObject<T extends Record<string, any>>(value: unknown): value is T {
  return is(value, 'Object')
}

export function isFunction(value: unknown): value is (...any: any[]) => any {
  return is(value, 'Function')
}

export function isNull(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function has(value: Record<string, any>, key: string | symbol): key is keyof typeof value {
  return hasOwnProperty.call(value, key)
}
