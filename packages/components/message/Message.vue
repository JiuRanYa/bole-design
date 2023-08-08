<template>
  <div :class="classList">
    <slot>
      <p>
        {{ props.message }}
      </p>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed } from 'vue'
import { defaultProps, messageProps } from './props'
import { useProps } from '@bole-design/common'

defineOptions({
  name: 'Message'
})

const ns = useNamespace('message')

const classList = computed(() => {
  return [ns.b()]
})
const _props = defineProps(messageProps)
const props = useProps('select', _props, defaultProps)
</script>
