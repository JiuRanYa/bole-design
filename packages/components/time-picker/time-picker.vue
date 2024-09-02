<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'

import { TIME_REG, boundValueInRange, createIconProp, doubleDigits, emitEvent, useIcons, useProps, useZIndex } from '@panda-ui/common'
import { useClickOutside, useNamespace, usePopper, useSetTimeout } from '@panda-ui/hooks'

import { Button } from '../button'
import { Popper } from '../popper'
import { Icon } from '../icon'
import { timePickerProps } from './props'
import type { TimeState, TimeType } from './symbol'

import TimeControl from './time-control.vue'
import TimePanel from './time-panel.vue'
import { useColumn } from './helper'

defineOptions({
  name: 'TimePicker',
})

const _props = defineProps(timePickerProps)
const emit = defineEmits(['update:value'])
const validator = (max: number) => (value: number) => max % value === 0

const props = useProps('time-picker', _props, {
  format: 'HH:mm:ss',
  visible: false,
  hourStep: {
    default: 1,
    validator: validator(24),
  },
  minuteStep: {
    default: 1,
    validator: validator(60),
  },
  secondStep: {
    default: 1,
    validator: validator(60),
  },
  separator: ':',
  transition: () => ns.ns('drop'),
  needConfirm: false,
  noSuffix: false,
  suffix: createIconProp(),
  labels: null,
})

const icons = useIcons()
const ns = useNamespace('time-picker')

const classNames = computed(() => {
  return [ns.b(), ns.bs('vars'), {
    [ns.be('focused')]: focused.value,
  }]
})

const popper = ref()
const popperEl = computed(() => popper.value?.wrapper)

const getIndex = useZIndex()
const zIndex = computed(() => getIndex())
const popperStyle = computed(() => {
  return {
    zIndex: zIndex.value,
  }
})

const { reference, updatePopper } = usePopper({
  isDrop: true,
  popper: popperEl,
  placement: ref('bottom-start'),
})
const wrapper = ref()
const startInput = ref()
const endInput = ref()

const startState = createState()
const endState = createState()
const focused = ref(false)
const currentVisible = ref(props.visible)
const currentFocus = ref<'start' | 'end'>('start')

const currentValue = computed(() => {
  const values = [startState, endState].map((state) => {
    return Object.values(state.timeValue).map(doubleDigits).join(':')
  })

  return props.range ? values : values[0]
})

const isActivated = computed(() => {
  return (Object.keys(startState.enabled) as TimeType[]).some(type => startState.activated[type])
})

function toggleVisible(visible: boolean) {
  updatePopper()

  currentVisible.value = visible
}

function createState() {
  const { currentColumn, enabled, enterColumn, resetColumn } = useColumn(['hour', 'minute', 'second'])

  const timeValue = reactive({
    hour: 0,
    minute: 0,
    second: 0,
  })
  const activated = reactive({
    hour: false,
    minute: false,
    second: false,
  })

  return reactive<TimeState>({
    unitType: currentColumn,
    timeValue,
    enabled,
    activated,
    enterColumn,
    resetColumn,
  })
}

function handleStartInput(type: TimeType) {
  currentFocus.value = 'start'
  startState.unitType = type
}

function handleEndInput(type: TimeType) {
  currentFocus.value = 'end'
  endState.unitType = type
}

function handleBlur() {
  focused.value = false

  startInput.value?.blur()
  endInput.value?.blur()
}

function handleClickOutside() {
  if (currentVisible.value) {
    toggleVisible(false)
    props.needConfirm && handleResetData()
    handleBlur()
    emitValue()
  }
}

function handleConfirm() {
  emitValue()
  toggleVisible(false)
}

function toggleActivated(value: boolean, valueType?: 'start' | 'end') {
  const states = valueType
    ? valueType === 'start'
      ? [startState]
      : [endState]
    : [startState, endState]

  states.forEach((state) => {
    ;(Object.keys(state.activated) as TimeType[]).forEach((type) => {
      state.activated[type] = value
    })
  })
}

