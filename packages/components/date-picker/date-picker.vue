<script setup lang="ts">
import { useClickOutside, useNamespace, usePopper } from '@panda-ui/hooks'
import { computed, provide, reactive, ref, toRef, watch } from 'vue'
import type { PopperExposed } from '@panda-ui/components'
import { Popper } from '@panda-ui/components'
import type {
  Dateable,
} from '@panda-ui/common'
import {
  emitEvent,
  isString,
  placementWhiteList,
  useIcons,
  useProps,
  useZIndex,
} from '@panda-ui/common'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { Icon } from '../icon'
import { ButtonGroup } from '../button-group'
import { Button } from '../button'
import { useColumn } from '../time-picker/helper'
import { config } from './const'
import { datePickerProps } from './props'
import type { DateMeta } from './props'
import DatePickerPanel from './date-picker-panel.vue'
import { DATE_PICKER_INJECTION_KEY } from './token'

defineOptions({
  name: 'DatePicker',
})

const _props = defineProps(datePickerProps)

const emit = defineEmits(['update:value'])

dayjs.extend(customParseFormat)

const props = useProps('date-picker', _props, {
  placement: {
    default: 'bottom-start',
    validator: value => placementWhiteList.includes(value),
  },
  value: '',
  transitionName: () => ns.ns('drop'),
  presets: {},
  type: 'static',
  valueFormat: '',
  format: 'YMD Hms',
  typing: null,
  to: '',
})
const ns = useNamespace('date-picker')
const icons = useIcons()

const isRange = computed(() => {
  return props.type === 'range' || props.type === 'dateTimeRange'
})

const panelRef = ref()
const popperRef = ref<PopperExposed>()

const panelEle = computed(() => panelRef.value?.wrapper)
const popperEl = computed(() => popperRef.value?.wrapper)

const visible = ref(false)
const startMeta = createDateMeta(0)
const endMeta = createDateMeta(1)

const isTime = computed(() => props.type === 'dateTime' || props.type === 'dateTimeRange')
const currentValue = computed(() => {
  const values = [startMeta, endMeta].map((state) => {
    const format = getValueFormat()
    const values = state.getDate()

    return dayjs(values).format(format)
  })

  return isRange.value ? values : values[0]
})

const placement = toRef(props, 'placement')

const popperClass = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    ns.be('popper'),
    {
      [ns.bm('inherit')]: props.inherit,
    },
  ]
})

const { reference, transferTo, updatePopper } = usePopper({
  popper: popperEl,
  placement,
  transfer: toRef(props, 'to'),
  isDrop: true,
})

const getIndex = useZIndex()
const zIndex = computed(() => getIndex())
const popperStyle = computed(() => {
  return {
    zIndex: zIndex.value,
  }
})

function createMeta(data?: any) {
  return {
    year: dayjs(data).year(),
    month: dayjs(data).month(),
    day: dayjs(data).date(),
    hour: dayjs(data).hour(),
    minute: dayjs(data).minute(),
    second: dayjs(data).second(),
  }
}

function createDateMeta(idx: number) {
  const date = props.value as any
  const { enabled } = useColumn<keyof DateMeta>(['year', 'month', 'day', 'hour', 'minute', 'second'])

  let dateMeta = reactive<DateMeta>(createMeta())

  if (!isRange.value && date && isString(date))
    dateMeta = reactive(createMeta(date))

  if (isRange.value && date && Array.isArray(date))
    dateMeta = reactive(createMeta(date[idx]))

  const extraMeta = reactive({
    allocated: false,
  })

  return reactive({
    enabled,
    dateMeta,
    extraMeta,
    // 你只应该在处理外部时间时使用该方法, 其余你应该使用setDateMeta来控制组件的输出值
    setDate: (date: Dateable | Dayjs, changeByClick = true) => {
      if (!date)
        return
      dateMeta.year = dayjs(date).get('year')
      dateMeta.month = dayjs(date).get('month')
      dateMeta.day = dayjs(date).get('date')
      dateMeta.hour = dayjs(date).get('hour')
      dateMeta.minute = dayjs(date).get('minute')
      dateMeta.second = dayjs(date).get('second')

      changeByClick && (extraMeta.allocated = true)
    },
    setDateMeta: (meta: Partial<DateMeta>) => {
      const keys = Object.keys(meta).filter(unit => enabled[unit as keyof DateMeta]) as (keyof Partial<DateMeta>)[]

      keys.forEach((key) => {
        dateMeta[key] = meta[key]!
      })
    },
    getDate: () => {
      return new Date(
        dateMeta.year,
        dateMeta.month,
        dateMeta.day,
        dateMeta.hour,
        dateMeta.minute,
        dateMeta.second,
      )
    },
    getDayjs: () => {
      return dayjs(new Date(dateMeta.year, dateMeta.month, dateMeta.day))
    },
  })
}
function getValueFormat() {
  if (props.valueFormat)
    return props.valueFormat

  if (isTime.value)
    return config.timeFormat

  return config.defaultFormat
}

