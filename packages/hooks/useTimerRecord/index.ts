import { useSetInterval } from '../useSetInterval'
import { useSetTimeout } from '../useSetTimeout'

/**
 * 获取三个分别用于记录 `setTimeout`、`setInterval` 和 `requestAnimationFrame` 返回值的对象
 *
 * 记录在这些对象上的定时器将会在作用域消除时自动清理
 */
export function useTimerRecord() {
  const { timer: timeout } = useSetTimeout()
  const { timer: interval } = useSetInterval()

  return { timeout, interval }
}
