<script setup lang="ts">
import DatePickerPanel from './date-picker-panel.vue'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { computed, reactive, ref, toRef, watch } from 'vue'
import { Popper, PopperExposed } from '@bole-design/components'
import { placementWhiteList, useProps, doubleDigits, Dateable } from '@bole-design/common'
import { OriginDate, datePickerProps } from './props'
import { CalendarR } from '@bole-design/icons'
import dayjs from 'dayjs'

defineOptions({
  name: 'DatePicker'
})

const _props = defineProps(datePickerProps)
const props = useProps('date-picker', _props, {
  placement: {
    default: 'bottom-start',
    validator: value => placementWhiteList.includes(value)
  },
  value: '',
  transitionName: () => ns.ns('drop'),
  presets: {},
  type: 'static'
})
const ns = useNamespace('date-picker')

const referenceEl = computed(() => {
  return originTriggerRef.value
})
const panelRef = ref()
const popperRef = ref<PopperExposed>()
const originTriggerRef = ref<HTMLElement>()

const panelEle = computed(() => panelRef.value?.wrapper)
const popperEl = computed(() => popperRef.value?.wrapper)

const visible = ref(false)
const startState = createDateState()
const endState = createDateState()

const currentValue = computed(() => {
  const values = [startState, endState].map(state => {
    const values = Object.values(state.dateValue).map(doubleDigits)

    return `${values.slice(0, 3).join('-')} ${values.slice(3).join(':')}`
  })

  return isRange.value ? values : values[0]
})
const placement = toRef(props, 'placement')

const isRange = computed(() => {
  return props.type === 'range'
})
const popperClass = computed(() => {
  return [ns.be('popper')]
})

function createDateState() {
  const dateValue = reactive({
    year: 1970,
    month: 0,
    day: 0
  })
  if (props.value) {
  }

  return reactive({
    dateValue,
    setDate: (date: Dateable) => {
      dateValue.year = dayjs(date).year()
      dateValue.month = dayjs(date).month() + 1
      dateValue.day = dayjs(date).date()
    },
    getDate: () => {
      return new Date(dateValue.year, dateValue.month)
    }
  })
}

function showDatePanel() {
  visible.value = !visible.value
}

function handleClickOutside() {
  visible.value = false
}

function patchDateValue(d: Dateable) {
  const date = dayjs(d)

  startState.dateValue = {
    year: date.year(),
    month: date.month() + 1,
    day: date.date()
  }
  emit('update:value', currentValue.value)
}
function handlePresetClick(value: Dateable) {
  if (props.type === 'static') {
    patchDateValue(value)
  }
}

const emit = defineEmits(['update:value'])
function handlePickDate(date: OriginDate) {
  visible.value = false
  startState.dateValue = date
  emit('update:value', currentValue.value)
}
watch(
  () => props.value,
  value => {
    if (!value) return

    const startValue = Array.isArray(value) ? value[0] : value
    startState.setDate(startValue)
  },
  { immediate: true }
)
usePopper({
  referenceEl,
  popperEl,
  placement
})
useClickOutside(originTriggerRef, handleClickOutside, { ignore: [panelEle] })
</script>

<template>
  <span ref="originTriggerRef" @click="showDatePanel">
    <slot v-if="$slots.trigger" name="trigger" />
    <ButtonGroup v-else-if="presets">
      <Button>
        <template #icon>
          <Icon :icon="CalendarR" :scale="1.4"></Icon>
        </template>
        {{ currentValue }}
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
      {{ currentValue }}
    </Button>
  </span>

  <Popper
    :class="popperClass"
    to="body"
    ref="popperRef"
    :visible="visible"
    :transition="props.transitionName"
    style="transform-origin: center top"
  >
    <DatePickerPanel ref="panelRef" @pick="handlePickDate" />
  </Popper>
</template>