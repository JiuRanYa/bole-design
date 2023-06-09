<script setup lang="ts">
import { useEventListener, useNamespace } from '@bole-design/hooks'
import { computed, nextTick, onMounted, ref } from 'vue'
import { OriginDate, calendarProps } from './props'
import { useProps } from '@bole-design/common'
import MonthGrid from './month-grid.vue'
import dayjs from 'dayjs'

defineOptions({
  name: 'DatePickerCalendar'
})
const _props = defineProps(calendarProps)

const ns = useNamespace('date-picker')
const props = useProps('calendar', _props, {
  value: ''
})
const renderDate = ref(initRenderDate())

const bufferRefTop = ref<HTMLElement>()
const bufferRefBot = ref<HTMLElement>()
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

  // 向上时需要的偏移量是数据改变前的高度,不需要等待渲染完毕
  increaseTrans(reserve)
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

  //向上时需要的偏移量是数据改变后的高度
  nextTick(() => {
    decreaseTrans(reserve)
  })
}

let lastScrollTop = 0
const topTranslate = ref(0.5e6)
const botTranslate = ref(0.5e6)

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

function scrollUpdate() {
  const scrollTop = calendarRef.value?.scrollTop ?? 0
  const calendarH = calendarRef.value?.offsetHeight ?? 0
  const bufferTopH = bufferRefTop.value?.offsetHeight ?? 0
  const botTrans = Math.max(topTranslate.value, botTranslate.value)

  const topLimit = Math.min(topTranslate.value, botTranslate.value)
  const botLimit = botTrans + bufferTopH - calendarH

  const shouldIncreaseTop = topTranslate.value < botTranslate.value ? true : false
  const shouldDecreaseTop = botTranslate.value < topTranslate.value ? true : false

  // 向下
  if (scrollTop > lastScrollTop) {
    scrollTop >= botLimit ? patchBackDate(shouldIncreaseTop) : null
  }
  // 向上
  if (scrollTop < lastScrollTop) {
    scrollTop <= topLimit ? patchFrontDate(shouldDecreaseTop) : null
  }

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

const emit = defineEmits(['pick'])

function handlePickDate(date: OriginDate) {
  emit('pick', date)
}

onMounted(() => {
  nextTick(() => {
    scrollToView()
    useEventListener(calendarRef, 'scroll', () => window.requestAnimationFrame(scrollUpdate))
  })
})
</script>

<template>
  <div :class="ns.be('calendar')" ref="calendarRef">
    <div :class="ns.bem('calendar', 'buffer')" :style="topTranslateStyle" ref="bufferRefTop">
      <MonthGrid
        v-for="date in renderDate.slice(0, 3)"
        :value="date"
        ref="monthRef"
        @pick="handlePickDate"
      />
    </div>
    <div :class="ns.bem('calendar', 'buffer')" :style="bottomTranslateStyle" ref="bufferRefBot">
      <MonthGrid
        v-for="date in renderDate.slice(3)"
        :value="date"
        ref="monthRef"
        @pick="handlePickDate"
      />
    </div>
    <div class="full-height" style="height: 1e6px"></div>
  </div>
</template>
