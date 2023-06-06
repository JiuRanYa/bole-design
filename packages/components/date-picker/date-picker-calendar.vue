<script setup lang="ts">
import { useEventListener, useNamespace } from '@bole-design/hooks'
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
const renderDate = ref(initRenderDate())

const bufferRef = ref<HTMLDivElement>()
const calendarRef = ref<HTMLDivElement>()
const monthRef = ref<InstanceType<typeof MonthGrid>[]>()

function initRenderDate() {
  const currentDate = props.value ? props.value : dayjs().format('YYYY-MM')

  const front = calculateMonthFront(currentDate, 3)
  const back = calculateMonthBack(currentDate, 2)

  return [...front, currentDate, ...back]
}
function calculateMonthFront(date: string, len = renderDate.value.length / 2) {
  const res = []

  for (let i = 0; i < len; i++) {
    res.unshift(
      dayjs(date)
        .subtract(i + 1, 'month')
        .format('YYYY-MM')
    )
  }

  return res
}

function calculateMonthBack(date: string, len = renderDate.value.length / 2) {
  const res = []

  for (let i = 0; i < len; i++) {
    res.push(
      dayjs(date)
        .add(i + 1, 'month')
        .format('YYYY-MM')
    )
  }

  return res
}
function patchBackDate(reserve: boolean) {
  const idx = reserve ? 5 : 2
  const currentDate = renderDate.value[idx]

  const appendDate = calculateMonthBack(currentDate)
  const temp = [...renderDate.value]
  const len = temp.length

  for (let i = 0; i < len / 2; i++) {
    reserve ? temp.shift() : temp.pop()
  }
  renderDate.value = reserve ? [...appendDate, ...temp] : [...temp, ...appendDate]
}

function patchFrontDate(reserve: boolean) {
  const idx = reserve ? 3 : 0
  const currentDate = renderDate.value[idx]

  const appendDate = calculateMonthFront(currentDate)
  const temp = [...renderDate.value]
  const len = temp.length

  for (let i = 0; i < len / 2; i++) {
    reserve ? temp.shift() : temp.pop()
  }
  renderDate.value = reserve ? [...appendDate, ...temp] : [...temp, ...appendDate]
}

const topOffset = ref(0)
const botOffset = ref(1)

const topTranslate = computed(() => {
  return 0.5e6 + bufferHeight.value * topOffset.value
})
const botTranslate = computed(() => {
  return 0.5e6 + bufferHeight.value * botOffset.value
})
const topTranslateStyle = computed(() => {
  return {
    transform: `translate3D(0, ${topTranslate.value}px, 0)`
  }
})
const bottomTranslateStyle = computed(() => {
  return {
    transform: `translate3D(0, ${botTranslate.value}px, 0)`
  }
})
const bufferHeight = computed(() => {
  return bufferRef.value ? bufferRef.value.offsetHeight : 0
})

let lastScrollTop = 0
function scrollUpdate() {
  const scrollTop = calendarRef.value?.scrollTop ?? 0
  const botTrans = Math.max(topTranslate.value, botTranslate.value)
  const calendarH = calendarRef.value ? calendarRef.value.offsetHeight : 0
  const botLimit = botTrans + (3 - calendarH / 231) * 231
  const topLimit = Math.min(topTranslate.value, botTranslate.value)
  const shouldIncreaseTop = topTranslate.value < botTranslate.value ? true : false
  const shouldDecreaseTop = botTranslate.value < topTranslate.value ? true : false

  // 向下
  if (scrollTop > lastScrollTop) {
    if (scrollTop >= botLimit) {
      shouldIncreaseTop ? (topOffset.value += 2) : (botOffset.value += 2)
      patchBackDate(shouldIncreaseTop)
    }
  }
  // 向上
  if (scrollTop < lastScrollTop) {
    if (scrollTop <= topLimit) {
      shouldDecreaseTop ? (topOffset.value -= 2) : (botOffset.value -= 2)
      patchFrontDate(shouldDecreaseTop)
    }
  }

  lastScrollTop = scrollTop
}
onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      calendarRef.value?.scrollTo(0, topTranslate.value + bufferHeight.value)
    }, 0)
    useEventListener(calendarRef, 'scroll', () => window.requestAnimationFrame(scrollUpdate))
  })
})
</script>

<template>
  <div :class="ns.be('calendar')" ref="calendarRef">
    <div :class="ns.bem('calendar', 'buffer')" :style="topTranslateStyle">
      <MonthGrid v-for="date in renderDate.slice(0, 3)" :value="date" ref="monthRef" />
    </div>
    <div :class="ns.bem('calendar', 'buffer')" :style="bottomTranslateStyle" ref="bufferRef">
      <MonthGrid v-for="date in renderDate.slice(3)" :value="date" ref="monthRef" />
    </div>
    <div class="full-height" style="height: 1e6px"></div>
  </div>
</template>
