<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { tabProps } from './props'
import { useProps } from '@panda-ui/common'

defineOptions({
  name: 'Tab'
})

const ns = useNamespace('tab')
const _props = defineProps(tabProps)
const props = useProps('tab', _props, {})

const className = computed(() => {
  return [ns.b(), ns.bs('content')]
})
</script>
