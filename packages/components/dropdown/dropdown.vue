<template>
  <div ref="wrapper" :class="className">
    <div ref="reference" :class="[ns.be('trigger')]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { dropdownProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import { computed, ref, watch } from 'vue'

defineOptions({
  name: 'Dropdown'
})

const _props = defineProps(dropdownProps)
const props = useProps('dropdown', _props, {
  visible: false
})

const ns = useNamespace('dropdown')
const wrapper = ref()
const className = computed(() => {
  return [ns.b()]
})
const currentVisible = ref(props.visible)

watch(
  () => props.visible,
  () => {
    currentVisible.value = props.visible
  }
)
</script>
