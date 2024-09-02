<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { DatePicker } from '@panda-ui/components'
import { config } from '@panda-ui/components/date-picker/const'
import { ensureArray } from '@panda-ui/common'
import type { Operator } from '../types'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'DateFilterPanel',
})

const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel')
const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const currentDate = ref(initDate())
const isBetween = ref(!!editData.value?.operator.isBetween)

const emittedValue = computed(() => {
  const dates = ensureArray(currentDate.value).map(d => dayjs(d).format(config.defaultFormat))

  return isBetween.value ? dates : dates[0]
})

const dateType = computed(() => (isBetween.value ? 'range' : 'static'))
const isActive = computed(() => currentDate.value !== '' && currentDate.value.length !== 0)

function initDate() {
  if (currentOption.value?.field === editData.value?.field)
    return editData.value?.val

  return ''
}

function setBetween(operator: Operator) {
  isBetween.value = !!operator.isBetween
}

watch(
  isBetween,
  () => {
    currentDate.value = initDate()
  },
)
watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.DATE)
      currentDate.value = editData.value.val
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel
    :is-add-active="isActive"
    :current-filter-value="emittedValue"
    @back="emit('back')"
    @operator-selected="setBetween"
  >
    <DatePicker
      v-model:value="currentDate"
      :type="dateType"
      :to="`.${ns.be('content')}`"
      v-bind="currentOption?.optionProps"
    />
  </BasicFilterPanel>
</template>
