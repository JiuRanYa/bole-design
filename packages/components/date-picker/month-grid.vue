<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { computed, ref } from 'vue'
import { monthGridProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(dayOfYear)

defineOptions({
  name: 'MonthGrid'
})

const emit = defineEmits(['pick'])
const ns = useNamespace('month-grid')

const _props = defineProps(monthGridProps)
const props = useProps('month-grid', _props, {
  value: ''
})

const tableRef = ref<HTMLElement>()
const now = dayjs().format('YYYY-MM-DD')

const monthTitle = computed(() => {
  return dayjs(props.value).format('YYYY年MM月')
})
const daysInMonth = computed(() => {
  return dayjs(props.value).daysInMonth() ?? 0
})
const daysRowNum = computed(() => {
  let res = Math.ceil(daysInMonth.value / 7)
  if (weekDay.value === 0 || daysInMonth.value % 7 === 0) res += 1
  return res
})
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const weekDay = computed(() => {
  return getWeekDayByDate(props.value)
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

function calcDateByDay(day: string) {
  if (!props.value || !day) return ''
  return dayjs(`${props.value}-${day}`).format('YYYY-MM-DD')
}
function handlePickDate(e: Event) {
  const target = (e.target as HTMLElement).closest('td')

  if (!target || target.tagName !== 'TD' || !target.ariaLabel) return

  const day = target.ariaLabel
  const date = dayjs(`${props.value}-${day}`)

  const emitValue = {
    year: date.year(),
    month: date.month() + 1,
    day: date.date()
  }
  emit('pick', emitValue)
}
function getCellClass(row: number, col: number) {
  const res = []
  const date = calcDateByDay(getDayAriaLabel(row, col))

  if (now === date) {
    res.push('today')
  }

  if (selectedDate.value === date) {
    res.push('selected')
  }

  return res
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
      <tr role="row" v-for="i in daysRowNum" :key="i" :aria-rowindex="i">
        <td
          part="data"
          :aria-label="getDayAriaLabel(i, j)"
          v-for="j in 7"
          :class="getCellClass(i, j)"
          :aria-colindex="j"
        >
          {{ getDayAriaLabel(i, j) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
