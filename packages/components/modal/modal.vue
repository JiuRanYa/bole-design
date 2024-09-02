<script setup lang="ts">
import { emitEvent, useProps } from '@panda-ui/common'
import { computed, reactive, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Masker } from '../masker'
import { modalProps } from './props'

defineOptions({
  name: 'Modal',
})

const _props = defineProps(modalProps)
const emit = defineEmits(['update:active'])

const props = useProps('modal', _props, {
  active: false,
  transfer: 'body',
  inner: false,
  top: '30vh',
  width: '550px',
  height: '',
  transitionName: () => ns.ns('modal-fade'),
  reverseBackdrop: false,
})

const ns = useNamespace('modal')
const currentActive = ref(props.active)

const dialogStyle = computed(() => {
  return {
    ...rect,
    width: props.width,
    height: props.height,
    boxShadow: props.reverseBackdrop ? 'none' : '',
  }
})
const dialogClass = computed(() => {
  return [ns.bm('dialog'), props.dialogClass]
})
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const rect = reactive({
  [ns.nv('dialog-top')]: normalizeStyle(props.top),
})

function normalizeStyle(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}
function handleClose() {
  currentActive.value = false
  emit('update:active', false)

  props.onClose && emitEvent(props.onClose)
}
function handleShow() {
  emitEvent(props.onShow)
}
function handleMaskClick() {
  handleClose()
}
function handleHide() {
  handleClose()
  props.onHide && emitEvent(props.onHide)
}

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
    :transfer="props.transfer"
    :inner="props.inner"
    :class="className"
    :reverse="props.reverseBackdrop"
    :transition-name="props.transitionName"
    @show="handleShow"
    @hide="handleHide"
    @mask-click="handleMaskClick"
  >
    <template #default="{ show }">
      <div
        v-if="show"
        v-bind="$attrs"
        role="dialog"
        :aria-modal="show ? 'true' : undefined"
        :class="dialogClass"
        :style="dialogStyle"
      >
        <slot />
      </div>
    </template>
  </Masker>
</template>
