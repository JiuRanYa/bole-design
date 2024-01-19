<script setup lang="ts">
import { watch, computed, onMounted, ref, provide, reactive } from 'vue'
import { selectProps } from './props'
import { useProps } from '@panda-ui/common'
import type { Placement } from '@floating-ui/dom'
import { Popper } from '../popper'
import { Option } from '../option'
import { useClickOutside, useNamespace } from '@panda-ui/hooks'
import { ChevronDown } from '@panda-ui/icons'
import { Icon } from '../icon'
import { Input } from '../input'
import { Tag } from '../tag'
import { useSelect } from './useSelect'
import { selectKey } from '@panda-ui/tokens/select'
import { Xmark } from '@panda-ui/icons'
import { ScrollArea } from '../scroll-area'

defineOptions({
  name: 'Select'
})

const emit = defineEmits(['update:value', 'update:visible'])

const _props = defineProps(selectProps)
const props = useProps('select', _props, {
  value: null,
  visible: false,
  transitionName: () => ns.ns('drop'),
  listClass: [],
  fitPopper: true,
  options: {
    default: () => [],
    static: true
  },
  placement: 'bottom-start',
  to: 'body',
  filterable: false,
  creatable: false,
  clearable: false
})

const ns = useNamespace('select')
const {
  x,
  y,
  wrapper,
  popper,
  popperEl,
  reference,
  referenceEl,

  states,
  setVisible,
  showClearIcon,
  onInput,
  filteredOptions,
  onKeyboardUp,
  onKeyboardDown,
  onKeyboardSelect,
  onKeyboardDelete,
  handleOptionClick,
  handleClickOutSide,
  handleClearEmitValue,
  isSelected
} = useSelect(props, emit)

const placement = ref<Placement>(props.placement)
const dropMargin = computed(() => ns.bm(placement.value))

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
      [ns.bem('selector', 'focused')]: states.currentVisible
    }
  ]
})
const popperStyle = computed(() => {
  return {
    position: 'absolute',
    'transform-origin': fitTransform.value,
    left: `${x.value || 0}px`,
    top: `${y.value || 0}px`
  }
})

const fitTransform = computed(() => {
  const isTop = props.placement.startsWith('top')
  return `center ${isTop ? 'bottom' : 'top'}`
})

function showListPanel() {
  setVisible(!states.currentVisible)
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

watch(
  () => states.currentVisible,
  value => {
    if (value) {
      fitPopperWidth()
    }
  }
)

onMounted(() => {})
provide(
  selectKey,
  reactive({
    props,
    states
  })
)
useClickOutside(handleClickOutSide, { ignore: [popperEl] }, referenceEl)
</script>

<template>
  <div :class="className" ref="wrapper" @click="showListPanel">
    <div ref="reference" :class="selectorClass" tabindex="0">
      <div :class="ns.be('control')">
        <input
          v-model="states.inputValue"
          :readonly="!props.filterable"
          :placeholder="states.selectedLabel"
          :class="ns.be('input')"
          @input="onInput"
          @keydown.delete.stop="onKeyboardDelete"
          @keydown.up.stop.prevent="onKeyboardUp"
          @keydown.down.stop.prevent="onKeyboardDown"
          @keydown.enter.stop.prevent="onKeyboardSelect"
        />
      </div>
      <div :class="[ns.be('icon'), ns.be('suffix')]">
        <Icon
          :icon="ChevronDown"
          :class="ns.be('arrow')"
          :style="{ opacity: showClearIcon ? '0%' : '' }"
        ></Icon>
        <Transition name="fade-in">
          <Icon
            v-if="showClearIcon"
            :icon="Xmark"
            @click.stop="handleClearEmitValue"
            :scale="1.1"
            :class="ns.be('clear')"
          ></Icon>
        </Transition>
      </div>
    </div>
    <Popper
      ref="popper"
      :style="popperStyle"
      :to="props.to"
      :visible="states.currentVisible"
      :transition="props.transitionName"
      :class="[ns.be('popper'), ns.bs('vars'), ns.bm('popper')]"
    >
      <ScrollArea
        max-height="200px"
        :view-class="[ns.be('scroll-area')]"
        :style="{ width: '100%' }"
      >
        <div :class="[ns.be('list'), dropMargin, props.listClass]">
          <slot v-if="$slots.prepend" name="prepend"></slot>
          <Option
            v-for="(option, idx) in filteredOptions"
            :index="idx"
            :label="option.label"
            :value="option.value"
            @click="handleOptionClick(option)"
          >
            <slot
              name="option"
              :option="option"
              :index="idx"
              :isSelected="isSelected(option)"
            ></slot>
          </Option>
          <slot v-if="$slots.append" name="append"></slot>
        </div>
      </ScrollArea>
    </Popper>
  </div>
</template>
