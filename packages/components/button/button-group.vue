<template>
  <div :class="classNames">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useProps } from '@panda-ui/common'
import { buttonGroupProps } from './props'
import { useNamespace } from '@panda-ui/hooks'
import { computed } from 'vue'

defineOptions({
  name: 'ButtonGroup'
})

const ns = useNamespace('button-group')

const _props = defineProps(buttonGroupProps)

const props = useProps('buttonGroup', _props, {
  circle: false
})

const classNames = computed(() => {
  return [
    ns.b(),
    {
      [ns.bm('circle')]: props.circle
    }
  ]
})
</script>
