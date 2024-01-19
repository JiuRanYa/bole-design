<template>
  <div :class="classNames" @tabClick="changeTab">
    <TabsList :tabPosition="tabPosition">
      <slot name="trigger"></slot>
    </TabsList>
    <div :class="{ [ns.bs('content')]: true }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProps } from '@panda-ui/common'
import { tabsProps } from './props'
import { useNamespace } from '@panda-ui/hooks'
import { tabsContextKey } from '@panda-ui/tokens/tabs'
import { watch, provide, reactive, computed, getCurrentInstance } from 'vue'
import { TabsList } from '../tabs-list'

defineOptions({
  name: 'Tabs'
})

const ctx = getCurrentInstance()!

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
  return [ns.b(), ns.bm(props.tabPosition)]
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
