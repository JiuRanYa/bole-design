<template>
  <div :class="barClass">
    <div :class="ns.be('track')" @pointerdown="handleTrackPointerDown">
      <div :class="ns.be('bar')" @pointerdown="handleThumbPointerDown" :style="barStyle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { scrollAreaKey } from '@panda-ui/tokens/scroll-area'

defineOptions({
  name: 'ScrollBar'
})

const { handleTrackPointerDown, handleThumbPointerDown } = inject(scrollAreaKey)!

const props = defineProps({
  barLength: {
    type: Number
  },
  move: {
    type: Number
  },
  barOpacity: Number,
  dragging: Boolean
})
const barStyle = computed(() => {
  return {
    height: `${props.barLength}%`,
    transform: `translateY(${props.move}%)`,
    opacity: props.barOpacity
  }
})

const ns = useNamespace('scroll-bar')

const barClass = computed(() => {
  return [
    ns.b(),
    {
      [ns.be('show')]: props.dragging
    }
  ]
})
const barElement = ref()

defineExpose({
  barElement
})
</script>
