<template>
  <Portal :to="to">
    <transition :name="props.transition">
      <div v-if="visible" ref="wrapper" :class="classNames" v-bind="$attrs" :style="{ zIndex }">
        <slot></slot>
      </div>
    </transition>
  </Portal>
</template>

<script lang="ts">
import { useProps, useZIndex } from '@panda-ui/common'
import { computed, defineComponent, ref } from 'vue'
import { popperProps } from './props'
import { Portal } from '../portal'
import { useNamespace } from '@panda-ui/hooks'

export default defineComponent({
  name: 'Popper',
  props: popperProps,
  inheritAttrs: false,
  components: {
    Portal
  },
  setup(_props) {
    const ns = useNamespace('popper')
    const props = useProps('popper', _props, {
      to: 'body',
      visible: false,
      transition: ''
    })
    const wrapper = ref<HTMLElement>()
    const classNames = computed(() => {
      return [ns.b(), props.to !== 'body' && ns.bm('inherit')]
    })
    const to = computed(() => props.to)
    const getIndex = useZIndex()
    const zIndex = computed(() => getIndex())

    return {
      props,
      wrapper,
      classNames,
      zIndex,
      to
    }
  }
})
</script>
