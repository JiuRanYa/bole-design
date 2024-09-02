<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, inject, ref } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { scrollAreaKey } from '@panda-ui/tokens/scroll-area'
import type { ScrollAreaMode } from './props'

defineOptions({
  name: 'ScrollBar',
})

const props = defineProps({
  barLength: {
    type: Number,
  },
  offset: {
    type: Number,
  },
  barOpacity: Number,
  dragging: Boolean,
  mode: {
    type: String as PropType<ScrollAreaMode>,
    default: 'vertical',
  },
  alwaysShow: {
    type: Boolean,
  },
})

const { handleTrackPointerDown, handleThumbPointerDown } = inject(scrollAreaKey)!

const barStyle = computed(() => {
  const barSizeAttr = props.mode === 'vertical' ? 'height' : 'width'
  const translateAttr = props.mode === 'vertical' ? 'translateY' : 'translateX'
  return {
    [barSizeAttr]: `${props.barLength}%`,
    transform: `${translateAttr}(${props.offset}%)`,
    opacity: props.barOpacity,
  }
})

const ns = useNamespace('scroll-bar')

const barClass = computed(() => {
  return [
    ns.b(),
    {
      [ns.be('show')]: props.dragging || props.alwaysShow,
    },
    {
      [ns.bm(props.mode)]: true,
    },
  ]
})
const trackClass = computed(() => {
  return [ns.be('track')]
})
const barElement = ref()

defineExpose({
  barElement,
})
</script>

<template>
  <div :class="barClass">
    <div :class="trackClass" @pointerdown="handleTrackPointerDown">
      <div :class="ns.be('bar')" :style="barStyle" @pointerdown="handleThumbPointerDown" />
    </div>
  </div>
</template>
