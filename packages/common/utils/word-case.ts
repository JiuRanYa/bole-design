/**
 * 将命名转换为首字母大写的驼峰
 *
 */

type CapitalCase<T extends string> = T extends `${infer First}-${infer Rest}`
  ? `${Capitalize<First>}${CapitalCase<Rest>}`
  : Capitalize<T>

export function toCapitalCase<T extends string>(value: T) {
  return (value.charAt(0).toUpperCase()
    + value
      .slice(1)
      .replace(/-(\w)/g, (_, char) => (char ? char.toUpperCase() : ''))) as CapitalCase<T>
}

// 短横线命名
export function toKebabCase(value: string) {
  if (allCapital(value))
    return value.toLocaleLowerCase()

  return (
    value.charAt(0).toLowerCase()
    + value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}

export function allCapital(value: string) {
  const matched = value.match(/[A-Z]+/)

  return matched && matched[0] === value
}
