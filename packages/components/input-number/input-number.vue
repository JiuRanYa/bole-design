<script setup lang="ts">
import { useNamespace, useTimerRecord } from '@panda-ui/hooks'
import {
  boundValueInRange,
  emitEvent,
  getPrecision,
  isNull,
  isNumber,
  isValidNumber,
  toFixed,
  toNumber,
  useProps,
  warnWithPrefix,
} from '@panda-ui/common'
import { debounce, throttle } from '@panda-ui/utils'
import { Minus, Plus } from '@panda-ui/icons'
import { computed, reactive, ref, watch } from 'vue'
import { Icon } from '../icon'

import { inputNumberProps } from './props'
import type { InputEventType } from './symbol'

defineOptions({
  name: 'InputNumber',
})

const _props = defineProps(inputNumberProps)
const emit = defineEmits(['update:value'])
const ns = useNamespace('input-number')
const props = useProps('input-number', _props, {
  value: null,
  name: '',
  min: Number.NEGATIVE_INFINITY,
  max: Number.POSITIVE_INFINITY,
  debounce: false,
  autofocus: false,
  autocomplete: false,
  precision: -1,
  disabled: false,
  placeholder: '请输入数字',
  controlPosition: null,
  step: 1,
  sync: false,
  size: 'middle',
})
const classNames = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    ns.bm(props.size),
    {
      [ns.bm('disabled')]: props.disabled,
    },
    {
      [ns.bm('warning')]: isOutOfRange.value,
    },
  ]
})

const isEmpty = (value: unknown) => !value && value !== 0
const isNullOrNaN = (value: unknown) => isNull(value) || Number.isNaN(value)

const states = reactive<{
  lastValue?: number
  currentValue: string | number
  plusHolding: boolean
  minusHolding: boolean
}>({
  currentValue: props.value,
  plusHolding: false,
  minusHolding: false,
})

const formatValue = computed(() => {
  if (typeof preciseNumber.value !== 'number')
    return preciseNumber.value ?? ''

  return !inputting.value && typeof props.formatter === 'function'
    ? props.formatter(preciseNumber.value as number)
    : preciseNumber.value.toString()
})

const preciseNumber = computed(() => {
  return !inputting.value && typeof states.currentValue === 'number' && props.precision >= 0
    ? toFixed(states.currentValue, props.precision)
    : states.currentValue
})
const displayValue = computed(() => {
  if (Number.isNaN(states.currentValue))
    return ''

  return inputting.value ? preciseNumber.value : formatValue.value
})

const isOutOfRange = computed(() => {
  return (
    !isNullOrNaN(states.currentValue)
    && (toNumber(states.currentValue) > props.max || toNumber(states.currentValue) < props.min)
  )
})

const boundedValue = (value: string | number) => boundValueInRange(value, props.min, props.max)

const inputting = ref(false)

const handleInput = props.debounce ? debounce(handleChange, 100) : throttle(handleChange, 16)

function handleChange(event: Event) {
  const type = event.type as InputEventType
  const userInput = (event.target as HTMLInputElement).value
  let value = userInput.trim()

  if (type === 'change') {
    const floatValue = Number.parseFloat(userInput)

    if (Number.isNaN(floatValue))
      value = ''
    else
      value = floatValue.toString()

    ;(event.target as HTMLInputElement).value = value
  }

  inputting.value = type === 'input'
  setCurrentValue(value, type)
}

function handleBlur() {
  setTimeout(() => {
    inputting.value = false
  }, 120)
}

function handleFocus() {
  inputting.value = true
}

function emitChangeEvent(type: InputEventType) {
  const empty = isEmpty(states.currentValue)
  const value = empty ? Number.NaN : toNumber(states.currentValue)

  if (type === 'change') {
    let bounded = empty ? Number.NaN : boundedValue(value)

    if (props.precision > 0)
      bounded = toFixed(bounded, props.precision)

    if (!empty)
      states.currentValue = bounded

    emit('update:value', bounded)
    emitEvent(props.onChange, bounded)
  }
  else {
    if (props.sync)
      emit('update:value', value)

    emitEvent(props.onInput, value)
  }
}