function parseValue<T extends string | null>(value: T | T[]) {
  if (!Array.isArray(value))
    value = [value, value]

  const currentDate = new Date()

  for (let i = 0; i < 2; ++i) {
    const match = TIME_REG.exec(value[i] || '')
    const state = i === 0 ? startState : endState
    const { timeValue } = state

    if (match) {
      toggleActivated(true, i === 0 ? 'start' : 'end')

      const hour = Number.parseInt(match[1])
      const minute = match[2] ? Number.parseInt(match[2].slice(1)) : 0
      const second = match[3] ? Number.parseInt(match[3].slice(1)) : 0

      const date = new Date(2000, 1, 1, hour, minute, second)

      timeValue.hour = date.getHours()
      timeValue.minute = date.getMinutes()
      timeValue.second = date.getSeconds()
    }
    else {
      timeValue.hour = currentDate.getHours()
      timeValue.minute = currentDate.getMinutes()
      timeValue.second = currentDate.getSeconds()

      toggleActivated(false, i === 0 ? 'start' : 'end')
    }

    if (!props.range)
      break
  }
}

function handleResetData() {
  parseValue(props.value)
  toggleVisible(false)
}

function emitValue() {
  emitEvent(props.onChange, currentValue.value)
  !props.needConfirm && emit('update:value', currentValue.value)
}

function parseFormat() {
  ;[startState, endState].forEach((state) => {
    state.enabled.hour = props.format.includes('H')
    state.enabled.minute = props.format.includes('m')
    state.enabled.second = props.format.includes('s')
  })
}

function getCurrentState() {
  return currentFocus.value === 'start' ? startState : endState
}

function updateActivated(type: TimeType) {
  getCurrentState().activated[type] = true
}

function handleInputNumber(unit: TimeType, num: number) {
  const state = getCurrentState()
  const prev = state.timeValue[unit]

  if (state.activated[unit] && prev > 0 && prev < 10)
    state.timeValue[unit] = prev * 10 + num
  else
    state.timeValue[unit] = num

  state.activated[unit] = true

  verifyValueByUnit(unit)
  emitEvent(props.onInput, unit, state.timeValue[unit])
}

function verifyValueByUnit(type: TimeType) {
  const timeValue = getCurrentState().timeValue

  timeValue[type] = boundValueInRange(timeValue[type], 0, type === 'hour' ? 23 : 59)
  timeValue[type] = Math.round(timeValue[type] / getStep(type)) * getStep(type)
}
const { timer } = useSetTimeout()

function handleFocused() {
  focused.value = true

  timer.focus = setTimeout(() => {
    if (focused.value) {
      if (currentFocus.value === 'start')
        startInput.value?.focus()
      else
        endInput.value?.focus()
    }
  }, 120)
}

function showPanel(event: Event) {
  const target = event.target as Node

  handleFocused()
  toggleVisible(true)

  if (wrapper.value && target) {
    const units: HTMLElement[] = Array.from(wrapper.value.querySelectorAll(`.${ns.be('unit')}`))

    if (!units.some(unit => unit === target || unit.contains(target))) {
      startState.unitType = null
      endState.unitType = null
    }
  }
}

function handleControlInput(value: number) {
  const state = getCurrentState()
  const type = state.unitType

  if (!type)
    return

  handleInputNumber(type, value)

  if (state.unitType !== 'second' && state.timeValue[type] >= 10)
    state.enterColumn('next', false)
}

function enterColumn(type: 'prev' | 'next') {
  if (props.range) {
    if (type === 'prev' && currentFocus.value === 'start' && !startState.unitType)
      currentFocus.value = 'end'

    const state = getCurrentState()
    const unitType = state.unitType

    state.enterColumn(type, !unitType)

    if (unitType === state.unitType) {
      const isStart = currentFocus.value === 'start'
      const otherState = isStart ? endState : startState

      otherState.resetColumn(type === 'prev' ? 'second' : 'hour', type === 'prev')
      currentFocus.value = isStart ? 'end' : 'start'
    }
  }
  else { startState.enterColumn(type) }
}

function getStep(type: TimeType) {
  const t = `${type}Step` as 'hourStep' | 'minuteStep' | 'secondStep'

  return props[t]
}

function handleMinus() {
  const state = getCurrentState()
  const type = state.unitType

  if (!type)
    return

  if (state.enabled[type]) {
    state.timeValue[type] -= getStep(type)

    verifyValueByUnit(type)

    emitEvent(props.onMinus, type, state.timeValue[type])
  }
}

