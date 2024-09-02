<script setup lang="ts">
// TODO: This component need to refact, validationSchema and error message:
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Input } from '@panda-ui/components'
import { ensureArray } from '@panda-ui/common'
import type { Operator } from '../types'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'InputFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter__panel')

const isValid = ref(true)
const isBetween = ref(
  editData.value && editData.value.inputType === InputType.INPUT
    ? !!editData.value.operator.isBetween
    : false,
)
const errorMessage = ref<string>('请检查输入格式')

const inputValue = ref(
  currentOption.value?.field === editData.value?.field
    ? ensureArray(editData.value?.val)
    : [''],
)

const emmitedValue = computed(() => {
  return inputValue.value.length === 2 && isBetween.value ? inputValue.value : inputValue.value[0]
})

const isActive = computed(() => {
  const isBetweenValid = isBetween.value ? inputValue.value.length === 2 : true
  return isBetweenValid && inputValue.value.every((val: any) => val !== '') && isValid.value
})

const inputClass = computed(() => {
  return [
    ns.be('input'),
    {
      [ns.bem('input', 'error')]: !isValid.value,
    },
  ]
})

function setBetween(operator: Operator) {
  isBetween.value = !!operator.isBetween
}

async function handleBlur(value: string) {
  if (!currentOption.value?.validationSchema || value === '')
    return

  try {
    await currentOption.value?.validationSchema.validate(value)
    isValid.value = true
  }
  catch (err: any) {
    errorMessage.value = err.type === 'typeError' ? '请检查输入格式' : err.message
    isValid.value = false
  }
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.INPUT)
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
    <div :class="inputClass">
      <Input v-model:value="inputValue[0]" v-bind="currentOption?.optionProps" @blur="handleBlur" />
      <Input
        v-if="isBetween" v-model:value="inputValue[1]" :class="ns.be('input__between')" v-bind="currentOption?.optionProps"
        @blur="handleBlur"
      />
    </div>
    <div v-if="!isValid" :class="ns.be('error')">
      {{ errorMessage }}
    </div>
  </BasicFilterPanel>
</template>
