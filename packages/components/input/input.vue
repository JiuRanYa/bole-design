<template>
  <div :class="className">Input</div>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { inputProps } from './props'
import { computed } from 'vue'

defineOptions({
  name: 'Input'
})
const ns = useNamespace('input')

const _props = defineProps(inputProps)
const props = useProps('input', _props, {
  value: ''
})
const className = computed(() => {
  return [ns.b()]
})
</script>
