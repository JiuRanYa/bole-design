<template>
  <Masker v-model:active="currentActive" transfer :class="className" @mask-click="handleMaskClick">
    <template #default="{ show }">
      <div role="dialog">123</div>
    </template>
  </Masker>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { Masker } from '../masker'
import { sheetProps } from './props'
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@bole-design/hooks'

defineOptions({
  name: 'Sheet'
})

const _props = defineProps(sheetProps)
const props = useProps('sheet', _props, {
  active: false
})

const ns = useNamespace('sheet')

const currentActive = ref(props.active)
const className = computed(() => {
  return [ns.b()]
})

function handleMaskClick() {
	handleClose()
}

watch(
  () => props.active,
  value => {
    currentActive.value = value
    console.log(value)
  }
)
</script>
