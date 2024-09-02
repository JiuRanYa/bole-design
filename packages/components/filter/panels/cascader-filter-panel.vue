<script setup lang="ts">
import { computed, inject, reactive, ref, watch } from 'vue'
import type { CascaderOptionState } from '@panda-ui/components'
import { Cascader } from '@panda-ui/components'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'CascaderFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const emittedValue = reactive({
  label: editData.value?.val?.label || '',
  value: editData.value?.val?.selectedValue || [],
})
const cascaderValue = ref(currentOption.value?.field === editData.value?.field ? editData.value?.val?.value : [])

const isActive = computed(() => !!emittedValue.value?.length)

function handleSelect(values: CascaderOptionState[]) {
  emittedValue.label = values[values.length - 1].fullLabel
  emittedValue.value = values.map(value => value.value)
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.CASCADER)
      cascaderValue.value = editData.value.val?.value
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel :is-add-active="isActive" :current-filter-value="emittedValue" @back="emit('back')">
    <Cascader
      v-model:value="cascaderValue"
      v-bind="currentOption?.optionProps"
      @select="handleSelect"
    />
  </BasicFilterPanel>
</template>
