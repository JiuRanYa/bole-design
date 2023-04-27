<template>
  <button type="button" :class="classNames">
    <slot />
  </button>
</template>

<script lang="ts">
import { buttonProps } from './props'
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@bole-design/hooks'

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(props) {
    const ns = useNamespace('button')

    const type = computed(() => props.type || 'default')
    const size = computed(() => props.size || 'middle')

    const classNames = computed(() => {
      return {
        [ns.b()]: true,
        [ns.bs('vars')]: true,
        [ns.bm('inherit')]: props.inherit,
        [ns.bm(type.value)]: type.value !== 'default',
        [ns.bm(size.value)]: size.value !== 'middle',
        [ns.bm('disabled')]: props.disable,
      }
    })

    return {
      classNames,
    }
  },
})
</script>
