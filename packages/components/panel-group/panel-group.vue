<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { useProps } from '@panda-ui/common'
import { panelGroupKey } from '@panda-ui/tokens/panel-group'
import { panelGroupProps } from './props'
import { useSplit } from './useSplit'
import { useUniqueId } from './utils'

defineOptions({
  name: 'PanelGroup',
})

const _props = defineProps(panelGroupProps)
const ns = useNamespace('panel-group')
const props = useProps('panel-group', _props, {
  direction: 'horizontal',
  grid: false,
})

const parentState = inject(panelGroupKey, null)
const isNested = !!parentState

const groupId = useUniqueId()

const classNames = computed(() => {
  return [ns.b(), ns.bs('vars'), ns.bs(props.direction), {
    [ns.bs('nested')]: isNested,
  }]
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
  dragStates,
} = useSplit(props, groupId)

provide(panelGroupKey, {
  groupProps: props,
  groupId,
  dragStates,
  registerPanel,
  getPanelStyle,
  startDragging,
  registerResizeHandler,
  stopDragging,
})
</script>

<template>
  <div
    ref="container"
    :class="classNames"
    :style="splitPanesStyle"
    data-panel-group
    :data-panel-group-id="groupId"
  >
    <slot />

    <div v-if="props.grid && states.showPreviewDots" :class="ns.be('preview')">
      <div v-for="i in 12" :key="i" :class="ns.be('preview-box')">
        <div
          v-if="i - 1 >= states.previewDots[0] && i - 1 <= states.previewDots[1]"
          :class="ns.be('preview-dot')"
        />
      </div>
    </div>
  </div>
</template>
