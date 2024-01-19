<template>
  <div
    ref="triggerRef"
    :class="className"
    @contextmenu.prevent="openContextMenu"
    @click="closeContextMenu"
  >
    <slot name="trigger"></slot>
    <Popper
      to="body"
      :visible="active"
      :class="ns.bs('content')"
      :style="{
        top: `${position.y}px`,
        left: `${position.x}px`,
        zIndex
      }"
      :transition="props.transitionName"
    >
      <slot name="content"></slot>
    </Popper>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, reactive, ref } from 'vue'
import { useClickOutside, useNamespace } from '@panda-ui/hooks'
import { contextMenuProps } from './props'
import { emitEvent, useProps, useZIndex } from '@panda-ui/common'
import { Popper } from '../popper'

defineOptions({
  name: 'ContextMenu'
})

defineEmits(['show'])

const getIndex = useZIndex()
const zIndex = computed(() => getIndex())
const _props = defineProps(contextMenuProps)
const props = useProps('context-menu', _props, {
  transitionName: () => ns.ns('modal-fade')
})
const ns = useNamespace('context-menu')
const className = computed(() => {
  return [ns.b()]
})

const active = ref(false)
const position = reactive({
  x: 0,
  y: 0
})
function openContextMenu(event: MouseEvent) {
  active.value = false

  position.x = event.clientX || 0
  position.y = event.clientY || 0

  emitEvent(props.onShow, { ...position })

  nextTick(() => {
    active.value = true
  })
}
function closeContextMenu(event?: MouseEvent) {
  active.value = false

  emitEvent(props.onClose, { ...position })
}

const triggerRef = useClickOutside(closeContextMenu, {})
</script>
