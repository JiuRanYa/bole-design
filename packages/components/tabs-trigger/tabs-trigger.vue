<template>
  <div :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed } from 'vue'

defineOptions({
  name: 'TabsTrigger'
})
const ns = useNamespace('tabs-trigger')
const classNames = computed(() => {
  return [ns.b()]
})
</script>
