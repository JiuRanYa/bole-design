<script setup lang="ts">
import type { PropType } from 'vue'
import { useNamespace, useSetTimeout } from '@panda-ui/hooks'
import { ScrollArea } from '../scroll-area/index'
import { Option } from '../option'
import type { CascaderOptionState } from './symbol'

defineOptions({
  name: 'CascaderPanel',
})

const props = defineProps({
  options: {
    type: Object as PropType<CascaderOptionState[]>,
  },
  openedId: {
    type: Number,
    default: null,
  },
  values: {
    type: Array as PropType<string[]>,
  },
})

const emit = defineEmits(['select', 'hover'])

const ns = useNamespace('cascader')

const { timer } = useSetTimeout()

function handleMouseEnter(option: CascaderOptionState) {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    !option.disabled && emit('hover', option)
  }, 100)
}
function handleSelectOption(option: CascaderOptionState) {
  emit('select', option)
}
function isSelected(option: CascaderOptionState) {
  return (
    (hasChildren(option) && option.id === props.openedId)
    || props.values?.includes(option.fullValue)
  )
}

function hasChildren(option: CascaderOptionState) {
  return !!option.children.length
}
</script>

<template>
  <div :class="ns.be('panel')">
    <ScrollArea height="200px" :style="{ width: '100%' }">
      <div :class="ns.be('wrapper')">
        <Option
          v-for="option in props.options"
          :key="option.value"
          :class="ns.be('item')"
          :label="option.label"
          :value="option.value"
          :selected="isSelected(option)"
          :disabled="option.disabled"
          :expandable="hasChildren(option)"
          @click="handleSelectOption(option)"
          @mouseenter="handleMouseEnter(option)"
        />
      </div>
    </ScrollArea>
  </div>
</template>
