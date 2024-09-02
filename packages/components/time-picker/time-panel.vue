<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, watch } from 'vue'

import { useNamespace } from '@panda-ui/hooks'

import type { TimeState } from './symbol'
import TimeColumn from './time-column.vue'

const props = defineProps({
  hourStep: Number,
  minuteStep: Number,
  secondStep: Number,
  hour: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 23,
  },
  minute: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 59,
  },
  second: {
    type: Number,
    default: 0,
    validator: (value: number) => value >= 0 && value <= 59,
  },
  enabled: {
    type: Object as PropType<TimeState['enabled']>,
  },
})

const emit = defineEmits(['update:hour', 'update:minute', 'update:second', 'updateActivated'])

const ns = useNamespace('time-picker')

const showHour = ref(props.enabled?.hour)
const showMinute = ref(props.enabled?.minute)
const showSecond = ref(props.enabled?.second)

const currentHour = ref(props.hour)
const currentMinute = ref(props.minute)
const currentSecond = ref(props.second)

watch(
  () => props.hour,
  (value) => {
    currentHour.value = value
  },
)
watch(
  () => props.minute,
  (value) => {
    currentMinute.value = value
  },
)
watch(
  () => props.second,
  (value) => {
    currentSecond.value = value
  },
)
watch(currentHour, (value) => {
  emit('update:hour', value)
  emit('updateActivated', 'hour')
})
watch(currentMinute, (value) => {
  emit('update:minute', value)
  emit('updateActivated', 'minute')
})
watch(currentSecond, (value) => {
  emit('update:second', value)
  emit('updateActivated', 'second')
})
</script>

<template>
  <div :class="ns.be('list')">
    <TimeColumn v-if="showHour" v-model:value="currentHour" type="hour" :step="hourStep" />
    <TimeColumn v-if="showMinute" v-model:value="currentMinute" type="minute" :step="minuteStep" />
    <TimeColumn v-if="showSecond" v-model:value="currentSecond" type="second" :step="secondStep" />
  </div>
</template>

<style scoped>

</style>
