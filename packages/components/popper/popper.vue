<template>
  <Portal :to="to">
    <div v-if="visible" ref="wrapper" v-bind="$attrs" :class="classNames">
      <slot></slot>
    </div>
  </Portal>
</template>

<script lang="ts">
import { useProps } from '@bole-design/common'
import { computed, defineComponent, ref } from 'vue'
import { popperProps } from './props'
import { Portal } from '../portal'
import { useNamespace } from '@bole-design/hooks'

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
      to: '',
      visible: false
    })
    const wrapper = ref<HTMLElement>()
    const classNames = computed(() => {
      return [ns.b(), props.to !== 'body' && ns.bm('inherit')]
    })

    return {
      props,
      wrapper,
      classNames
    }
  }
})
</script>
