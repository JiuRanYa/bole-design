<template>
  <Masker
    v-model:active="currentActive"
    transfer
    :class="className"
    @mask-click="handleMaskClick"
    :transition-name="moveTransition"
  >
    <template #default="{ show }">
      <div v-if="show" role="dialog" :class="ns.bm('content')" :style="dialogStyle">
        <div v-if="props.closeble" :class="ns.be('close')" @click="handleClose">
          <Icon :icon="Xmark" :scale="1.2" />
        </div>

        <slot></slot>

        <div :class="ns.bm('action')">
          <slot name="action"></slot>
        </div>
      </div>
    </template>
  </Masker>
</template>

<script setup lang="ts">
import { useProps } from '@panda-ui/common'
import { Masker } from '../masker'
import { sheetProps } from './props'
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Icon } from '../icon'
import { Xmark } from '@panda-ui/icons'

defineOptions({
  name: 'Sheet'
})

const _props = defineProps(sheetProps)
const props = useProps('sheet', _props, {
  active: false,
  placement: 'right',
  closeble: true,
  size: '370px'
})
const emit = defineEmits(['update:active'])

const ns = useNamespace('sheet')

const currentActive = ref(props.active)
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const dialogStyle = computed(() => {
  return {
    width: props.size
  }
})

function handleMaskClick() {
  handleClose()
}
function handleClose() {
  currentActive.value = false
  emit('update:active', false)
}
const moveTransition = computed(() => {
  return ns.ns(`move-${props.placement}`)
})

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
</script>
