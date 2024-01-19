<template>
  <div :class="ns.b()" :style="wrapperStyle">
    <div ref="wrapperRef" :class="wrapperClass" @scroll="handleScroll">
      <component :is="props.tag" :class="[ns.bm('view'), ...props.viewClass]" ref="viewRef">
        <slot />
      </component>

      <Bar
        ref="barRef"
        :move="thumbState.top"
        :barLength="barSizePercentage"
        :barOpacity="thumbState.barOpacity"
        :dragging="thumbState.dragging"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Bar from './bar.vue'
import { computed, provide } from 'vue'
import { useProps } from '@panda-ui/common'
import { ScrollAreaInstance, scrollAreaProps } from './props'
import { useNamespace } from '@panda-ui/hooks'
import { useScroll } from './useScroll'
import { scrollAreaKey } from '@panda-ui/tokens/scroll-area'

defineOptions({
  name: 'ScrollArea'
})

const _props = defineProps(scrollAreaProps)
const props = useProps('ScrollArea', _props, {
  tag: 'div',
  height: null,
  maxHeight: null,
  watchResize: false,
  viewClass: [],
  wrapperClass: []
})

const ns = useNamespace('scroll-area')
const wrapperClass = computed(() => {
  return [ns.be('wrapper'), ns.bem('wrapper', 'hidden'), ...props.wrapperClass]
})
const wrapperStyle = computed(() => {
  return {
    height: props.height,
    maxHeight: props.maxHeight
  }
})

const {
  wrapperRef,
  viewRef,
  barRef,
  handleScroll,
  barSizePercentage,
  thumbState,
  scrollTo,
  handleTrackPointerDown,
  handleThumbPointerDown
} = useScroll(props)

provide(scrollAreaKey, {
  handleTrackPointerDown,
  handleThumbPointerDown
})

defineExpose<ScrollAreaInstance>({
  scrollTo
})
</script>
