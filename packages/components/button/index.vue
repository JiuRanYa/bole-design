<template>
  <button type="button" :class="classNames">button</button>
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

    const classNames = computed(() => {
      return {
        [ns.b()]: true,
        [ns.bm('inherit')]: props.inherit,
        [ns.bm(type.value)]: type.value !== 'default',
      }
    })

    return {
      classNames,
    }
  },
})
</script>
