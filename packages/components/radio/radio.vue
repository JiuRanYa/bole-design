<template>
  <div :class="className">Radio</div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed } from 'vue'
import { radioProps } from './props'
import { useProps } from '@panda-ui/common'

defineOptions({
  name: 'Radio'
})

const ns = useNamespace('radio')
const className = computed(() => {
  return [ns.b()]
})

const _props = defineProps(radioProps)
const props = useProps('radio', _props, {})
</script>
