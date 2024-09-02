<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'
import { useProps } from '@panda-ui/common'
import { computed, provide, ref, watch } from 'vue'
import { radioGroupProps } from './props'
import { RADIO_GROUP_INJECTION_KEY } from './symbol'

defineOptions({
  name: 'RadioGroup',
})

const _props = defineProps(radioGroupProps)

const emit = defineEmits(['update:value'])

const ns = useNamespace('radio-group')

const props = useProps('radio-group', _props, {
  value: '',
  vertical: false,
})
const className = computed(() => {
  return [ns.b(), {
    [ns.bm('vertical')]: props.vertical,
  }]
})

const currentValue = ref(props.value)
const isDisabled = computed(() => props.disabled)

watch(
  () => props.value,
  (value) => {
    currentValue.value = value
  },
)

function updateValue(value: boolean | string | number) {
  currentValue.value = value
  emit('update:value', value)
}

provide(RADIO_GROUP_INJECTION_KEY, {
  currentValue,
  updateValue,
  disabled: isDisabled.value,
})
</script>

<template>
  <div :class="className">
    <slot />
  </div>
</template>

<style scoped>

</style>
