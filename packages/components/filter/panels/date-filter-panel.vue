<template>
  <BasicFilterPanel
    :isAddActive="isActive"
    :currentFilterValue="emmitedValue"
    @back="emit('back')"
    @renderBetween="renderBetween"
  >
    <DatePicker
      v-model:value="currentDate"
      :type="dateType"
      :to="`.${ns.be('content')}`"
      :valueFormat="DATEFORMAT"
    />
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import dayjs from 'dayjs'
import { useNamespace } from '@panda-ui/hooks'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, DATEFORMAT, InputType } from '../types'
import { DatePicker } from '@panda-ui/components'

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)

enum DATETYPE {
  RANGE = 'range',
  STATIC = 'static'
}

defineOptions({
  name: 'DateFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel')

const isBetween = ref(
  editData.value && currentOption.value?.inputType === editData.value.inputType
    ? !!editData.value.operator.isBetween
    : false
)

const initDate = () => {
  if (editData.value && editData.value.inputType === InputType.DATE) {
    return editData.value.value
  } else {
    if (isBetween.value) {
      return [dayjs().subtract(1, 'day').format(DATEFORMAT), dayjs().format(DATEFORMAT)]
    } else {
      return dayjs().format(DATEFORMAT)
    }
  }
}
const currentDate = ref(initDate())

const emmitedValue = computed(() => {
  return Array.isArray(currentDate.value)
    ? isBetween.value
      ? currentDate.value
      : currentDate.value[0]
    : currentDate.value
})

const dateType = computed(() => (isBetween.value ? DATETYPE.RANGE : DATETYPE.STATIC))

const isActive = computed(() => currentDate.value !== '')

const renderBetween = (value: boolean) => {
  isBetween.value = value
}

watch(isBetween, () => {
  if (isBetween.value) {
    currentDate.value = [dayjs().subtract(1, 'day').format(DATEFORMAT), dayjs().format(DATEFORMAT)]
  }
})

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.DATE) {
      currentDate.value = isBetween.value ? [...editData.value.value] : editData.value.value
    }
  },
  {
    deep: true
  }
)
</script>
