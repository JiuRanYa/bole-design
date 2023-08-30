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
import { tabsContextKey } from '@bole-design/tokens/tabs'
import { provide, reactive } from 'vue'

defineOptions({
  name: 'Tabs'
})

const ns = useNamespace('tabs')
const _props = defineProps(tabsProps)
const props = useProps('tabs', _props, {
  value: ''
})

provide(
  tabsContextKey,
  reactive({
    props
  })
)
</script>
