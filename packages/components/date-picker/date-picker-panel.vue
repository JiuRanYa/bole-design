<script setup lang="ts">
import { config, weekDay } from './const'
import { useNamespace } from '@panda-ui/hooks'
import { computed, inject, ref, watch } from 'vue'
import DatePickerCalendar from './date-picker-calendar.vue'
import { OriginDate, datePickerPanelProps } from './props'
import { Button } from '@panda-ui/components'
import { DATE_PICKER_INJECTION_KEY } from '@panda-ui/tokens/date-picker'
import Input from '../input/input'
import dayjs from 'dayjs'

defineOptions({
  name: 'DatePickerPanel'
})
defineProps(datePickerPanelProps)

const wrapper = ref()
const ns = useNamespace('date-picker')

const className = computed(() => {
  return [ns.be('panel'), ns.bs('vars')]
})

const emit = defineEmits(['pick', 'confirm', 'cancel'])
const root = inject(DATE_PICKER_INJECTION_KEY)

function handlePickValue(date: OriginDate) {
  emit('pick', date)
}

function confirmValue() {
  if (root?.currentValue.value.length && root.isRange) {
    const value = [root.startMeta.getDate(), root.endMeta.getDate()]
    root?.updateModelValue(value)
  }
  emit('confirm')
}
function handleCancel() {
  emit('cancel')
}

defineExpose({
  wrapper
})

const startDate = ref(root?.startMeta.getDayjs().format(config.defaultFormat))
const endDate = ref(root?.endMeta.getDayjs().format(config.defaultFormat))
const rootStartDate = computed(() => root?.startMeta.getDayjs().format(config.defaultFormat))
const rootEndDate = computed(() => root?.endMeta.getDayjs().format(config.defaultFormat))

function validateDate(date: string) {
  return dayjs(date).isValid()
}
function setValidStartDate(date: string, isStart: boolean = true) {
  if (validateDate(date)) {
    const parsedDate = dayjs(date).format(config.defaultFormat)
    const method = isStart ? root?.startMeta : root?.endMeta

    method?.setDate(parsedDate)
  }
}
watch(
  () => startDate.value,
  () => {
    startDate.value && setValidStartDate(startDate.value)
  }
)
watch(
  () => endDate.value,
  () => {
    endDate.value && setValidStartDate(endDate.value, false)
  }
)
watch(
  () => rootStartDate.value,
  () => {
    if (root?.startMeta.extraMeta.allocated) {
      // startDate.value = rootStartDate.value
    }
  }
)
</script>

<template>
  <div :class="className" ref="wrapper">
    <div v-if="typing" :class="ns.be('typing')">
      <Input placeholder="Start Date" v-model:value="startDate" />
      <Input placeholder="End Date" v-model:value="endDate" />
    </div>

    <div :class="ns.bm('list')">
      <div :class="ns.bem('panel', 'body')">
        <div :class="ns.be('header')">
          <div v-for="i in weekDay" :class="ns.bem('header', 'day')">{{ i }}</div>
        </div>
        <DatePickerCalendar @pick="handlePickValue" />
      </div>
      <div :class="ns.be('action')">
        <Button type="ghost" @click="handleCancel">取消</Button>
        <Button type="ghost" @click="confirmValue"> 确认 </Button>
      </div>
    </div>
  </div>
</template>
