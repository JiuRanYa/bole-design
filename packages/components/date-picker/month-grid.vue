<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { computed, defineComponent, ref } from 'vue'
import { monthGridProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(dayOfYear)

defineOptions({
  name: 'MonthGrid'
})

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
  if (weekDay.value !== 1 && daysInMonth.value % 7 === 0) res += 1
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

function calcDate(day: string) {
  if (!props.value || !day) return ''
  return dayjs(`${props.value}-${day}`).format('YYYY-MM-DD')
}

defineExpose({ tableRef })
</script>

<template>
  <table :class="className" :aria-label="value" ref="tableRef">
    <thead :class="ns.be('title')">
      {{
        monthTitle
      }}
    </thead>
    <tbody :class="ns.bem('days', 'body')">
      <tr role="row" v-for="i in daysRowNum" :key="i">
        <td
          part="data"
          :aria-label="getDayAriaLabel(i, j)"
          :role="`${i},${j}`"
          v-for="j in 7"
          :class="{ 'current-date': now === calcDate(getDayAriaLabel(i, j)) }"
        >
          {{ getDayAriaLabel(i, j) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
