<script setup lang="ts">
import { computed, provide } from 'vue'
import { useProps } from '@panda-ui/common'
import { useNamespace } from '@panda-ui/hooks'
import { scrollAreaKey } from '@panda-ui/tokens/scroll-area'
import type { ScrollAreaInstance } from './props'
import { scrollAreaProps } from './props'
import { useScroll } from './useScroll'
import Bar from './bar.vue'

defineOptions({
  name: 'ScrollArea',
})

const _props = defineProps(scrollAreaProps)
const props = useProps('ScrollArea', _props, {
  tag: 'div',
  height: '',
  maxHeight: null,
  watchResize: false,
  viewClass: [],
  wrapperClass: [],
  mode: 'vertical',
})

const ns = useNamespace('scroll-area')
const wrapperClass = computed(() => {
  return [ns.be('wrapper'), ns.bem('wrapper', 'hidden'), ...props.wrapperClass]
})
const wrapperStyle = computed(() => {
  return {
    height: props.height,
    maxHeight: props.maxHeight,
  }
})

const {
  wrapperRef,
  containerRef,
  viewRef,
  barRef,
  handleScroll,
  barSizePercentage,
  thumbState,
  scrollTo,
  handleTrackPointerDown,
  handleThumbPointerDown,
} = useScroll(props)

provide(scrollAreaKey, {
  handleTrackPointerDown,
  handleThumbPointerDown,
})

defineExpose<ScrollAreaInstance>({
  scrollTo,
})
</script>

<template>
  <div ref="containerRef" :class="ns.b()" :style="wrapperStyle">
    <div ref="wrapperRef" :class="wrapperClass" @scroll="handleScroll">
      <component :is="props.tag" ref="viewRef" :class="[ns.bm('view'), ...props.viewClass]">
        <slot />
      </component>

      <Bar
        ref="barRef"
        :mode="props.mode"
        :offset="thumbState.offset"
        :bar-length="barSizePercentage"
        :bar-opacity="thumbState.barOpacity"
        :dragging="thumbState.dragging"
        :always-show="props.alwaysShow"
      />
    </div>
  </div>
</template>
