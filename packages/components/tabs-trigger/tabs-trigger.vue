<template>
  <div :class="classNames" @click="switchTabPane">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed, inject } from 'vue'
import { tabsPaneProps } from '../tabs-pane/props'
import { useProps } from '@bole-design/common/props'
import { tabsContextKey } from '@bole-design/tokens/tabs'

defineOptions({
  name: 'TabsTrigger'
})

const _props = defineProps(tabsPaneProps)
const props = useProps('tabs-pane', _props, {
  value: ''
})

const tabsRoot = inject(tabsContextKey)
const ns = useNamespace('tabs-trigger')
const classNames = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
</script>
