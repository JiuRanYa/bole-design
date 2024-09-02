<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { computed, ref, useSlots, watch } from 'vue'
import { emitEvent, useProps } from '@panda-ui/common'
import { checkboxProps } from './props'

defineOptions({
  name: 'Checkbox',
})

const _props = defineProps(checkboxProps)

const emit = defineEmits(['update:value'])

const props = useProps('checkbox', _props, {
  value: false,
  label: '',
  indeterminate: false,
  onChange: () => {},
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
      [ns.bm('checked')]: !props.indeterminate && currentChecked.value,
    },
    {
      [ns.bm('indeterminate')]: props.indeterminate,
    },
  ]
})

function setCurrentChecked(checked: boolean) {
  currentChecked.value = checked
  emit('update:value', currentChecked.value)
  emitEvent(props.onChange, currentChecked.value)
}

function handleChange(checked: boolean) {
  setCurrentChecked(checked)
}

watch(
  () => props.value,
  () => {
    currentChecked.value = props.value
  },
)
</script>

<template>
  <label :class="className">
    <input :class="ns.bm('input')" type="checkbox" @change="handleChange(!currentChecked)">

    <span :class="ns.bm('inner')" />

    <span v-if="props.label || hasSlot" :class="ns.bm('label')">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>
