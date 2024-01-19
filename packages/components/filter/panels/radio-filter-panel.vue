<template>
  <BasicFilterPanel :isAddActive="isActive" :currentFilterValue="selected" @back="emit('back')">
    <div :class="ns.be('panel__container')">
      <ul :class="radioClass">
        <li
          v-for="choice in currentOption.choices"
          :key="choice.val"
          @click="selectChoice(choice.val)"
        >
          <input
            type="radio"
            :id="choice.val"
            :value="choice.val"
            :checked="choice.val === selected"
          />
          <label :for="choice.val">{{ choice.label }}</label>
        </li>
      </ul>
    </div>
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, InputType } from '../types'

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'RadioFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter')
const radioClass = computed(() => {
  return [ns.be('list'), ns.be('panel__radio')]
})

const selected = ref(
  editData.value && editData.value.inputType === InputType.RADIO ? editData.value.value : ''
)

const isActive = computed(() => selected.value !== '')

const selectChoice = (selectedChoice: string) => {
  selected.value = selectedChoice
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.RADIO) {
      selected.value = editData.value.value
    }
  },
  {
    deep: true
  }
)
</script>
