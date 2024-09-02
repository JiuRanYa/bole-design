import type { Ref } from 'vue'
import { reactive, ref } from 'vue'

const numberKeys = Array.from({ length: 10 }, (_, i) => i) as Digit[]
type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

function isNumberKey(key: string, num: Digit) {
  return key === `Digit${num}` || key === `Numpad${num}` || key === `${num}`
}

export function handleKeyEnter(event: KeyboardEvent) {
  const key = event.code || event.key

  let type: null | number | 'next' | 'prev' | 'up' | 'down' | 'ok' | 'esc' = null
  let isMatch = false

  switch (key) {
    case 'Tab': {
      isMatch = true
      type = event.shiftKey ? 'prev' : 'next'
      break
    }
    case 'ArrowRight': {
      // 下一列
      isMatch = true
      type = 'next'
      break
    }
    case 'Delete':
    case 'ArrowLeft': {
      // 上一列
      isMatch = true
      type = 'prev'
      break
    }
    case 'ArrowUp': {
      // 加一
      isMatch = true
      type = 'up'
      break
    }
    case 'ArrowDown': {
      // 减一
      isMatch = true
      type = 'down'
      break
    }
    case 'Space':
    case ' ':
    case 'Enter':
    case 'NumpadEnter': {
      // 确认
      isMatch = true
      type = 'ok'
      break
    }
    case 'Escape': {
      // 取消
      isMatch = true
      type = 'esc'
      break
    }
  }

  if (isMatch) {
    event.preventDefault()
    event.stopPropagation()
  }
  else {
    // 键入数字
    const inputtedNumber = numberKeys.findIndex(num => isNumberKey(key, num))

    if (~inputtedNumber) {
      type = inputtedNumber

      event.preventDefault()
      event.stopPropagation()
    }
  }

  return type
}

export function useColumn<T extends string>(columns: T[], currentColumn = ref(columns[0]) as Ref<T | null>) {
  const enabled = reactive(
    columns.reduce((res, col) => {
      res[col] = false
      return res
    }, {} as any),
  ) as Record<T, boolean>

  const columnsLen = columns.length

  function findEnabledColumn(types: T[]) {
    currentColumn.value = types.find(type => enabled[type]) ?? currentColumn.value
  }

  function resetColumn(type?: T | null, reverse = false) {
    if (!type)
      currentColumn.value = null

    const types = reverse ? Array.from(columns).reverse() : columns
    const index = types.findIndex(column => column === type)

    if (~index)
      findEnabledColumn(types.slice(index, columnsLen).concat(types.slice(0, index)))
    else
      findEnabledColumn(types)
  }

  function enterColumn(type: 'prev' | 'next', canLoop: boolean = true) {
    if (!currentColumn.value)
      currentColumn.value = (type === 'next' ? columns[columnsLen - 1] : columns[0]) ?? null

    for (let i = 0; i < columnsLen; ++i) {
      // 找到当前column后重新排序
      if (currentColumn.value === columns[i]) {
        const rawTypes = type === 'prev' ? Array.from(columns).reverse() : columns
        const nextIndex = (type === 'prev' ? columnsLen - i : i + 1) % columnsLen

        const types = canLoop
          ? rawTypes.slice(nextIndex, columnsLen).concat(rawTypes.slice(0, nextIndex))
          : nextIndex
            ? rawTypes.slice(nextIndex, columnsLen)
            : []

        findEnabledColumn(types)

        break
      }
    }
  }

  return {
    enabled,
    resetColumn,
    currentColumn,
    enterColumn,
  }
}
