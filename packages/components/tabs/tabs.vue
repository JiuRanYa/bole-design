<script setup lang="ts">
import { emitEvent, useProps } from '@panda-ui/common'
import { useNamespace, useResizeObserver } from '@panda-ui/hooks'
import { tabsContextKey } from '@panda-ui/tokens/tabs'
import { computed, nextTick, onMounted, provide, reactive, ref, watch } from 'vue'
import { TabsList } from '../tabs-list'
import type { TabsTriggerState } from '../tabs-trigger/props'
import type { TabTriggerEmitState } from './props'
import { tabsProps } from './props'

defineOptions({
  name: 'Tabs',
})

const _props = defineProps(tabsProps)
const emit = defineEmits(['update:value'])
const ns = useNamespace('tabs')
const props = useProps('tabs', _props, {
  value: '',
  tabPosition: 'top',
})

const states = reactive({
  currentValue: props.value,
})
const triggerAttrMap = new Map<string, TabsTriggerState>()

const classNames = computed(() => {
  return [ns.b(), ns.bm(props.tabPosition)]
})

function changeTab(tabName: string, state: TabTriggerEmitState, shouldChangeTab: boolean) {
  if (shouldChangeTab)
    states.currentValue = tabName

  emitEvent(props.onTabClick, state)
}

const tabsRef = ref()
const tabsListRef = ref()
const transitionBoxStyle = reactive({
  width: '',
  height: '',
  left: '4px',
  right: '4px',
  top: '4px',
  bottom: '4px',
})

function calcTransitionBoxOffset() {
  const idx = [...triggerAttrMap.keys()].findIndex(i => i === states.currentValue)

  const tabEl = [...triggerAttrMap.values()][Math.max(idx, 0)]?.el

  if (!tabEl)
    return

  transitionBoxStyle.top = `${tabEl.offsetTop}px`
  transitionBoxStyle.left = `${tabEl.offsetLeft}px`
}

function calcTransitionBoxStyle() {
  const rect = triggerAttrMap.get(states.currentValue)?.el.getBoundingClientRect()

  transitionBoxStyle.width = `${rect?.width}px`
  transitionBoxStyle.height = `${rect?.height}px`

  calcTransitionBoxOffset()
}

function recordTriggerAttr(key: string, value: TabsTriggerState) {
  triggerAttrMap.set(key, value)
}

watch(() => props.value, () => {
  states.currentValue = props.value
})

watch(
  () => states.currentValue,
  (value) => {
    calcTransitionBoxStyle()
    emit('update:value', value)
  },
)

onMounted(() => {
  nextTick(() => {
    calcTransitionBoxStyle()
  })

  const { observeResize } = useResizeObserver()
  observeResize(tabsRef.value, () => {
    nextTick(() => {
      calcTransitionBoxStyle()
    })
  })
})

provide(
  tabsContextKey,
  reactive({
    props,
    changeTab,
    recordTriggerAttr,
  }),
)
</script>

<template>
  <div ref="tabsRef" :class="classNames" @tabClick="changeTab">
    <TabsList ref="tabsListRef" :tab-position="tabPosition">
      <div :class="ns.bm('transition-box')" :style="transitionBoxStyle" />
      <slot name="trigger" />
    </TabsList>
    <div v-if="$slots.default" :class="{ [ns.bs('content')]: true }">
      <slot />
    </div>
  </div>
</template>
