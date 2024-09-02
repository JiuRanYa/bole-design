import { isNull } from './utils'

/**
 * 将给定的值转成数字，NaN 的情况将会处理成 0
 *
 * @param value 需要转换的值
 *
 * @returns 转换后的数字
 */
export function toNumber(value: unknown) {
  let number = Number.parseFloat(value as string)

  if (Number.isNaN(number))
    number = Number(value)

  return Number.isNaN(number) ? 0 : number
}

/**
 * 将数字限定在范围内
 *
 * @param value 限定的数字
 * @param min 最小值
 * @param max 最大值
 *
 * @returns 转换后的数字
 */
export function boundValueInRange(value: number | string, min: number, max: number) {
  return Math.max(min, Math.min(Number.parseFloat(value as string), max))
}

/**
 * 将给定的实数保留一定的小数，可以处理js的精度问题
 *
 * @param number 需要处理的实数
 * @param decimal 需要保留的小数
 *
 * @returns 保留小数后的值
 */
export function toFixed(number: number, decimal: number) {
  if (decimal <= 0)
    return number
  if (decimal === 0)
    return Math.round(number)

  let snum = String(number)

  const pointPos = snum.indexOf('.')
  if (pointPos === -1)
    return number

  const nums = snum.replace('.', '').split('')
  const targetPos = pointPos + decimal
  const datum = nums[targetPos]

  // 精度不够直接返回
  if (!datum)
    return number

  if (snum.charAt(targetPos + 1) === '5')
    snum = `${snum.substring(0, targetPos + 1)}6`
  else
    snum = snum.substring(0, targetPos + 2)

  return Number.parseFloat(Number(snum).toFixed(decimal))
}

export const numberRE = /^\s*[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?\s*$/i

/**
 * 检测给定的值是否可以通过 parseFlat 或 Number 方法转为数字
 *
 * 开启严格模式则通过正则以更严格的方法判断
 *
 * @param value 需要检测的值
 * @param strict 是否为严格模式
 *
 * @returns 值是否可以转为数字
 */
export function isValidNumber(value: unknown, strict = false) {
  if (typeof value === 'number')
    return !Number.isNaN(value)

  if (strict)
    return numberRE.test(String(value))

  return !Number.isNaN(Number.parseFloat(value as string)) || !Number.isNaN(Number(value))
}

/**
 * 生成一个值递进的数组
 *
 * @param size 大小
 * @param start 开始的数值，默认为 1
 * @param step 跨度，默认为 1
 *
 * @returns 生成的数组
 */
export function range(size: number, start = 1, step = 1) {
  const array: number[] = []

  for (let i = 0; i < size; ++i)
    array.push(start + i * step)

  return array
}

export function getPrecision(value: number | null | undefined) {
  if (isNull(value))
    return 0
  const valueString = value.toString()
  const dotPosition = valueString.indexOf('.')
  let precision = 0
  if (dotPosition !== -1)
    precision = valueString.length - dotPosition - 1

  return precision
}
