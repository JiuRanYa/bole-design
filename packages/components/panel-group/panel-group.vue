<template>
  <div
    ref="container"
    :class="classNames"
    :style="splitPanesStyle"
    data-panel-group
    :data-panel-group-id="groupId"
  >
    <slot></slot>

    <div :class="ns.be('preview')" v-if="props.grid && states.showPreviewDots">
      <div v-for="i in 12" :class="ns.be('preview-box')">
        <div :class="ns.be('preview-dot')"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { panelGroupProps } from './props'
import { useProps } from '@panda-ui/common'
import { useSplit } from './useSplit'
import { panelGroupKey } from '@panda-ui/tokens/panel-group'
import { useUniqueId } from './utils'

defineOptions({
  name: 'PanelGroup'
})

const ns = useNamespace('panel-group')
const _props = defineProps(panelGroupProps)
const props = useProps('panel-group', _props, {
  direction: 'horizontal',
  grid: false
})

const groupId = useUniqueId()

const classNames = computed(() => {
  return [ns.b(), ns.bs('vars'), ns.bs(props.direction)]
})

const splitPanesStyle = computed(() => {
  return {}
})

const {
  states,
  registerResizeHandler,
  getPanelStyle,
  registerPanel,
  startDragging,
  stopDragging,
  container,
  dragStates
} = useSplit(props, groupId)

provide(panelGroupKey, {
  groupProps: props,
  groupId,
  dragStates,
  registerPanel,
  getPanelStyle,
  startDragging,
  registerResizeHandler,
  stopDragging
})
</script>
