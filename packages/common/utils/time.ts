/**
 * 将小于 10 整数 N 变成 `0N` 的字符串，方法不会对入参校验
 *
 * @param number 需要处理的整数
 */
export function doubleDigits(number: number) {
  return number < 10 ? `0${number}` : number.toString()
}

export const TIME_REG = /^(\d{1,2})(:\d{1,2})?(:\d{1,2})?$/
