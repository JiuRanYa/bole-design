<template>
  <button type="button" :class="buttonStyle">button</button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useNamespace } from '@bole-design/hooks'

export default defineComponent({
  name: 'Button',
  setup(props) {
    const ns = useNamespace('button')
    const buttonStyle = computed(() => {
      return {
        [ns.b()]: true,
      }
    })

    return {
      buttonStyle,
    }
  },
})
</script>