function setCurrentValue(value: string | number, type: InputEventType) {
  if (type === 'change')
    states.currentValue = isEmpty(value) ? Number.NaN : toNumber(value)
  else
    states.currentValue = value

  emitChangeEvent(type)
}

function parseValue() {
  let value = props.value

  if (props.parser)
    value = props.parser(props.value) as number

  if (props.sync) {
    states.currentValue = value
    return
  }

  value = inputting.value ? value : isValidNumber(value, true) ? toNumber(value) : Number.NaN

  if (props.precision && props.precision >= 0 && !isNullOrNaN(value))
    value = toFixed(boundedValue(value), props.precision)

  states.currentValue = value
  states.lastValue = value
}

const step = computed(() => {
  if (!isNumber(props.step))
    return 1

  return toNumber(props.step)
})

const realPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step)

  if (props.precision && props.precision !== -1) {
    if (stepPrecision > props.precision)
      warnWithPrefix('InputNumber', 'precision should not be less than the decimal places of step')

    return props.precision
  }
  return Math.max(getPrecision(props.value), stepPrecision)
})

function ensurePrecision(val: number, coefficient: 1 | -1 = 1) {
  if (!isNumber(val))
    return states.currentValue

  return toFixed(val + props.step * coefficient, realPrecision.value)
}

function changeStep(type: 'plus' | 'minus') {
  const coefficient = type === 'plus' ? 1 : -1

  if (isNullOrNaN(states.currentValue)) {
    setCurrentValue(boundedValue(coefficient * step.value), 'change')

    return
  }
  if (isValidNumber(states.currentValue)) {
    const parsedValue = ensurePrecision(toNumber(states.currentValue), coefficient)
    const bounded = boundedValue(parsedValue)

    setCurrentValue(bounded, 'change')
  }
}
const { timeout, interval } = useTimerRecord()

function handleHold(type: 'plus' | 'minus', event: PointerEvent) {
  if (event.button !== 0)
    return

  changeStep(type)
  document.addEventListener('pointerup', cancelStep)
  document.addEventListener('touchend', cancelStep)
  clearTimeout(timeout.step)
  clearInterval(interval.step)

  if (type === 'plus')
    states.minusHolding = true

  timeout.step = setTimeout(() => {
    interval.step = setInterval(() => {
      props.disabled ? cancelStep() : changeStep(type)
    }, 32)
  }, 500)
}

function cancelStep() {
  document.removeEventListener('pointerup', cancelStep)
  document.removeEventListener('touchend', cancelStep)
  clearTimeout(timeout.step)
  clearInterval(interval.step)

  states.plusHolding = false
  states.minusHolding = false
}

const control = ref<HTMLInputElement>()

function focus(options?: FocusOptions) {
  control.value?.focus(options)
}

watch(
  () => props.value,
  (value) => {
    if (value !== states.lastValue)
      parseValue()
  },
  { immediate: true },
)

defineExpose({
  focus,
  blur: () => control.value?.blur(),
})
</script>

<template>
  <div :class="classNames">
    <input
      ref="control"
      :value="displayValue"
      :class="[ns.be('input'), props.controlAttrs]"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :aria-valuenow="preciseNumber"
      :aria-valuemin="props.min !== -Infinity ? props.min : undefined"
      :aria-valuemax="props.max !== Infinity ? props.max : undefined"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete ? 'on' : 'off'"
      :name="props.name"
      @focus="handleFocus"
      @change="handleChange"
      @input="handleInput"
      @blur="handleBlur"
      @keydown.up.prevent="changeStep('plus')"
      @keydown.down.prevent="changeStep('minus')"
    >

    <div v-if="props.controlPosition" :class="ns.be('control')">
      <Icon :scale="1" :class="ns.bem('control', 'increase')">
        <Plus @pointerdown.prevent="handleHold('plus', $event)" />
      </Icon>
      <Icon :scale="1" :class="ns.bem('control', 'decrease')">
        <Minus @pointerdown.prevent="handleHold('minus', $event)" />
      </Icon>
    </div>
  </div>
</template>
