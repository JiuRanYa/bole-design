<template>
  <button ref="switchRef" :class="className" role="switch">
    <div :class="[ns.bs('signal')]">
      <slot name="icon">
        <Icon v-if="open && props.openIcon" :icon="props.openIcon"></Icon>
        <Icon v-if="!open && props.closeIcon" :icon="props.closeIcon"></Icon>
      </slot>
    </div>
    <div :class="[ns.bs('inner')]"></div>
  </button>
</template>

<script lang="ts">
import { useNamespace, useEventListener } from '@bole-design/hooks'
import { computed, defineComponent, ref, h, watch } from 'vue'
import { useProps } from '@bole-design/common'
import { Icon } from '@bole-design/components'
import { switchProps } from './props'

export default defineComponent({
  name: 'Switch',
  props: switchProps,
  setup(_props) {
    const ns = useNamespace('switch')
    const props = useProps('switch', _props, {
      value: {
        default: false
      },
      openIcon: null,
      closeIcon: null
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

    watch(
      () => props.value,
      value => {
        open.value = value
      }
    )
    function toggleState() {
      open.value = !open.value
    }

    useEventListener(switchRef, 'click', toggleState)

    return {
      ns,
      className,
      h,
      switchRef,
      props,
      open
    }
  }
})
</script>
