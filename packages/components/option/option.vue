<template>
  <li
    ref="wrapper"
    :class="className"
    role="option"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-selected="isSelected"
    @mouseenter="hoverItem"
  >
    <slot>
      <Icon v-if="isSelected" :icon="Check" :class="ns.be('icon')" />
      <span :class="ns.be('label')">
        {{ label || value }}
      </span>
    </slot>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { optionProps } from './props'
import { useNamespace } from '@panda-ui/hooks'
import { Icon } from '@panda-ui/components'
import { Check } from '@panda-ui/icons'
import { useOption } from './useOption'

const ns = useNamespace('option')

const props = defineProps(optionProps)
const { isSelected, isHovering, hoverItem } = useOption(props)

const className = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    {
      [ns.be('hover')]: isHovering.value
    }
  ]
})
const disabled = false
</script>
