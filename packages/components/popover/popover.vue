<template>
  <Portal>
    <slot></slot>
  </Portal>
</template>

<script setup>
import { useProps } from '@bole-design/common'
import { defineComponent } from 'vue'
import { popoverProps } from './props'
import { Portal } from '../portal'

defineComponent({
  name: 'Popover',
  props: popoverProps,
  components: {
    Portal
  },
  setup(_props) {
    const props = useProps('popover', _props, {
      to: ''
    })

    console.log(props.to)

    return {
      props
    }
  }
})
</script>
