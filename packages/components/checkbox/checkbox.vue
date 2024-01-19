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
import { useNamespace } from '@panda-ui/hooks'
import { computed, ref, useSlots, watch } from 'vue'
import { checkboxProps } from './props'
import { emitEvent, useProps } from '@panda-ui/common'

defineOptions({
  name: 'Checkbox'
})

const emit = defineEmits(['update:value'])

const _props = defineProps(checkboxProps)
const props = useProps('checkbox', _props, {
  value: false,
  label: '',
  onChange: () => {}
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
  }
)
</script>
