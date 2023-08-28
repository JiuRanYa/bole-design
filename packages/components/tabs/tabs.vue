<template>
  <div>
    <div
      :class="{
        [ns.be('main')]: true
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { tabsProps } from './props'
import { useNamespace } from '@bole-design/hooks'

defineOptions({
  name: 'Tabs'
})

const ns = useNamespace('tabs')
const _props = defineProps(tabsProps)
const props = useProps('tabs', _props, {
  value: ''
})
</script>
