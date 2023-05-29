<template>
  <button ref="switchRef" :class="className" role="switch">
    <div :class="[ns.bs('signal')]"></div>
    <div :class="[ns.bs('inner')]"></div>
  </button>
</template>

<script lang="ts">
import { useNamespace, useEventListener } from '@bole-design/hooks'
import { computed, defineComponent, ref } from 'vue'
import { useProps } from '@bole-design/common'
import { switchProps } from './props'

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  setup(_props) {
    const ns = useNamespace('switch')
    const props = useProps('switch', _props, {
      value: {
        default: false
      }
    })

    const className = computed(() => {
      return [
        ns.b(),
        ns.bs('vars'),
        {
          [ns.bm('open')]: open.value
        }
      ]
    })

    const open = ref(props.value)
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
