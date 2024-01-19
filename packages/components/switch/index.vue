<template>
  <button ref="switchRef" :class="className" role="switch" :style="switchStyle">
    <div :class="[ns.bs('signal')]">
      <slot name="icon">
        <Icon v-if="open && props.openIcon" :icon="props.openIcon"></Icon>
        <Icon v-if="!open && props.closeIcon" :icon="props.closeIcon"></Icon>
      </slot>
    </div>
    <div :class="[ns.bs('inner')]"></div>
  </button>
</template>

<script lang="ts" setup>
import { useNamespace, useEventListener } from '@panda-ui/hooks'
import { computed, ref, watch } from 'vue'
import { useProps } from '@panda-ui/common'
import { Icon } from '@panda-ui/components'
import { switchProps } from './props'

defineOptions({
  name: 'Switch'
})

const emit = defineEmits(['update:value'])
const _props = defineProps(switchProps)
const ns = useNamespace('switch')
const props = useProps('switch', _props, {
  value: {
    default: false
  },
  openIcon: null,
  closeIcon: null,
  size: 'default'
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
const open = ref(props.value)

const switchStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      [ns.ns('height')]: `${props.size}px`
    }
  }
})

function toggleState() {
  open.value = !open.value
}

watch(
  () => props.value,
  value => {
    open.value = value
  }
)
watch(open, value => {
  emit('update:value', value)
})

useEventListener(switchRef, 'click', toggleState)
</script>
