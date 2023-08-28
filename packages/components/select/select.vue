<script setup lang="ts">
import { watch, computed, onMounted, ref } from 'vue'
import { selectProps } from './props'
import { isNull, useProps } from '@bole-design/common'
import type { Placement } from '@floating-ui/dom'
import { Popper, PopperExposed } from '../popper'
import { Option } from '../option'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { ChevronDown } from '@bole-design/icons'
import { Icon } from '../icon'
import { SelectValue } from './.symbol'

defineOptions({
  name: 'Select'
})

const emit = defineEmits(['update:value'])
const _props = defineProps(selectProps)
const props = useProps('select', _props, {
  value: 1,
  visible: false,
  transitionName: () => ns.ns('drop'),
  listClass: [],
  fitPopper: true,
  options: {
    default: () => [],
    static: true
  }
})

const wrapper = ref()
const reference = ref()
const currentIndex = ref<number>()
const currentValues = ref<(string | number)[]>([])
const currentVisible = ref(props.visible)

const popper = ref<PopperExposed>()
const placement = ref<Placement>('bottom-start')
const popperEl = computed(() => popper.value?.wrapper)

const referenceEl = computed(() => {
  return reference.value
})

const { x, y } = usePopper({
  referenceEl,
  popperEl,
  placement
})

const ns = useNamespace('select')
let emittedValue: typeof props.value | null = props.value

const className = computed(() => {
  return {
    [ns.b()]: true,
    [ns.ns('input-vars')]: true,
    [ns.bs('vars')]: true,
    [ns.bm('inherit')]: props.inherit
  }
})
const selectorClass = computed(() => {
  return [
    ns.be('selector'),
    {
      [ns.bem('selector', 'focused')]: currentVisible.value
    }
  ]
})
const popperStyle = computed(() => {
  return {
    'transform-origin': 'center top',
    position: 'absolute',
    left: `${x.value || 0}px`,
    top: `${y.value || 0}px`
  }
})
function showListPanel() {
  setVisible(!currentVisible.value)
}
function setVisible(visible: boolean) {
  emit('update:value')
  currentVisible.value = visible
}
function handleClickOutSide() {
  setVisible(false)
}

function fitPopperWidth() {
  requestAnimationFrame(() => {
    if (wrapper.value && popper.value?.wrapper) {
      if (typeof props.fitPopper === 'number') {
        popper.value.wrapper.style.width = `${props.fitPopper}px`
      } else if (props.fitPopper) {
        popper.value.wrapper.style.width = `${wrapper.value.offsetWidth}px`
      } else {
        popper.value.wrapper.style.minWidth = `${wrapper.value.offsetWidth}px`
      }
    }
  })
}
function initValueAndLabel(value: string | number) {
  if (isNull(value)) {
    currentValues.value = []
  }
  currentValues.value[0] = value
}
function isSelected(value: string | number) {
  return currentValues.value[0] === value || false
}
function isSameValue(newValue: SelectValue, oldValue: SelectValue) {
  const isNewArray = Array.isArray(newValue)
  const isOldArray = Array.isArray(oldValue)

  if (isNewArray !== isOldArray) return false

  if (isNewArray && isOldArray) {
    if (newValue.length !== oldValue.length) return false

    for (let i = 0, len = newValue.length; i < len; ++i) {
      if (newValue[i] !== oldValue[i]) return false
    }

    return true
  }

  if (isNull(newValue)) return isNull(oldValue)

  return newValue === oldValue
}
function handleOptionClick(value: string | number) {
  if (!isSameValue(value, emittedValue)) {
    currentValues.value[0] = value
    emittedValue = value
    emit('update:value', value)
  }
  currentVisible.value = false
}
onMounted(() => {
  if (props.visible) {
    fitPopperWidth()
  }
})
watch(
  () => props.value,
  value => {
    // initValueAndLabel(value)
    if (!emittedValue || !isSameValue(value, emittedValue)) {
      initValueAndLabel(value)
    }
  }
)
watch(
  () => currentVisible.value,
  value => {
    if (value) {
      fitPopperWidth()
    }
  }
)
useClickOutside(referenceEl, handleClickOutSide, { ignore: [popperEl] })
</script>

<template>
  <div :class="className" ref="wrapper" @click="showListPanel">
    <div ref="reference" :class="selectorClass" tabindex="0">
      <div :class="ns.be('control')">请选择</div>
      <div :class="[ns.be('icon'), ns.be('suffix')]">
        <Icon :icon="ChevronDown" :class="ns.be('arrow')"></Icon>
      </div>
    </div>
    <Popper
      ref="popper"
      :style="popperStyle"
      to="body"
      :visible="currentVisible"
      :transition="props.transitionName"
      :class="[ns.be('popper'), ns.bs('vars')]"
    >
      <div :class="[ns.be('list'), props.listClass]">
        <Option
          :label="option.label"
          :value="option.value"
          v-for="option in props.options"
          :selected="isSelected(option.value)"
          @click="handleOptionClick(option.value)"
        >
        </Option>
      </div>
    </Popper>
  </div>
</template>
