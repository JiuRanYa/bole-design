<template>
  <BasicFilterPanel
    :isAddActive="isActive"
    :currentFilterValue="emmitedValue"
    @back="emit('back')"
    @renderBetween="renderBetween"
  >
    <div :class="inputClass">
      <Input v-model:value="inputValue[0]" @change="value => handleChange(value)" />
      <Input
        v-if="isBetween"
        :class="ns.be('input__between')"
        v-model:value="inputValue[1]"
        @change="value => handleChange(value)"
      />
    </div>
    <div v-if="!isValid" :class="ns.be('error')">{{ errorMessage }}</div>
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import { Input } from '@panda-ui/components'

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'InputFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel')

const isValid = ref(true)
const isBetween = ref(
  editData.value && editData.value.inputType === InputType.INPUT
    ? !!editData.value.operator.isBetween
    : false
)
const errorMessage = ref<string>('请检查输入格式')

const formatValue = (value: any) => (Array.isArray(value) ? value : [value])
const inputValue = ref(
  editData.value && editData.value.inputType === InputType.INPUT
    ? formatValue(editData.value.value)
    : []
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
      [ns.bem('input', 'error')]: !isValid.value
    }
  ]
})

const renderBetween = (value: boolean) => {
  isBetween.value = value
}

const handleChange = async (value: any) => {
  if (!currentOption.value?.validationSchema || value === '') {
    return
  }
  try {
    await currentOption.value?.validationSchema.validate(value)
    isValid.value = true
  } catch (err: any) {
    errorMessage.value = err.type === 'typeError' ? '请检查输入格式' : err.message
    isValid.value = false
  }
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.INPUT) {
      inputValue.value = formatValue(editData.value.value)
    }
  },
  {
    deep: true
  }
)
</script>
