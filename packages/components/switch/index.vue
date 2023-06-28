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
  emits: ['update:modelValue'],
  setup(_props, { emit }) {
    const ns = useNamespace('switch')
    const props = useProps('switch', _props, {
      modelValue: {
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

    const switchRef = ref()
    const open = ref(props.modelValue)

    function toggleState() {
      open.value = !open.value
    }

    watch(
      () => props.modelValue,
      value => {
        open.value = value
      }
    )
    watch(open, value => {
      emit('update:modelValue', value)
    })

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
