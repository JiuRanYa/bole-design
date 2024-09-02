<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, inject, reactive, ref, watch } from 'vue'
import { Button } from '@panda-ui/components'
import dayjs from 'dayjs'
import Input from '../input/input'
import TimePanel from '../time-picker/time-panel.vue'
import { datePickerPanelProps } from './props'
import DatePickerCalendar from './date-picker-calendar.vue'
import { config, weekDay } from './const'
import { DATE_PICKER_INJECTION_KEY } from './token'

defineOptions({
  name: 'DatePickerPanel',
})
const props = defineProps(datePickerPanelProps)

const emit = defineEmits(['confirm', 'cancel'])
const wrapper = ref()
const ns = useNamespace('date-picker')

const className = computed(() => {
  return [ns.be('panel'), ns.bs('vars')]
})

const root = inject(DATE_PICKER_INJECTION_KEY)

const startTime = reactive({
  hour: root?.startMeta.dateMeta.hour,
  minute: root?.startMeta.dateMeta.minute,
  second: root?.startMeta.dateMeta.second,
})
const endTime = reactive({
  hour: root?.endMeta.dateMeta.hour,
  minute: root?.endMeta.dateMeta.minute,
  second: root?.endMeta.dateMeta.second,
})

const startDate = ref(root?.startMeta.getDayjs().format(config.defaultFormat))
const endDate = ref(root?.endMeta.getDayjs().format(config.defaultFormat))

function validateDate(date: string) {
  return dayjs(date).isValid()
}

function setValidDate(date: string, isStart: boolean = true) {
  if (validateDate(date)) {
    const parsedDate = dayjs(date).format(config.defaultFormat)
    const method = isStart ? root?.startMeta : root?.endMeta

    method?.setDate(parsedDate)
  }
}

function confirmValue() {
  emit('confirm')
}
function handleCancel() {
  emit('cancel')
}

watch(
  () => startDate.value,
  () => {
    startDate.value && setValidDate(startDate.value)
  },
)
watch(
  () => endDate.value,
  () => {
    endDate.value && setValidDate(endDate.value, false)
  },
)
watch(
  () => startTime,
  (time) => {
    root?.startMeta.setDateMeta(time)
  },
  { deep: true },
)
watch(
  () => endTime,
  (time) => {
    root?.endMeta.setDateMeta(time)
  },
  { deep: true },
)

watch(
  () => root?.startMeta.dateMeta,
  () => {
    startDate.value = root?.startMeta.getDayjs().format(config.defaultFormat)
  },
  { deep: true },
)
watch(
  () => root?.endMeta.dateMeta,
  () => {
    endDate.value = root?.endMeta.getDayjs().format(config.defaultFormat)
  },
  { deep: true },
)

defineExpose({
  wrapper,
})
const showTime = computed(
  () => props.type === 'dateTime' || props.type === 'dateTimeRange',
)
const isTimeRange = computed(() => props.type === 'dateTimeRange')
</script>

<template>
  <div ref="wrapper" :class="className">
    <div v-if="typing" :class="ns.be('typing')">
      <Input v-model:value="startDate" placeholder="Start Date" />
      <Input v-model:value="endDate" placeholder="End Date" />
    </div>

    <div :class="ns.bm('list')">
      <div :class="ns.be('panels')">
        <div :class="ns.bem('data', 'panel')">
          <div :class="ns.bem('panel', 'body')">
            <div :class="ns.be('header')">
              <div
                v-for="i in weekDay"
                :key="i"
                :class="ns.bem('header', 'day')"
              >
                {{ i }}
              </div>
            </div>

            <DatePickerCalendar />
          </div>
        </div>

        <div
          v-if="showTime"
          :class="[ns.bem('time', 'panel'), { [ns.bem('time', 'range')]: isTimeRange }] "
        >
          <TimePanel
            v-model:hour="startTime.hour"
            v-model:minute="startTime.minute"
            v-model:second="startTime.second"
            :enabled="root?.startMeta.enabled"
          />
          <TimePanel
            v-if="isTimeRange"
            v-model:hour="endTime.hour"
            v-model:minute="endTime.minute"
            v-model:second="endTime.second"
            :enabled="root?.endMeta.enabled"
          />
        </div>
      </div>

      <div :class="ns.be('action')">
        <Button type="ghost" @click="handleCancel">
          取消
        </Button>
        <Button type="ghost" @click="confirmValue">
          确认
        </Button>
      </div>
    </div>
  </div>
</template>
