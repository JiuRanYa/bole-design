<script setup lang="ts">
import { useEventListener, useNamespace } from '@panda-ui/hooks'
import { computed, inject, nextTick, onMounted, ref } from 'vue'
import { useProps } from '@panda-ui/common'
import dayjs from 'dayjs'
import { calendarProps } from './props'
import MonthGrid from './month-grid.vue'
import { DATE_PICKER_INJECTION_KEY } from './token'

defineOptions({
  name: 'DatePickerCalendar',
})
const _props = defineProps(calendarProps)

// requestAnimationFrame frame task has down
let ticking = false
const ns = useNamespace('date-picker')
useProps('calendar', _props, {
  value: '',
})
const renderDate = ref()

const rootValue = inject(DATE_PICKER_INJECTION_KEY)
const bufferRefTop = ref<HTMLElement>()
const bufferRefBot = ref<HTMLElement>()
const calendarRef = ref<HTMLDivElement>()
const monthRef = ref<InstanceType<typeof MonthGrid>[]>()

function initRenderDate() {
  const startDate = rootValue?.startMeta.getDate()
  const currentDate = dayjs(startDate).format('YYYY-MM')

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
        .format('YYYY-MM'),
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
        .format('YYYY-MM'),
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

  for (let i = 0; i < len / 2; i++)
    reserve ? temp.shift() : temp.pop()

  renderDate.value = reserve ? [...appendDate, ...temp] : [...temp, ...appendDate]

  // 向上时需要的偏移量是数据改变前的高度,不需要等待渲染完毕
  increaseTrans(reserve)
}

function patchFrontDate(reserve: boolean) {
  const idx = reserve ? 3 : 0
  const currentDate = renderDate.value[idx]

  const appendDate = calculateMonthFront(currentDate)
  const temp = [...renderDate.value]
  const len = temp.length

  for (let i = 0; i < len / 2; i++)
    reserve ? temp.shift() : temp.pop()

  renderDate.value = reserve ? [...appendDate, ...temp] : [...temp, ...appendDate]

  // 向上时需要的偏移量是数据改变后的高度,需要等待渲染完毕
  nextTick(() => {
    decreaseTrans(reserve)
  })
}

let lastScrollTop = 0
const topTranslate = ref(0.5e6)
const botTranslate = ref(0.5e6)

const topTranslateStyle = computed(() => {
  return {
    transform: `translate3D(0, ${topTranslate.value}px, 0)`,
  }
})
const bottomTranslateStyle = computed(() => {
  return {
    transform: `translate3D(0, ${botTranslate.value}px, 0)`,
  }
})

function scrollStep() {
  if (!ticking)
    requestAnimationFrame(scrollUpdate)

  ticking = true
}

function scrollUpdate() {
  const scrollTop = calendarRef.value?.scrollTop ?? 0
  const calendarH = calendarRef.value?.offsetHeight ?? 0
  const bufferTopH = bufferRefTop.value?.offsetHeight ?? 0
  const botTrans = Math.max(topTranslate.value, botTranslate.value)

  const topLimit = Math.min(topTranslate.value, botTranslate.value)
  const botLimit = botTrans + bufferTopH - calendarH

  const shouldIncreaseTop = topTranslate.value < botTranslate.value
  const shouldDecreaseTop = botTranslate.value < topTranslate.value

  // 向下
  if (scrollTop > lastScrollTop && scrollTop >= botLimit)
    patchBackDate(shouldIncreaseTop)

  // 向上
  if (scrollTop < lastScrollTop && scrollTop <= topLimit)
    patchFrontDate(shouldDecreaseTop)

  ticking = false
  lastScrollTop = scrollTop
}

function increaseTrans(isTop: boolean) {
  const target = isTop ? topTranslate : botTranslate
  const topBufferHeight = bufferRefTop.value?.offsetHeight ?? 0
  const botBufferHeight = bufferRefBot.value?.offsetHeight ?? 0

  target.value = target.value + topBufferHeight + botBufferHeight
}
function decreaseTrans(isTop: boolean) {
  const target = isTop ? topTranslate : botTranslate
  const topBufferHeight = bufferRefTop.value?.offsetHeight ?? 0
  const botBufferHeight = bufferRefBot.value?.offsetHeight ?? 0

  target.value = target.value - topBufferHeight - botBufferHeight
}

function scrollToView() {
  const bufferHeightTop = bufferRefTop.value?.offsetHeight ?? 0

  calendarRef.value?.scrollTo(0, topTranslate.value + bufferHeightTop)
  botTranslate.value = topTranslate.value + (bufferRefTop.value?.offsetHeight ?? 0)
}

onMounted(() => {
  renderDate.value = initRenderDate()
  nextTick(() => {
    scrollToView()
    useEventListener(calendarRef, 'scroll', scrollStep)
  })
})
</script>

<template>
  <div ref="calendarRef" :class="ns.be('calendar')">
    <div ref="bufferRefTop" :class="ns.bem('calendar', 'buffer')" :style="topTranslateStyle">
      <MonthGrid
        v-for="date in renderDate?.slice(0, 3)"
        :key="date"
        ref="monthRef"
        :value="date"
      />
    </div>
    <div ref="bufferRefBot" :class="ns.bem('calendar', 'buffer')" :style="bottomTranslateStyle">
      <MonthGrid
        v-for="date in renderDate?.slice(3)"
        :key="date"
        ref="monthRef"
        :value="date"
      />
    </div>
    <div class="full-height" style="height: 1e6px" />
  </div>
</template>
