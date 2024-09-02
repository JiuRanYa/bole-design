<script setup lang="ts">
import { useProps } from '@panda-ui/common'
import { useNamespace } from '@panda-ui/hooks'
import { computed } from 'vue'
import { buttonGroupProps } from './props'

defineOptions({
  name: 'ButtonGroup',
})

const _props = defineProps(buttonGroupProps)

const ns = useNamespace('button-group')

const props = useProps('buttonGroup', _props, {
  circle: false,
})

const classNames = computed(() => {
  return [
    ns.b(),
    {
      [ns.bm('circle')]: props.circle,
    },
  ]
})
</script>

<template>
  <div :class="classNames">
    <slot />
  </div>
</template>
