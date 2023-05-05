<template>
  <button type="button" :class="classNames">
    <slot />
  </button>
</template>

<script lang="ts">
import { buttonProps } from './props'
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@bole-design/hooks'
import { useProps } from '@bole-design/common'

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(_props) {
    const ns = useNamespace('button')

    const props = useProps('button', _props, {
      type: 'default',
      size: 'middle'
    })

    console.log(props)

    const classNames = computed(() => {
      return {
        [ns.b()]: true,
        [ns.bs('vars')]: true,
        [ns.bm('inherit')]: props.inherit,
        [ns.bm(props.type)]: props.type !== 'default',
        [ns.bm(props.size)]: props.size !== 'middle',
        [ns.bm('disabled')]: props.disable
      }
    })

    return {
      classNames
    }
  }
})
</script>
