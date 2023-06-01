<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { computed, defineComponent } from 'vue'
import { monthGridProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(dayOfYear)

defineComponent({
  name: 'month-grid'
})

const ns = useNamespace('month-grid')
const _props = defineProps(monthGridProps)

const props = useProps('month-grid', _props, {
  value: '2023-6'
})

const monthTitle = computed(() => {
  return dayjs(props.value).format('YYYY年MM月')
})
const daysInMonth = computed(() => {
  return dayjs(props.value).daysInMonth() ?? 0
})
const daysRowNum = computed(() => {
  return Math.ceil(daysInMonth.value / 7)
})
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})

function getDayAriaLabel(row: number, cell: number) {
  const start = (row - 1) * 7
  const offsetValue = start + cell - weekDay.value + 1

  if (start === 0) {
    return start + cell < weekDay.value ? '' : `${offsetValue}`
  }
  return offsetValue <= daysInMonth.value ? `${offsetValue}` : ''
}

function getWeekDayByDate(date: string) {
  const year = dayjs(date).year()
  const whitchDay = dayjs(date).dayOfYear()
  let result =
    (year -
      1 +
      Math.floor((year - 1) / 4) -
      Math.floor((year - 1) / 100) +
      Math.floor((year - 1) / 400) +
      whitchDay) %
    7

  return result
}
const weekDay = computed(() => {
  return getWeekDayByDate(props.value)
})
</script>

<template>
  <table :class="className">
    <thead :class="ns.be('title')">
      {{
        monthTitle
      }}
    </thead>
    <tbody :class="ns.bem('days', 'body')">
      <tr role="row" v-for="i in daysRowNum" :key="i">
        <td part="data" :aria-label="getDayAriaLabel(i, j)" v-for="j in 7">
          {{ getDayAriaLabel(i, j) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
