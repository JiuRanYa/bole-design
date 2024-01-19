<template>
  <span :class="className">
    <span :class="ns.be('content')">
      <slot></slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { useProps } from '@panda-ui/common'
import { tagProps } from './props'
import { computed } from 'vue'
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'Tag'
})

const _props = defineProps(tagProps)
const props = useProps('tag', _props, {
  type: 'secondary',
  size: 'middle'
})

const ns = useNamespace('tag')
const className = computed(() => {
  return [ns.b(), ns.be(props.type), ns.be(props.size)]
})
</script>
