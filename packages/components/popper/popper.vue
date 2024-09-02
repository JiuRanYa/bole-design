<script lang="ts">
import { useProps, useZIndex } from '@panda-ui/common'
import { computed, defineComponent, ref } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Portal } from '../portal'
import { popperProps } from './props'

export default defineComponent({
  name: 'Popper',
  components: {
    Portal,
  },
  inheritAttrs: false,
  props: popperProps,
  setup(_props) {
    const ns = useNamespace('popper')
    const props = useProps('popper', _props, {
      to: '',
      visible: false,
      alive: false,
      transition: '',
    })
    const wrapper = ref<HTMLElement>()
    const classNames = computed(() => {
      return [ns.b(), {
        [ns.bm('inherit')]: props.to !== 'body' && props.inherit,
      }]
    })
    const to = computed(() => props.to)
    const getIndex = useZIndex()
    const zIndex = computed(() => getIndex())

    return {
      props,
      wrapper,
      classNames,
      zIndex,
      to,
    }
  },
})
</script>

<template>
  <Portal :to="to">
    <transition
      :name="props.transition"
      @before-enter="props.onBeforeEnter"
      @enter="props.onEnter"
      @after-enter="props.onAfterEnter"
      @enter-cancelled="props.onEnterCancelled"
      @before-leave="props.onBeforeLeave"
      @leave="props.onLeave"
      @after-leave="props.onAfterLeave"
      @leave-cancelled="props.onLeaveCancelled"
    >
      <div
        v-if="props.alive || props.visible"
        v-show="!props.alive || props.visible"
        v-bind="$attrs"
        ref="wrapper"
        :class="classNames"
        :style="{ zIndex }"
      >
        <slot />
      </div>
    </transition>
  </Portal>
</template>
