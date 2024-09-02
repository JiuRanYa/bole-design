<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { Checkbox, ScrollArea } from '@panda-ui/components'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import type { Choice } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

type SelectChoice = Choice & {
  selected: boolean
}

defineOptions({
  name: 'RadioFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter')

const currentChoices = ref(getEditChoices())
const selectedChoices = computed(() => {
  return currentChoices.value.filter(i => i.selected)
})
const radioClass = computed(() => {
  return [ns.be('list'), ns.be('panel__radio')]
})
const isActive = computed(() => !!selectedChoices.value.length)

function getEditChoices() {
  const currentOptionChoices = currentOption.value?.choices || []

  return currentOptionChoices.map((choice: Choice) => {
    return {
      ...choice,
      selected: !editData.value ? false : !!editData.value.val.some((eChoice: Choice) => eChoice.value === choice.value),
    }
  })
}

function selectChoice(choice: SelectChoice) {
  choice.selected = !choice.selected
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.CHECKBOX)
      currentChoices.value = getEditChoices()
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel
    :is-add-active="isActive"
    :current-filter-value="selectedChoices"
    @back="emit('back')"
  >
    <div :class="ns.be('panel__container')">
      <ScrollArea height="100%">
        <ul :class="radioClass">
          <li v-for="choice in currentChoices" :key="choice.value" @click="selectChoice(choice)">
            <Checkbox
              v-model:value="choice.selected"
              :label="choice.label"
              v-bind="currentOption?.optionProps"
            />
          </li>
        </ul>
      </ScrollArea>
    </div>
  </BasicFilterPanel>
</template>
