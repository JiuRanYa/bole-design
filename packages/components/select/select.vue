<script setup lang="ts">
import { watch, computed, onMounted, ref, toRefs, provide, reactive } from 'vue'
import { selectProps } from './props'
import { useProps } from '@bole-design/common'
import type { Placement } from '@floating-ui/dom'
import { Popper, PopperExposed } from '../popper'
import { Option } from '../option'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { ChevronDown } from '@bole-design/icons'
import { Icon } from '../icon'
import { useSelect, useSelectStates } from './useSelect'
import { selectKey } from '@bole-design/tokens/select'

defineOptions({
  name: 'Select'
})
const emit = defineEmits(['update:value', 'update:visible'])

const _props = defineProps(selectProps)
const props = useProps('select', _props, {
  value: -1,
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

const states = useSelectStates(props)
const { currentVisible, selectedLabel } = toRefs(states)
const { handleOptionClick, setVisible } = useSelect(props, states, emit)

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
onMounted(() => {
  if (props.visible) {
    fitPopperWidth()
  }
})
watch(
  () => currentVisible.value,
  value => {
    if (value) {
      fitPopperWidth()
    }
  }
)

provide(
  selectKey,
  reactive({
    props
  })
)
useClickOutside(referenceEl, handleClickOutSide, { ignore: [popperEl] })
</script>

<template>
  <div :class="className" ref="wrapper" @click="showListPanel">
    <div ref="reference" :class="selectorClass" tabindex="0">
      <div :class="ns.be('control')">{{ selectedLabel ? selectedLabel : '请选择' }}</div>
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
          @click="handleOptionClick(option.value)"
        >
        </Option>
      </div>
    </Popper>
  </div>
</template>
