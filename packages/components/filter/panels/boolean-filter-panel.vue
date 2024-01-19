<template>
  <BasicFilterPanel :isAddActive="true" :currentFilterValue="radioValue" @back="emit('back')">
    <div :class="ns.be('boolean')">
      <div @click="select(true)">
        <input type="radio" name="true" :checked="radioValue" />
        <label for="true">是</label>
      </div>
      <div :class="ns.be('boolean__false')" @click="select(false)">
        <input type="radio" name="false" :checked="!radioValue" />
        <label for="false">否</label>
      </div>
    </div>
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { ref, watch, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, InputType } from '../types'

const { editData } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'BooleanFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel')

const radioValue = ref<boolean>(
  editData.value && editData.value.inputType === InputType.BOOLEAN ? editData.value.value : true
)

const select = (value: boolean) => {
  radioValue.value = value
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.BOOLEAN) {
      radioValue.value = editData.value.value
    }
  },
  {
    deep: true
  }
)
</script>
