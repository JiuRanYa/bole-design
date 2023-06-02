<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed, defineComponent, nextTick, onMounted, ref } from 'vue'
import { calendarProps } from './props'
import { useProps } from '@bole-design/common'
import MonthGrid from './month-grid.vue'
import dayjs from 'dayjs'

defineComponent({
  name: 'date-picker-calendar'
})
const _props = defineProps(calendarProps)

const ns = useNamespace('date-picker')
const props = useProps('calendar', _props, {
  value: ''
})
const renderDate = ref(['2023-04', '2023-05', '2023-06', '2023-07', '2023-08', '2023-09'])
const renderDateMap = computed<Record<string, any>>(() => {
  return renderDate.value.reduce((res, date, idx) => {
    res[date] = idx
    return res
  }, {} as any)
})

const monthRef = ref<InstanceType<typeof MonthGrid>[]>()

function generateRenderDate(date: string) {
  const res = []

  for (let i = 0; i < renderDate.value.length / 2; i++) {
    res.unshift(
      dayjs(date)
        .subtract(i + 1, 'month')
        .format('YYYY-MM')
    )
  }

  return res
}
function refreshRenderDate(idx: number) {
  const currentDate = renderDate.value[idx]

  if (idx === 0) {
    const appendDate = generateRenderDate(currentDate)
    const temp = [...renderDate.value]
    const len = temp.length

    for (let i = 0; i < len / 2; i++) {
      temp.pop()
    }
    renderDate.value = [...appendDate, ...temp]

    nextTick(() => {
      calendarRef.value.scrollTo(0, monthRef.value?.[2].tableRef?.offsetTop)
    })
  }
}

function guardMonthView() {
  const observe = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio == 1) {
          const el = entry.target
          const val = el.getAttribute('aria-label')

          if (val) {
            const idx = val ? renderDateMap.value[val] : val
            refreshRenderDate(idx)
          }
        }
      })
    },
    { threshold: [0, 1] }
  )

  monthRef.value?.forEach((instance, idx) => {
    const table = instance?.tableRef

    if (idx === 2) {
      calendarRef.value.scrollTo(0, table?.offsetTop ?? 0 - 30)
    }
    table && observe.observe(table)
  })
}
const calendarRef = ref()
onMounted(() => {
  nextTick(() => {
    guardMonthView()
  })
})
</script>

<template>
  <div :class="ns.be('calendar')" ref="calendarRef">
    <MonthGrid v-for="date in renderDate" :value="date" ref="monthRef" />
  </div>
</template>
