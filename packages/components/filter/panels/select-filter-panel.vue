<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import type { SelectOption } from '@panda-ui/components'
import { Select } from '@panda-ui/components'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import type { Choice } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'SelectFilterPanel',
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel')
const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const emittedValue = ref()
const selectedValue = ref(editData.value?.val?.value)

const isActive = computed(() => !!selectedValue.value)
const currentChoices = computed<Choice[]>(() => currentOption.value?.choices || [])

function handleSelect(value: SelectOption) {
  emittedValue.value = { ...value }
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.SELECT)
      selectedValue.value = editData.value.val?.value
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel :is-add-active="isActive" :current-filter-value="emittedValue" @back="emit('back')">
    <Select
      v-model:value="selectedValue"
      :class="ns.be('select')"
      :fit-popper="true"
      :options="currentChoices"
      v-bind="currentOption?.optionProps"
      @select="handleSelect"
    />
  </BasicFilterPanel>
</template>
