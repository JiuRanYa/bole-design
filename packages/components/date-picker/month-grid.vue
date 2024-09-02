<script setup lang="ts">
import { useProps } from '@panda-ui/common'
import { computed, inject, ref } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import isBetween from 'dayjs/plugin/isBetween.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import { monthGridProps } from './props'
import type { DateCell } from './props'
import { config } from './const'
import { DATE_PICKER_INJECTION_KEY } from './token'

defineOptions({
  name: 'MonthGrid',
})
const _props = defineProps(monthGridProps)
dayjs.extend(dayOfYear)
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)

const rootValue = inject(DATE_PICKER_INJECTION_KEY)!
const ns = useNamespace('month-grid')

const props = useProps('month-grid', _props, {
  value: '',
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
  if (weekDay.value === 0 || daysInMonth.value % 7 === 0)
    res += 1
  return res
})
const startDate = computed(() => {
  return new Date(rootValue.startMeta.dateMeta.year, rootValue.startMeta.dateMeta.month, rootValue.startMeta.dateMeta.day)
})
const endDate = computed(() => {
  return new Date(rootValue.endMeta.dateMeta.year, rootValue.endMeta.dateMeta.month, rootValue.endMeta.dateMeta.day)
})
const startAllocated = computed(() => {
  return rootValue?.startMeta.extraMeta.allocated
})
const endAllocated = computed(() => {
  return rootValue?.endMeta.extraMeta.allocated
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
        date: day ? dayjs_!.toDate() : undefined,
        dayjs: dayjs_,
        dateStr,
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
    if (start === 0)
      return cell === 7 ? '1' : ''

    start = (row - 2) * 7 + 1
    day = start + cell
  }

  return day <= daysInMonth.value && day > 0 ? `${day}` : ''
}

function getWeekDayByDate(date: string) {
  return dayjs(date).day()
}
function sameDay(d1?: Date, d2?: Date) {
  if (!d1 || !d2)
    return false

  return d1.getFullYear() === d2.getFullYear()
    && d1.getMonth() === d2.getMonth()
    && d1.getDate() === d2.getDate()
}

function handlePickDate(e: Event) {
  const target = (e.target as HTMLElement).closest('td')

  if (!target || target.tagName !== 'TD' || !target.ariaLabel)
    return

  const day = target.ariaLabel
  const date = dayjs(`${props.value}-${day}`)

  // 如果不是范围选择终止
  if (!rootValue.isRange.value) {
    rootValue?.startMeta.setDateMeta({
      year: date.get('year'),
      month: date.get('month'),
      day: date.get('date'),
    })

    return
  }

  // 如果全部指派, 重置
  if (startAllocated.value && endAllocated.value) {
    rootValue.startMeta.extraMeta.allocated = false
    rootValue.endMeta.extraMeta.allocated = false
  }

  // 分别指派开始时间和结束时间
  if (!rootValue?.startMeta.extraMeta.allocated) {
    rootValue?.startMeta.setDateMeta({
      year: date.get('year'),
      month: date.get('month'),
      day: date.get('date'),
    })
    rootValue.startMeta.extraMeta.allocated = true

    return
  }
  if (!rootValue?.endMeta.extraMeta.allocated) {
    rootValue?.endMeta.setDateMeta({
      year: date.get('year'),
      month: date.get('month'),
      day: date.get('date'),
    })
    rootValue.endMeta.extraMeta.allocated = true
  }
}
function isInRange(date: DateCell['dateStr']) {
  return (
    startAllocated.value
    && endAllocated.value
    && dayjs(date).isBetween(startDate.value, endDate.value, null, '[)')
  )
}
function isStartDate(date: DateCell['dateStr']) {
  return (
    startAllocated.value
    && endAllocated.value
    && isInRange(date)
    && dayjs(date).startOf('month').format(config.defaultFormat) === date
  )
}
function isEndDate(date: DateCell['dateStr']) {
  return (
    startAllocated.value
    && endAllocated.value
    && isInRange(date)
    && dayjs(date).endOf('month').format(config.defaultFormat) === date
  )
}
function getCellClass(cell: DateCell, row: DateCell[], currentIdx: number) {
  const dateStr = cell.dateStr

  const start = (cell: DateCell) => sameDay(cell.date, startDate.value) && startAllocated.value
  const end = (cell: DateCell) => sameDay(cell.date, endDate.value) && endAllocated.value
  const selected = cell.dateStr === rootValue?.currentValue.value

  const isBeforeStartRange = () => {
    if (currentIdx < row.findIndex(cell => end(cell)) && row.every(cell => !start(cell)) && !cell.dateStr)
      return true

    return row.find(cell => isStartDate(cell.dateStr))
      && !cell.dateStr
      && row.every(cell => !start(cell)
      && !isEndDate(cell.dateStr))
  }

  return {
    'today': now === dateStr,
    'selected': selected,
    'start': start(cell),
    'end': end(cell),
    'in-range': isInRange(cell.dateStr),
    'is-end': isEndDate(cell.dateStr),
    'before-range': isBeforeStartRange(),
  }
}

defineExpose({ tableRef })
</script>

<template>
  <table ref="tableRef" :class="className" :aria-label="value" @click="handlePickDate">
    <thead :class="ns.be('title')">
      {{
        monthTitle
      }}
    </thead>
    <tbody :class="ns.bem('days', 'body')">
      <tr v-for="(row, idx) in rows" :key="idx" role="row">
        <td v-for="(cell, i) in row" :key="cell.dateStr" part="data" :class="getCellClass(cell, row, i)" :aria-label="cell.text">
          {{ cell.text }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
