<template>
  <button ref="switchRef" :class="className" role="switch">
    <div :class="[ns.bs('signal')]"></div>
    <div :class="[ns.bs('inner')]"></div>
  </button>
</template>

<script lang="ts">
import { useNamespace, useEventListener } from '@bole-design/hooks'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Switch',
  setup(_props) {
    const ns = useNamespace('switch')
    const className = computed(() => {
      return [
        ns.b(),
        ns.bs('vars'),
        {
          [ns.bm('open')]: open.value
        }
      ]
    })
    const open = ref(false)
    const switchRef = ref()

    function toggleState() {
      open.value = !open.value
    }

    useEventListener(switchRef, 'click', toggleState)

    return {
      ns,
      className,
      switchRef
    }
  }
})
</script>
