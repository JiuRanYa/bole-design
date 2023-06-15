<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { computed, inject, ref } from 'vue'
import { DateCell, monthGridProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import dayjs, { Dayjs } from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import { config } from './const'
import { DATE_PICKER_INJECTION_KEY } from '@bole-design/tokens/date-picker'

dayjs.extend(dayOfYear)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

defineOptions({
  name: 'MonthGrid'
})

const rootValue = inject(DATE_PICKER_INJECTION_KEY)
const emit = defineEmits(['pick'])
const ns = useNamespace('month-grid')

const _props = defineProps(monthGridProps)
const props = useProps('month-grid', _props, {
  value: ''
})

const tableRef = ref<HTMLElement>()
const now = dayjs().format(config.defaultFormat)

const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const monthTitle = computed(() => {
  return dayjs(props.value).format('YYYY年MM月')
})
// 该月有多少天
const daysInMonth = computed(() => {
  return dayjs(props.value).daysInMonth() ?? 0
})
// 该月第一天是星期几, 0为周日
const weekDay = computed(() => {
  return getWeekDayByDate(props.value)
})
// 该月需要渲染多少行
const daysRowNum = computed(() => {
  let res = Math.ceil(daysInMonth.value / 7)
  if (weekDay.value === 0 || daysInMonth.value % 7 === 0) res += 1
  return res
})
const rows = computed(() => {
  const rowsNum = daysRowNum.value ?? 0
  const rows_: DateCell[][] = Array.from({ length: daysRowNum.value }, () => [])

  for (let i = 0; i < rowsNum; i++) {
    for (let j = 0; j < 7; j++) {
      const day = getDayAriaLabel(i + 1, j + 1)
      const dayjs_ = dayjs(`${props.value}-${day}`)
      const dateStr = day ? dayjs_.format(config.defaultFormat) : ''

      rows_[i].push({
        rowIndex: i,
        cellIndex: j,
        text: day,
        isCurrent: rootValue?.currentValue.value === dateStr,
        date: dayjs_!.toDate(),
        dayjs: dayjs_,
        dateStr
      })
    }
  }

  return rows_
})

function getDayAriaLabel(row: number, cell: number) {
  let start = (row - 1) * 7
  let day = start + cell - weekDay.value + 1

  // when weekDay equals to 0, it mains Sunday, offset add one
  if (weekDay.value === 0) {
    if (start === 0) {
      return cell === 7 ? '1' : ''
    }
    start = (row - 2) * 7 + 1
    day = start + cell
  }

  return day <= daysInMonth.value && day > 0 ? `${day}` : ''
}

function getWeekDayByDate(date: string) {
  return dayjs(date).day()
}

const startState = ref()
const endState = ref()
const startFormatDate = computed(() => {
  return dayjs(
    `${startState.value?.year}-${startState.value?.month}-${startState.value?.day}`
  ).format(config.defaultFormat)
})
const endFormatDate = computed(() => {
  return dayjs(`${endState.value?.year}-${endState.value?.month}-${endState.value?.day}`).format(
    config.defaultFormat
  )
})
function calcEmitValue(date: Dayjs) {
  return {
    year: date.year(),
    month: date.month() + 1,
    day: date.date()
  }
}
function handlePickDate(e: Event) {
  const target = (e.target as HTMLElement).closest('td')

  if (!target || target.tagName !== 'TD' || !target.ariaLabel) return

  const day = target.ariaLabel
  const date = dayjs(`${props.value}-${day}`)
  const emitValue = calcEmitValue(date)
  const isRange = rootValue?.isRange.value

  if (!isRange) {
    emit('pick', emitValue)
  }

  if (isRange) {
    if (!startState.value || (startState.value && endState.value)) {
      startState.value = emitValue
      endState.value = null
      return
    }
    if (!endState.value) {
      endState.value = emitValue
      if (dayjs(endFormatDate.value).isSameOrBefore(startFormatDate.value)) {
        ;[startState.value, endState.value] = [endState.value, startState.value]
      }
      return
    }
  }
}
function isInRange(date: DateCell['dateStr']) {
  return dayjs(date).isBetween(startFormatDate.value, endFormatDate.value)
}

function getCellClass(cell: DateCell) {
  const dateStr = cell.dateStr

  console.log(rootValue?.currentValue.value)

  return {
    today: now === dateStr,
    selected: cell.dateStr === rootValue?.currentValue.value,
    start: cell.dateStr === startFormatDate.value,
    end: cell.dateStr === endFormatDate.value,
    'in-range': isInRange(cell.dateStr)
  }
}
defineExpose({ tableRef })
</script>

<template>
  <table :class="className" :aria-label="value" ref="tableRef" @click="handlePickDate">
    <thead :class="ns.be('title')">
      {{
        monthTitle
      }}
    </thead>
    <tbody :class="ns.bem('days', 'body')">
      <tr role="row" v-for="(row, idx) in rows" :key="idx">
        <td part="data" v-for="cell in row" :class="getCellClass(cell)" :aria-label="cell.text">
          {{ cell.text }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
