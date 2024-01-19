<template>
  <BasicFilterPanel
    :isAddActive="isActive"
    :currentFilterValue="selectedChoice"
    @back="emit('back')"
  >
    <Select
      :class="ns.be('select')"
      :fitPopper="true"
      v-model:value="selectedChoice"
      :options="currentChoices"
      :to="`.${ns.be('content')}`"
    ></Select>
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { computed, ref, watch, reactive, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, Choice, InputType } from '../types'
import { Select } from '@panda-ui/components'

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'SelectFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel')

const currentChoices = reactive(
  currentOption.value?.choices.map((choice: Choice) => {
    return { label: choice.label, value: choice.val }
  })
)
const selectedChoice = ref(
  editData.value && editData.value.inputType === InputType.SELECT ? editData.value.value : ''
)

const isActive = computed(() => !!selectedChoice.value)

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.SELECT) {
      selectedChoice.value = editData.value.value
    }
  },
  {
    deep: true
  }
)
</script>
