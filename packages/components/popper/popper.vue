<template>
  <Portal :to="to">
    <div ref="wrapper" v-bind="$attrs" :class="classNames">
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
  components: {
    Portal
  },
  setup(_props) {
    const props = useProps('popper', _props, {
      to: ''
    })
    const wrapper = ref<HTMLElement>()
    const ns = useNamespace('popper')
    const classNames = computed(() => {
      return [ns.b()]
    })

    return {
      props,
      wrapper,
      classNames
    }
  }
})
</script>
