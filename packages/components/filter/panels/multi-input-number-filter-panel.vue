<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { PlusM, TrashcanM } from '@panda-ui/icons'
import { Button, Icon, InputNumber } from '@panda-ui/components'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import BasicFilterPanel from './basic-filter-panel.vue'

defineOptions({
  name: 'MultiInputNumberFilterPanel',
})

const emit = defineEmits(['back'])

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter__panel__multi')

interface InputItem {
  value: any
}

const multiInputItems = ref<InputItem[]>(
  editData.value && editData.value.inputType === InputType.MULTIINPUTNUMBER && currentOption.value?.field === editData.value.field
    ? editData.value.val.map((val: any) => ({ value: val }))
    : [{ value: null }],
)

function addItem() {
  multiInputItems.value.push({ value: null })
}

function deleteItem(index: number) {
  multiInputItems.value.splice(index, 1)
}

const isActive = computed(
  () =>
    multiInputItems.value.length > 0
    && multiInputItems.value.every(item => (!Number.isNaN(item.value) && item.value !== null)),
)

const emmitedValue = computed(() => multiInputItems.value.map(item => item.value))

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.MULTIINPUTNUMBER)
      multiInputItems.value = editData.value.val.map((val: any) => ({ value: val }))
  },
  {
    deep: true,
  },
)
</script>

<template>
  <BasicFilterPanel :is-add-active="isActive" :current-filter-value="emmitedValue" @back="emit('back')">
    <div :class="ns.b()">
      <div :class="ns.be('add')">
        <Button @click="addItem()">
          <template #icon>
            <Icon :icon="PlusM" :scale="1.6" />
          </template>
          添加条目
        </Button>
      </div>
      <template v-for="(item, index) in multiInputItems" :key="index">
        <div :class="ns.be('input')">
          <InputNumber v-model:value="item.value" v-bind="currentOption?.optionProps" />
          <Icon :class="ns.bem('input', 'delete')" :icon="TrashcanM" :scale="1.6" @click="deleteItem(index)" />
        </div>
      </template>
    </div>
  </BasicFilterPanel>
</template>
