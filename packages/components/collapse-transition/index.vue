<template>
  <transition :name="ns.b()">
    <slot />
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProps } from '@bole-design/common'
import { collapseTransitionProps } from './props'
import { useNamespace } from '@bole-design/hooks'

export default defineComponent({
  name: 'collapse-transition',
  props: collapseTransitionProps,
  setup(_props) {
    const props = useProps('collapse-transition', _props, {
      transition: 'collapse-transition'
    })
    const ns = useNamespace('collapse-transition')
    console.log(ns.b())

    return {
      props,
      ns
    }
  }
})
</script>
