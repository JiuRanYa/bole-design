<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { useProps } from '@panda-ui/common'
import { computed, inject, ref, watch } from 'vue'
import { radioProps } from './props'
import { RADIO_GROUP_INJECTION_KEY } from './symbol'

defineOptions({
  name: 'Radio',
})

const _props = defineProps(radioProps)
const emit = defineEmits(['update:value'])

const props = useProps('radio', _props, {
  value: '',
  label: '',
})

const ns = useNamespace('radio')
const currentValue = ref(props.value)
const groupState = inject(RADIO_GROUP_INJECTION_KEY, null)

const isSelected = computed(() => {
  if (groupState)
    return groupState.currentValue.value === props.label

  return currentValue.value === props.label
})
const isDisabled = computed(() => {
  return props.disabled ? props.disabled : groupState?.disabled
})
const classNames = computed(() => {
  return [ns.b(), ns.bs('vars'), {
    [ns.bm('selected')]: isSelected.value,
    [ns.bm('disabled')]: isDisabled.value,
  }]
})

function handleSelect() {
  if (isDisabled.value)
    return

  currentValue.value = props.label

  if (groupState)
    groupState.updateValue(props.label)
  else
    emit('update:value', props.label)
}

watch(
  () => props.value,
  (value) => {
    currentValue.value = value
  },
)
</script>

<template>
  <div :class="classNames" @click="handleSelect">
    <span :class="ns.bm('signal')">
      <input :class="ns.bm('input')">
      <span :class="ns.bm('inner')" />
    </span>

    <span :class="ns.be('label')">
      {{ props.label }}
    </span>
  </div>
</template>
