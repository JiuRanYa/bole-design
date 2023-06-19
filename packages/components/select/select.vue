<script setup lang="ts">
import { watch, computed, onMounted, ref } from 'vue'
import { selectProps } from './props'
import { useProps } from '@bole-design/common'
import type { Placement } from '@floating-ui/dom'
import { Popper, PopperExposed } from '../popper'
import { Option } from '../option'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'

defineOptions({
  name: 'Select'
})

const emit = defineEmits(['update:value'])
const _props = defineProps(selectProps)
const props = useProps('select', _props, {
  value: '',
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

const className = computed(() => {
  return {
    [ns.b()]: true,
    [ns.ns('input-vars')]: true,
    [ns.bs('vars')]: true,
    [ns.bm('inherit')]: props.inherit
  }
})
const selectorClass = computed(() => {
  return [ns.be('selector')]
})
const popperStyle = computed(() => {
  return {
    'transform-origin': 'center top',
    position: 'absolute',
    left: `${x.value || 0}px`,
    top: `${y.value || 0}px`
  }
})
function showOptionsPanel() {
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
function initValueAndLabel(value) {}
function isSelected(value: string | number) {
  return false
}
onMounted(() => {
  if (props.visible) {
    fitPopperWidth()
  }
})
watch(
  () => props.value,
  value => {
    initValueAndLabel(value)
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
  <div :class="className" ref="wrapper" @click="showOptionsPanel">
    <div ref="reference" :class="selectorClass" tabindex="0">
      <div :class="ns.be('control')">请选择</div>
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
        >
        </Option>
      </div>
    </Popper>
  </div>
</template>
