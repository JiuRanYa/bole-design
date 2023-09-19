<template>
  <Masker
    v-model:active="currentActive"
    :transfer="props.transfer"
    :inner="props.inner"
    :class="className"
    @mask-click="handleMaskClick"
  >
    <template #default="{ show }">
      <div role="dialog" :aria-modal="show" :class="dialogClass" :style="dialogStyle">
        <slot />
      </div>
    </template>
  </Masker>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { Masker } from '../masker'
import { modalProps } from './props'
import { computed, reactive, ref, watch } from 'vue'
import { useNamespace } from '@bole-design/hooks'

defineOptions({
  name: 'Modal'
})

const _props = defineProps(modalProps)
const props = useProps('modal', _props, {
  active: false,
  transfer: 'body',
  inner: false,
  top: '40vh',
  transitionName: 'fade-in'
})
const emit = defineEmits(['update:active'])

const ns = useNamespace('modal')
const currentActive = ref(props.active)

const dialogStyle = computed(() => {
  return {
    ...rect,
    width: '550px'
  }
})
const dialogClass = computed(() => {
  return [ns.bm('dialog')]
})
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const rect = reactive({
  [ns.nv('dialog-top')]: normalizeStyle(props.top)
})

function normalizeStyle(value: string | number) {
  return typeof value === 'number' ? `${value}px` : value
}
function handleClose() {
  currentActive.value = false
  emit('update:active', false)
}
function handleMaskClick() {
  handleClose()
}

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
</script>
