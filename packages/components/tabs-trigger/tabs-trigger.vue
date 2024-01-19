<template>
  <div :class="classNames" @click="switchTabPane">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, inject } from 'vue'
import { tabsPaneProps } from '../tabs-pane/props'
import { useProps } from '@panda-ui/common/props'
import { tabsContextKey } from '@panda-ui/tokens/tabs'

defineOptions({
  name: 'TabsTrigger'
})

const emit = defineEmits(['tabClick'])
const _props = defineProps(tabsPaneProps)
const props = useProps('tabs-pane', _props, {
  value: ''
})

const active = computed(() => {
  return props.value === tabsRoot?.props.value
})
const tabsRoot = inject(tabsContextKey)
const ns = useNamespace('tabs-trigger')
const classNames = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    {
      [ns.be('active')]: active.value
    }
  ]
})

function switchTabPane() {
  tabsRoot?.changeTab(props.value)
}
</script>
