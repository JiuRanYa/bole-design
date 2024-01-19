<template>
  <BasicFilterPanel
    :isAddActive="isActive"
    :currentFilterValue="selectedChoices"
    @back="emit('back')"
  >
    <div :class="ns.be('panel__container')">
      <ul :class="radioClass">
        <li v-for="choice in currentChoices" :key="choice.val" @click="selectChoice(choice)">
          <Checkbox
            @click.stop
            v-model:value="choice.selected"
            :label="choice.label"
            @change="() => changeSelectedChoices(choice)"
          />
        </li>
      </ul>
    </div>
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, Choice, InputType } from '../types'
import { Checkbox } from '@panda-ui/components'

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'RadioFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter')
const radioClass = computed(() => {
  return [ns.be('list'), ns.be('panel__radio')]
})

const getEditChoices = () => {
  const currentOptionChoices = currentOption.value?.choices
  if (editData.value && currentOption.value?.inputType === editData.value.inputType) {
    const editChoices = editData.value.value
    return currentOptionChoices.map((choice: Choice) => {
      return {
        ...choice,
        selected: !!editChoices.some((eChoice: Choice) => eChoice.val === choice.val)
      }
    })
  } else {
    return currentOptionChoices.map((choice: Choice) => {
      return {
        ...choice,
        selected: false
      }
    })
  }
}
const currentChoices = reactive(getEditChoices())
const selectedChoices = ref(
  editData.value && editData.value.inputType === InputType.CHECKBOX
    ? [...editData.value.value]
    : []
)
const isActive = computed(() => !!selectedChoices.value.length)

type SelectChoice = Choice & {
  selected: boolean
}

const changeSelectedChoices = (choice: SelectChoice) => {
  if (choice.selected) {
    selectedChoices.value.push({
      label: choice.label,
      val: choice.val
    })
  } else {
    const sIndex = selectedChoices.value.findIndex((sChoice: Choice) => sChoice.val === choice.val)
    if (sIndex >= 0) {
      selectedChoices.value.splice(sIndex, 1)
    }
  }
}

const selectChoice = (choice: SelectChoice) => {
  choice.selected = !choice.selected
  changeSelectedChoices(choice)
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.CHECKBOX) {
      selectedChoices.value = [...editData.value.value]
    }
  },
  {
    deep: true
  }
)
</script>
