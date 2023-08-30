<template>
  <div :class="classNames" @tabClick="changeTab">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { tabsProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import { tabsContextKey } from '@bole-design/tokens/tabs'
import { watch, provide, reactive, computed } from 'vue'

defineOptions({
  name: 'Tabs'
})

const emit = defineEmits(['update:value'])
const ns = useNamespace('tabs')
const _props = defineProps(tabsProps)
const props = useProps('tabs', _props, {
  value: '',
  tabPosition: 'top'
})

const states = reactive({
  currentValue: props.value
})

const classNames = computed(() => {
  return [ns.be('main'), ns.bs(props.tabPosition)]
})

function changeTab(tabName: string) {
  states.currentValue = tabName
}

watch(
  () => states.currentValue,
  value => {
    emit('update:value', value)
  }
)
provide(
  tabsContextKey,
  reactive({
    props,
    changeTab
  })
)
</script>
