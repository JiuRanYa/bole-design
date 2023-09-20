<template>
  <label :class="className">
    <input :class="ns.bm('input')" type="checkbox" @change="handleChange(!currentChecked)" />

    <span :class="ns.bm('inner')"> </span>

    <span v-if="props.label || hasSlot" :class="ns.bm('label')">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed, ref, useSlots } from 'vue'
import { checkboxProps } from './props'
import { useProps } from '@bole-design/common'

defineOptions({
  name: 'Checkbox'
})

const _props = defineProps(checkboxProps)
const props = useProps('checkbox', _props, {
  value: false,
  label: ''
})

const ns = useNamespace('checkbox')

const slots = useSlots()

const hasSlot = computed(() => {
  return !!slots.default
})

const currentChecked = ref(props.value)
const className = computed(() => {
  return [
    ns.b(),
    {
      [ns.bm('checked')]: currentChecked.value
    }
  ]
})

function setCurrentChecked(checked: boolean) {
  currentChecked.value = checked
}
function handleChange(checked: boolean) {
  setCurrentChecked(checked)
}
</script>
