<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Radio, RadioGroup } from '@panda-ui/components'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'BooleanFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter__panel')

const radioValue = ref(
  editData.value && currentOption.value?.field === editData.value?.field
    ? editData.value?.val ? '是' : '否'
    : '是',
)
const emittedValue = computed(() => radioValue.value === '是')

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.BOOLEAN)
      radioValue.value = editData.value.val
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel :is-add-active="true" :current-filter-value="emittedValue" @back="emit('back')">
    <div :class="ns.be('boolean')">
      <RadioGroup v-model:value="radioValue">
        <Radio label="是" />
        <Radio label="否" />
      </RadioGroup>
    </div>
  </BasicFilterPanel>
</template>
