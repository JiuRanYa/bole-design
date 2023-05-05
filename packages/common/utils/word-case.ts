/**
 * 将命名转换为首字母大写的驼峰
 *
 */

type CapitalCase<T extends string> = T extends `${infer First}-${infer Rest}`
  ? `${Capitalize<First>}${CapitalCase<Rest>}`
  : Capitalize<T>

export function toCapitalCase<T extends string>(value: T) {
  return (value.charAt(0).toUpperCase() +
    value
      .slice(1)
      .replace(/-(\w)/g, (_, char) => (char ? char.toUpperCase() : ''))) as CapitalCase<T>
}
