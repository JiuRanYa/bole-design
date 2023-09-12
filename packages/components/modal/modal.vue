<template>
  <Masker v-model:active="currentActive" :transfer="props.transfer" :inner="props.inner">
    12323
  </Masker>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { Masker } from '../masker'
import { modalProps } from './props'
import { ref, watch } from 'vue'

defineOptions({
  name: 'Modal'
})

const _props = defineProps(modalProps)
const props = useProps('modal', _props, {
  active: false,
  transfer: 'body',
  inner: false
})

const currentActive = ref(props.active)

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
</script>
