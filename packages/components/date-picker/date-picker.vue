<script setup lang="ts">
import DatePickerPanel from './date-picker-panel.vue'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { computed, provide, reactive, ref, toRef, watch } from 'vue'
import { Popper, PopperExposed } from '@bole-design/components'
import { placementWhiteList, useProps, doubleDigits, Dateable, is } from '@bole-design/common'
import { DateMeta, OriginDate, datePickerProps } from './props'
import { CalendarR } from '@bole-design/icons'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Button, ButtonGroup, Icon } from '@bole-design/components'
import { DATE_PICKER_INJECTION_KEY } from '@bole-design/tokens/date-picker'
import { config } from './const'

defineOptions({
  name: 'DatePicker'
})

console.log(dayjs('2023年06月08日', 'YYYY年MM月DD日'))

const emit = defineEmits(['update:value'])
const _props = defineProps(datePickerProps)
const props = useProps('date-picker', _props, {
  placement: {
    default: 'bottom-start',
    validator: value => placementWhiteList.includes(value)
  },
  value: '',
  transitionName: () => ns.ns('drop'),
  presets: {},
  type: 'static',
  valueFormat: ''
})
const ns = useNamespace('date-picker')

const referenceEl = computed(() => {
  return originTriggerRef.value
})
const isRange = computed(() => {
  return props.type === 'range'
})

const panelRef = ref()
const popperRef = ref<PopperExposed>()
const originTriggerRef = ref<HTMLElement>()

const panelEle = computed(() => panelRef.value?.wrapper)
const popperEl = computed(() => popperRef.value?.wrapper)

const visible = ref(false)
const startMeta = createDateMeta()
const endMeta = createDateMeta()

const currentValue = computed(() => {
  const values = [startMeta, endMeta].map(state => {
    const values = Object.values(state.dateMeta).map(doubleDigits)

    return `${values.slice(0, 3).join('-')}`
  })

  return isRange.value ? values : values[0]
})
const placement = toRef(props, 'placement')

const popperClass = computed(() => {
  return [
    ns.be('popper'),
    {
      [ns.bm('inherit')]: true
    }
  ]
})

const { x, y } = usePopper({
  referenceEl,
  popperEl,
  placement
})

const popperStyle = computed(() => {
  return {
    position: 'absolute',
    left: `${x.value || 0}px`,
    top: `${y.value || 0}px`,
    'transform-origin': 'center top'
  }
})

function createDateMeta() {
  const dateMeta = reactive<DateMeta>({
    year: dayjs().year(),
    month: dayjs().month() + 2,
    day: 0
  })
  const extraMeta = reactive({
    allocated: false
  })
  if (props.value && isRange.value) {
    extraMeta.allocated = true
  }

  return reactive({
    dateMeta,
    extraMeta,
    setDate: (date: Dateable | Dayjs) => {
      if (!date) return
      dateMeta.year = dayjs(date).year()
      dateMeta.month = dayjs(date).month() + 1
      dateMeta.day = dayjs(date).date()
    },
    getDate: () => {
      return dayjs(new Date(dateMeta.year, dateMeta.month - 1, dateMeta.day)).format(
        config.defaultFormat
      )
    }
  })
}

function togglePanel() {
  visible.value = !visible.value
}

function handleClickOutside() {
  visible.value = false
}

function patchDateMeta(d: Dateable | Dateable[]) {
  if (!Array.isArray(d)) {
    startMeta.setDate(d)
    emit('update:value', currentValue.value)
    return
  }

  startMeta.setDate(d[0])
  endMeta.setDate(d[1])
  emit('update:value', currentValue.value)
}
function handlePresetClick(value: Dateable | Dateable[]) {
  if (props.type === 'static') {
    patchDateMeta(value)
  }
  if (isRange.value) {
    patchDateMeta(value)
  }
}

function handlePickDate(date: OriginDate) {
  visible.value = false
  startMeta.dateMeta = date
  emit('update:value', currentValue.value)
}

const updateModelValue = (val: any) => {
  if (props.valueFormat) {
    if (isRange) {
      emit(
        'update:value',
        val.map((d: any) => dayjs(d).format(props.valueFormat))
      )
      return
    }

    emit('update:value', dayjs(val).format(props.valueFormat))
    return
  }
  emit('update:value', val)
}
const parseDate = function (
  date: string | number | Date,
  format: string | undefined,
  lang: string
) {
  const day = dayjs(date, format).locale(lang)
  return day.isValid() ? day : undefined
}
watch(
  () => props.value,
  value => {
    if (!value) return

    const startValue = Array.isArray(value) ? value[0] : value
    const endValue = Array.isArray(value) ? value[1] : value
    const parsedStartDate = parseDate(startValue, props.valueFormat, 'zh-cn')
    const parsedEndDate = parseDate(endValue, props.valueFormat, 'zh-cn')

    parsedStartDate && startMeta.setDate(parsedStartDate)
    parsedEndDate && endMeta.setDate(parsedEndDate)
  },
  { immediate: true }
)
provide(DATE_PICKER_INJECTION_KEY, {
  currentValue,
  isRange,
  startMeta,
  endMeta,
  updateModelValue
})
useClickOutside(originTriggerRef, handleClickOutside, { ignore: [panelEle] })
</script>

<template>
  <span ref="originTriggerRef" @click="togglePanel">
    <slot v-if="$slots.trigger" name="trigger" />
    <ButtonGroup v-else-if="presets">
      <Button>
        <template #icon>
          <Icon :icon="CalendarR" :scale="1.4"></Icon>
        </template>
        {{
          isRange ? `${currentValue[0]} - ${currentValue[1]}` : props.value ? currentValue : '手动'
        }}
      </Button>
      <Button
        v-for="preset in Object.keys(presets)"
        @click.stop="handlePresetClick(presets[preset])"
      >
        {{ preset }}
      </Button>
    </ButtonGroup>

    <Button v-else>
      <template #icon>
        <Icon :icon="CalendarR" :scale="1.4"></Icon>
      </template>
      {{
        isRange ? `${currentValue[0]} - ${currentValue[1]}` : props.value ? currentValue : '手动'
      }}
    </Button>
  </span>

  <Popper
    :class="popperClass"
    to="body"
    ref="popperRef"
    :visible="visible"
    :transition="props.transitionName"
    :style="popperStyle"
  >
    <DatePickerPanel
      ref="panelRef"
      @pick="handlePickDate"
      @confirm="togglePanel"
      @cancel="togglePanel"
    />
  </Popper>
</template>
