<template>
  <div :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed } from 'vue'

defineOptions({
  name: 'TabPane'
})

const ns = useNamespace('tabs-pane')
const classNames = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
</script>
