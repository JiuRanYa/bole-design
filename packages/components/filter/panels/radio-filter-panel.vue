<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Radio, RadioGroup, ScrollArea } from '@panda-ui/components'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'RadioFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter')
const selectedValue = ref(editData.value?.val)

const isActive = computed(() => selectedValue.value !== '')

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.RADIO)
      selectedValue.value = editData.value.val
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel :is-add-active="isActive" :current-filter-value="selectedValue" @back="emit('back')">
    <div :class="[ns.be('panel__container'), ns.be('panel__radio')]">
      <ScrollArea height="100%">
        <RadioGroup v-model:value="selectedValue" vertical>
          <Radio v-for="choice in (currentOption?.choices || [])" :key="choice.value" :label="choice.label" />
        </RadioGroup>
      </ScrollArea>
    </div>
  </BasicFilterPanel>
</template>
