<template>
  <div
    ref="wrapper"
    :class="className"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerOut"
  >
    <div ref="reference" :class="[ns.be('trigger')]" @click="handleTriggerClick">
      <slot></slot>
    </div>

    <Popper
      ref="popper"
      :visible="currentVisible"
      :style="popperStyle"
      :class="{
        [ns.bs('nested')]: isNested
      }"
      @mouseenter="handleTriggerEnter"
      @mouseleave="handleTriggerOut"
      :transition="props.transitionName"
    >
      <slot name="drop"></slot>
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { Placement, StyleType, useProps, useZIndex } from '@panda-ui/common'
import { Popper, PopperExposed } from '@panda-ui/components'
import { dropdownProps } from './props'
import { useClickOutside, useNamespace, usePopper, useSetTimeout } from '@panda-ui/hooks'
import { computed, inject, nextTick, onMounted, provide, reactive, ref, watch } from 'vue'
import { DROPDOWN_STATE } from '@panda-ui/tokens/dropdown'

defineOptions({
  name: 'Dropdown'
})

const _props = defineProps(dropdownProps)
const props = useProps('dropdown', _props, {
  visible: false,
  placement: 'bottom',
  transfer: true,
  transitionName: () => ns.ns('drop'),
  trigger: 'click'
})

const ns = useNamespace('dropdown')
const className = computed(() => {
  return [ns.b()]
})

const emit = defineEmits(['update:visible'])

const popper = ref<PopperExposed>()
const wrapper = ref()
const reference = ref()

const placement = ref(props.placement)
const transfer = ref(props.transfer)

const popperEl = computed(() => popper.value?.wrapper)

const { x, y, update } = usePopper({
  referenceEl: computed(() => reference.value),
  popperEl,
  placement,
  transfer
})

const getIndex = useZIndex()
const zIndex = computed(() => getIndex())
const currentVisible = ref(props.visible)

const popperStyle = computed<StyleType>(() => {
  return {
    position: 'absolute',
    'transform-origin': fitTransform.value,
    left: `${x.value || 0}px`,
    top: `${y.value || 0}px`,
    zIndex: zIndex.value
  }
})

const fitTransform = computed(() => {
  const isTop = props.placement.startsWith('top')
  return `center ${isTop ? 'bottom' : 'top'}`
})

function patchVisible(value: boolean) {
  currentVisible.value = value
  emit('update:visible', currentVisible.value)
}

const { timer } = useSetTimeout()

function handleTriggerClick() {
  if (props.trigger === 'click') {
    patchVisible(!currentVisible.value)
  }
}

function handleTriggerEnter() {
  if (props.trigger === 'hover') {
    clearTimeout(timer.hover)

    if (typeof parentState?.handleTriggerEnter === 'function') {
      parentState.handleTriggerEnter()
    }

    timer.hover = setTimeout(() => {
      patchVisible(true)
    }, 250)
  }
}
function handleTriggerOut() {
  if (props.trigger === 'hover') {
    clearTimeout(timer.hover)

    if (typeof parentState?.handleTriggerOut === 'function') {
      parentState.handleTriggerOut()
    }

    timer.hover = setTimeout(() => {
      patchVisible(false)
    }, 250)
  }
}

function handleClickOutside() {
  patchVisible(false)
}

const parentState = inject(DROPDOWN_STATE, null)
const isNested = !!parentState

function setPlacement(value: Placement) {
  const [xPlacement] = value.split('-')

  if (isNested && xPlacement !== 'right' && xPlacement !== 'left') {
    placement.value = 'right-start'
  } else {
    placement.value = value
  }
}

watch(
  () => props.visible,
  () => {
    if (props.visible === currentVisible.value) return
    currentVisible.value = props.visible
  }
)

provide(
  DROPDOWN_STATE,
  reactive({
    visible: currentVisible,
    handleTriggerEnter,
    handleTriggerOut
  })
)

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', handleResize)
    setPlacement(props.placement)
  })
})

useClickOutside(handleClickOutside, { ignore: [popperEl] }, wrapper)

function handleResize() {
  update()
}
</script>
