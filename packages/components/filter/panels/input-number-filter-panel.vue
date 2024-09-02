<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { InputNumber } from '@panda-ui/components'
import { ensureArray } from '@panda-ui/common'
import type { Operator } from '../types'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'InputNumberFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter__panel')

const isBetween = ref(
  editData.value && editData.value.inputType === InputType.INPUTNUMBER
    ? !!editData.value.operator.isBetween
    : false,
)

const inputValue = ref(
  currentOption.value?.field === editData.value?.field
    ? ensureArray(editData.value?.val)
    : [],
)

const isActive = computed(() => {
  const isBetweenValid = isBetween.value ? inputValue.value.length === 2 : true
  return isBetweenValid && inputValue.value.length > 0 && inputValue.value.every(val => !Number.isNaN(val) && val !== null)
})

const emmitedValue = computed(() => {
  return inputValue.value.length === 2 && isBetween.value ? inputValue.value : inputValue.value[0]
})

function setBetween(operator: Operator) {
  isBetween.value = !!operator.isBetween
  if (!isBetween.value)
    inputValue.value.splice(1, 1)
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.INPUTNUMBER)
      inputValue.value = ensureArray(editData.value.val)
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel
    :is-add-active="isActive" :current-filter-value="emmitedValue" @back="emit('back')"
    @operator-selected="setBetween"
  >
    <div :class="ns.be('input')">
      <InputNumber v-model:value="inputValue[0]" v-bind="currentOption?.optionProps" />
      <InputNumber
        v-if="isBetween" v-model:value="inputValue[1]" :class="ns.be('input__between')"
        v-bind="currentOption?.optionProps"
      />
    </div>
  </BasicFilterPanel>
</template>