function showPanel() {
  togglePanel(true)
  parseValue()
}

function parseValue() {
  const noValue = !props.value || (Array.isArray(props.value) && !props.value.length)

  // 没有值则重置
  if (noValue) {
    startMeta.extraMeta.allocated = false
    endMeta.extraMeta.allocated = false

    return
  }

  // 如果是范围选择, 并且值有效
  if (Array.isArray(props.value) && isRange.value) {
    const startValid = dayjs(props.value[0]).isValid()
    const endValid = dayjs(props.value[1]).isValid()

    startValid && startMeta.setDate(props.value[0], false)
    endValid && endMeta.setDate(props.value[1], false)
  }
  else if (!Array.isArray(props.value)) {
    const startValid = dayjs(props.value).isValid()
    startValid && startMeta.setDate(props.value, false)
  }
}

function togglePanel(value = !visible.value) {
  visible.value = value
}

function handleClickOutside() {
  visible.value = false
}

function patchDateMeta(d: Dateable | Dateable[]) {
  if (!Array.isArray(d)) {
    startMeta.setDate(d)
  }
  else {
    startMeta.setDate(d[0])
    endMeta.setDate(d[1])
  }

  emitValue()
}
function handlePresetClick(value: Dateable | Dateable[]) {
  if (props.type === 'static')
    patchDateMeta(value)

  if (isRange.value)
    patchDateMeta(value)
}

const startFormattedValue = computed(() => {
  if (!startMeta.extraMeta.allocated && !props.value)
    return isRange.value ? '开始时间' : '手动'

  const startProps = startMeta.getDate()

  return dayjs(startProps).format(getValueFormat())
})
const endModelValue = computed(() => {
  if (!endMeta.extraMeta.allocated && !props.value)
    return '结束时间'

  const endProps = endMeta.getDate()

  return dayjs(endProps).format(getValueFormat())
})
const placeholder = computed(() => {
  return isRange.value ? `${startFormattedValue.value} - ${endModelValue.value}` : startFormattedValue.value
})

function parseFormat() {
  ;[startMeta, endMeta].forEach((state) => {
    state.enabled.year = props.format.includes('Y')
    state.enabled.month = props.format.includes('M')
    state.enabled.day = props.format.includes('D')
    state.enabled.hour = props.format.toLowerCase().includes('h')
    state.enabled.minute = props.format.includes('m')
    state.enabled.second = props.format.includes('s')
  })
}

function emitValue() {
  const emitValue = isRange.value
    ? [startMeta.getDate().getTime(), endMeta.getDate().getTime()]
    : startMeta.getDate().getTime()

  emit('update:value', emitValue)
  emitEvent(props.onChange, emitValue)
}

function handleConfirm() {
  emitValue()
  togglePanel(false)
}

function ensureStartIsBefor() {
  const startDate = startMeta.getDate()
  const endDate = endMeta.getDate()
  const needChange = dayjs(endDate).isSameOrBefore(startDate)

  if (!needChange)
    return

  startMeta.setDate(endDate)
  endMeta.setDate(startDate)
}

watch(
  () => props.value,
  (value) => {
    if (!value)
      return

    parseValue()
  },
  { immediate: true },
)

watch(() => props.valueFormat, parseFormat, { immediate: true })

watch(visible, (value) => {
  parseValue()
  if (value)
    updatePopper()
})
watch(
  () => endMeta.dateMeta,
  () => {
    ensureStartIsBefor()
  },
  { deep: true },
)

provide(DATE_PICKER_INJECTION_KEY, {
  currentValue,
  isRange,
  startMeta,
  endMeta,
})
useClickOutside(handleClickOutside, { ignore: [panelEle] }, reference)
</script>

<template>
  <div ref="reference" :class="ns.bs('trigger')" style="display: inline-block" @click="showPanel">
    <slot v-if="$slots.trigger" name="trigger" />
    <ButtonGroup v-else-if="presets" v-bind="$attrs">
      <Button>
        <template #icon>
          <Icon v-bind="icons.calendar" />
        </template>
        {{ placeholder }}
      </Button>
      <Button
        v-for="preset in Object.keys(presets)"
        :key="preset"
        @click.stop="handlePresetClick(presets[preset])"
      >
        {{ preset }}
      </Button>
    </ButtonGroup>

    <Button v-else v-bind="$attrs">
      <template #icon>
        <Icon v-bind="icons.calendar" />
      </template>
      {{ placeholder }}
    </Button>
  </div>

  <Popper
    ref="popperRef"
    :class="popperClass"
    :to="transferTo"
    :visible="visible"
    :transition="props.transitionName"
    :style="popperStyle"
    :inherit="props.inherit"
    @click.stop
  >
    <DatePickerPanel
      ref="panelRef"
      :type="props.type"
      :typing="props.typing"
      @confirm="handleConfirm"
      @cancel="togglePanel"
    />
  </Popper>
</template>
