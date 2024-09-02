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
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNull(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

export function isDefined(value: unknown): value is undefined {
  return value !== undefined
}

export function has(value: Record<string, any>, key: string | symbol): key is keyof typeof value {
  return hasOwnProperty.call(value, key)
}

export function getBase64StringFromDataURL(dataURL: string) {
  return dataURL.replace('data:', '').replace(/^.+,/, '')
}

export async function getBase64BySrc(src: string): Promise<string> {
  return new Promise((resolve) => {
    fetch(src)
      .then(res => res.blob())
      .then(async (blob) => {
        // Read the Blob as DataURL using the FileReader API
        const reader = new FileReader()
        reader.readAsDataURL(blob)

        reader.onloadend = async () => {
          const base64 = getBase64StringFromDataURL(reader.result as any)

          const src = `data: image/png;base64, ${base64}`

          resolve(src)
        }
      })
  })
}
