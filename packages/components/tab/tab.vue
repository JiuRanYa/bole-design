<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { useProps } from '@panda-ui/common'
import { tabProps } from './props'

defineOptions({
  name: 'Tab',
})

const _props = defineProps(tabProps)
const ns = useNamespace('tab')
useProps('tab', _props, {})

const className = computed(() => {
  return [ns.b(), ns.bs('content')]
})
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>
