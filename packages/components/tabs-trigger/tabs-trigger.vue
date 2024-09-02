<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, inject, nextTick, onMounted, ref } from 'vue'
import { useProps } from '@panda-ui/common/props'
import { tabsContextKey } from '@panda-ui/tokens/tabs'
import { tabsTriggerProps } from './props'

defineOptions({
  name: 'TabsTrigger',
})

const _props = defineProps(tabsTriggerProps)
// const emit = defineEmits(['tabClick'])
const props = useProps('tabs-pane', _props, {
  value: '',
  disabled: false,
})
const triggerRef = ref<HTMLDivElement>()

const active = computed(() => {
  return props.value === tabsRoot?.props.value
})
const disabled = computed(() => props.disabled)
const tabsRoot = inject(tabsContextKey)
const ns = useNamespace('tabs-trigger')
const classNames = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    {
      [ns.be('active')]: active.value,
    },
    {
      [ns.be('disabled')]: disabled.value,
    },
  ]
})

function switchTabPane() {
  tabsRoot?.changeTab(props.value, {
    name: props.value,
    disabled: disabled.value,
  }, !disabled.value)
}

function registerTriggerAttr() {
  if (!triggerRef.value)
    return

  tabsRoot?.recordTriggerAttr(props.value, {
    el: triggerRef.value,
  })
}

onMounted(() => {
  nextTick(registerTriggerAttr)
})
</script>

<template>
  <div ref="triggerRef" :class="classNames" @click="switchTabPane">
    <slot />
  </div>
</template>
