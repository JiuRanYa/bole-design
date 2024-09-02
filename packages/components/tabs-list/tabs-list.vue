<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, defineExpose, ref } from 'vue'
import { useProps } from '@panda-ui/common'
import { tabsListProps } from './props'

defineOptions({
  name: 'TabsList',
})
const _props = defineProps(tabsListProps)
const props = useProps('tabs-list', _props, {
  customStyle: false,
  tabPosition: 'top',
})

const wrapper = ref()

const ns = useNamespace('tabs-list')
const positionClass = computed(() => {
  return `is-${props.tabPosition}`
})
const classNames = computed(() => {
  if (props.customStyle)
    return []
  return [ns.b(), ns.bs('vars'), positionClass.value]
})

defineExpose({
  wrapper,
})
</script>

<template>
  <div ref="wrapper" :class="classNames">
    <slot />
  </div>
</template>
