<template>
  <div :class="classNames">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed } from 'vue'
import { tabsListProps } from './props'
import { useProps } from '@bole-design/common'

defineOptions({
  name: 'TabsList'
})
const _props = defineProps(tabsListProps)
const props = useProps('tabs-list', _props, {
  customStyle: false,
  tabPosition: 'top'
})

const ns = useNamespace('tabs-list')
const positionClass = computed(() => {
  return `is-${props.tabPosition}`
})
const classNames = computed(() => {
  if (props.customStyle) return []
  return [ns.b(), ns.bs('vars'), positionClass.value]
})
</script>