function handlePlus() {
  const state = getCurrentState()
  const type = state.unitType

  if (!type)
    return

  if (state.enabled[type]) {
    state.timeValue[type] += getStep(type)

    verifyValueByUnit(type)

    emitEvent(props.onPlus, type, state.timeValue[type])
  }
}

watch(() => props.visible, () => {
  currentVisible.value = props.visible
})
watch(() => props.value, parseValue, { immediate: true })
watch(() => props.format, parseFormat, { immediate: true })
watch(() => startState.timeValue, emitValue, { deep: true })
watch(() => endState.timeValue, emitValue, { deep: true })

watch(focused, (value) => {
  if (value)
    emitEvent(props.onFocus)
  else
    emitEvent(props.onBlur)
})

useClickOutside(handleClickOutside, { ignore: [popperEl] }, reference)
</script>

<template>
  <div
    ref="wrapper"
    :class="classNames"
    @click="showPanel"
  >
    <div ref="reference" :class="ns.be('selector')">
      <div :class="ns.be('control')">
        <TimeControl
          ref="startInput"
          :enabled="startState.enabled"
          :time-value="startState.timeValue"
          :unit-type="currentFocus === 'start' ? startState.unitType! : ''"
          :focused="focused"
          :visible="currentVisible"
          :activated="startState.activated"
          placeholder="开始时间"
          :labels="props.labels"
          :separator="props.separator"
          @unit-focus="handleStartInput"
          @minus="handleMinus"
          @plus="handlePlus"
          @prev-unit="enterColumn('prev')"
          @next-unit="enterColumn('next')"
          @input="handleControlInput"
        />

        <template v-if="props.range">
          <Icon v-bind="icons.arrowRightLeft" style="margin: 0 8px;" :scale="0.9" :class="{ [ns.be('placeholder')]: !focused && !isActivated }" />

          <TimeControl
            ref="endInput"
            :enabled="endState.enabled"
            :time-value="endState.timeValue"
            :unit-type="currentFocus === 'end' ? endState.unitType! : ''"
            :focused="focused"
            :visible="currentVisible"
            :activated="startState.activated"
            placeholder="结束时间"
            :separator="props.separator"
            @unit-focus="handleEndInput"
            @minus="handleMinus"
            @plus="handlePlus"
            @prev-unit="enterColumn('prev')"
            @next-unit="enterColumn('next')"
            @input="handleControlInput"
          />
        </template>
      </div>

      <div
        v-if="!props.noSuffix"
        :class="[ns.be('icon'), ns.be('suffix')]"
      >
        <slot name="suffix">
          <Icon v-bind="icons.clock" :icon="props.suffix || icons.clock.icon" />
        </slot>
      </div>
    </div>

    <Popper
      ref="popper"
      :visible="currentVisible"
      :class="[ns.be('popper'), ns.bs('vars'), ns.bm('popper')]"
      :transition="props.transition"
      :style="popperStyle"
      @click.stop
    >
      <div :class="ns.be('wrapper')">
        <div :class="ns.be('panels')">
          <TimePanel
            v-model:hour="startState.timeValue.hour"
            v-model:minute="startState.timeValue.minute"
            v-model:second="startState.timeValue.second"
            :enabled="startState.enabled"
            :hour-step="props.hourStep"
            :minute-step="props.minuteStep"
            :second-step="props.secondStep"
            @update-activated="updateActivated"
          />

          <template v-if="props.range">
            <div :class="ns.be('exchange')">
              <Icon v-bind="icons.chevronsRight" :scale="1.2" />
            </div>
            <TimePanel
              v-model:hour="endState.timeValue.hour"
              v-model:minute="endState.timeValue.minute"
              v-model:second="endState.timeValue.second"
              :enabled="endState.enabled"
              :hour-step="props.hourStep"
              :minute-step="props.minuteStep"
              :second-step="props.secondStep"
              @update-activated="updateActivated"
            />
          </template>
        </div>
        <div :class="ns.be('action')">
          <Button type="ghost" size="small" @click="handleResetData">
            取消
          </Button>
          <Button type="primary" size="small" @click="handleConfirm">
            确认
          </Button>
        </div>
      </div>
    </Popper>
  </div>
</template>
