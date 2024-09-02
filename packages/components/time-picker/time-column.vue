<script setup lang="ts">
import type { PropType } from 'vue'
import { onMounted, ref, watch } from 'vue'

import { useNamespace } from '@panda-ui/hooks'
import { doubleDigits, range, toCapitalCase } from '@panda-ui/common'

import { ScrollArea } from '../scroll-area'
import type { TimeType } from './symbol'

const props = defineProps({
  value: {
    type: Number,
  },
  type: String as PropType<TimeType>,
  step: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:value'])
const ns = useNamespace('time-picker__column')

const data = ref<number[]>()
const cellsRef = ref<HTMLLIElement[]>()
const scrollRef = ref()
const currentValue = ref(props.value)

function initDate() {
  const len = props.type === 'hour' ? 24 : 60
  data.value = range(len / props.step, 0, props.step)

  scrollToActive()
}

function scrollToActive() {
  const idx = data.value?.findIndex(item => item === currentValue.value)

  if (!currentValue.value || idx === -1 || !idx || !scrollRef.value)
    return

  scrollRef.value.scrollTo({
    top: cellsRef.value![idx].offsetTop,
  })
}
function setTimeValue(value: number) {
  setValue(value)
  scrollToActive()
}
function setValue(value: number) {
  currentValue.value = value
  emit('update:value', value)
}

function getCellActiveClass(value: number) {
  return currentValue.value === value ? ns.bem('cell', 'active') : ''
}

watch(() => props.step, initDate, { immediate: true })

watch(() => props.value, value => setTimeValue(value!))

onMounted(() => {
  scrollToActive()
})
</script>

<template>
  <div :class="ns.b()">
    <div :class="ns.be('title')">
      {{ toCapitalCase(type!) }}
    </div>
    <ScrollArea ref="scrollRef" :class="ns.be('wrapper')" height="calc(100% - 40px)">
      <li
        v-for="i in data"
        ref="cellsRef"
        :key="i"
        :class="[ns.be('cell'), getCellActiveClass(i)]"
        @click="setTimeValue(i)"
      >
        <div :class="ns.bem('cell', 'inner')">
          {{ doubleDigits(i) }}
        </div>
      </li>
    </ScrollArea>
  </div>
</template>

<style scoped></style>
