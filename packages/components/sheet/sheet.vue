<script setup lang="ts">
import { emitEvent, useProps } from '@panda-ui/common'
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Xmark } from '@panda-ui/icons'
import { Icon } from '../icon'
import { Masker } from '../masker'
import { sheetProps } from './props'

defineOptions({
  name: 'Sheet',
})

const _props = defineProps(sheetProps)
const emit = defineEmits(['update:active'])
const props = useProps('sheet', _props, {
  active: false,
  placement: 'right',
  closeble: true,
  size: '370px',
})
const ns = useNamespace('sheet')

const currentActive = ref(props.active)
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const dialogStyle = computed(() => {
  return {
    width: props.size,
  }
})

function handleMaskClick() {
  handleClose()
}
function handleClose() {
  currentActive.value = false
  emit('update:active', false)
  emitEvent(props.onClose)
}
function handleShow() {
  emitEvent(props.onShow)
}
function handleHide() {
  emitEvent(props.onHide)
}
const moveTransition = computed(() => {
  return ns.ns(`move-${props.placement}`)
})

watch(
  () => props.active,
  (value) => {
    currentActive.value = value
  },
)
</script>

<template>
  <Masker
    v-model:active="currentActive"
    transfer
    :class="className"
    :transition-name="moveTransition"
    @show="handleShow"
    @hide="handleHide"
    @mask-click="handleMaskClick"
  >
    <template #default="{ show }">
      <div v-if="show" role="dialog" :class="ns.bm('content')" :style="dialogStyle" v-bind="$attrs">
        <div v-if="props.closeble" :class="ns.be('close')" @click="handleClose">
          <Icon :icon="Xmark" :scale="1.2" />
        </div>

        <slot />

        <div v-if="$slots.action" :class="ns.bm('action')">
          <slot name="action" />
        </div>
      </div>
    </template>
  </Masker>
</template>
