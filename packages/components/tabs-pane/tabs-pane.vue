<template>
  <div
    v-show="active"
    :class="classNames"
    :id="`pane-${paneName}`"
    role="tabpanel"
    :aria-hidden="!active"
    :aria-labelledby="`tab-${paneName}`"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, inject } from 'vue'
import { tabsPaneProps } from './props'
import { useProps } from '@panda-ui/common'
import { tabsContextKey } from '@panda-ui/tokens/tabs'

defineOptions({
  name: 'TabsPane'
})

const _props = defineProps(tabsPaneProps)
const props = useProps('tabs-pane', _props, {
  value: ''
})
const ns = useNamespace('tabs-pane')

const paneName = computed(() => props.value)
const classNames = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const active = computed(() => {
  return props.value === tabsRoot?.props.value
})

const tabsRoot = inject(tabsContextKey)
</script>
