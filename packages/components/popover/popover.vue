<template>
  <Portal :to="to">
    <slot></slot>
  </Portal>
</template>

<script lang="ts">
import { useProps } from '@bole-design/common'
import { defineComponent } from 'vue'
import { popoverProps } from './props'
import { Portal } from '../portal'

export default defineComponent({
  name: 'Popover',
  props: popoverProps,
  components: {
    Portal
  },
  setup(_props) {
    const props = useProps('popover', _props, {
      to: ''
    })

    return {
      props
    }
  }
})
</script>
