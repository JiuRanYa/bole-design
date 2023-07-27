<template>
  <li
    ref="wrapper"
    :class="className"
    role="option"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-selected="selected"
  >
    <slot>
      <Icon v-if="selected" :icon="Check" :class="ns.be('icon')" />
      <span :class="ns.be('label')">
        {{ label || value }}
      </span>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { optionProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import { Icon } from '@bole-design/components'
// import { Check } from '@bole-design/icons'

defineProps(optionProps)

const ns = useNamespace('option')
const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})
const disabled = false
</script>
