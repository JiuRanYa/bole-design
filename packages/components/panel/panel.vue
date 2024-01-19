<template>
  <div :class="classNames" :style="panelStyle" data-panel :data-panel-id="panelId">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, inject, onMounted, ref, nextTick } from 'vue'
import { panelProps } from './props'
import { PanelData } from './types'
import { useProps } from '@panda-ui/common'
import { panelGroupKey } from '@panda-ui/tokens/panel-group'
import { useUniqueId } from '../panel-group/utils'

defineOptions({
  name: 'Panel'
})

const _props = defineProps(panelProps)
const props = useProps('panel', _props, {
  defaultSizePercentage: _props.defaultSizePercentage,
  minSizePercentage: _props.minSizePercentage,
  maxSizePercentage: _props.maxSizePercentage,
  minGridCol: 3
})
const panelId = useUniqueId()

const ns = useNamespace('panel')
const classNames = computed(() => {
  return [ns.b(), ns.bs('vars')]
})

const panelData = ref<PanelData>({
  constraints: {
    defaultSizePercentage: props.defaultSizePercentage,
    minSizePercentage: props.minSizePercentage ?? 0,
    maxSizePercentage: props.maxSizePercentage ?? 100,
    minGridCol: props.minGridCol ?? 3
  }
})

const panelRoot = inject(panelGroupKey)!!

const panelStyle = computed(() => {
  return panelRoot?.getPanelStyle(panelData)
})

onMounted(() => {
  panelRoot?.registerPanel(panelData)
})
</script>
