<template>
  <BasicFilterPanel
    :isAddActive="isActive"
    :currentFilterValue="multiItemsValue"
    @back="emit('back')"
  >
    <div :class="ns.b()">
      <div :class="ns.be('add')">
        <Button @click="addItem()">
          <template #icon>
            <Icon :icon="PlusM" :scale="1.6"></Icon>
          </template>
          添加条目
        </Button>
      </div>
      <template v-for="(item, index) in multiInputItems">
        <div :class="getMultiInputClass(index)">
          <Input v-model:value="item.value" @change="handleChange(item.value, index)" />
          <Icon
            :class="ns.bem('input', 'delete')"
            :icon="TrashcanM"
            :scale="1.6"
            @click="deleteItem(index)"
          />
        </div>
        <div v-if="!item.isValid" :class="ns.be('error')">{{ item.errorMessage }}</div>
      </template>
    </div>
  </BasicFilterPanel>
</template>

<script setup lang="ts">
import { computed, ref, watch, inject } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { PlusM, TrashcanM } from '@panda-ui/icons'
import BasicFilterPanel from './basic-filter-panel.vue'
import { FILTER_INJECTION_KEY, InputType } from '../types'
import { Input, Button, Icon } from '@panda-ui/components'

const { editData, currentOption } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'MultiInputFilterPanel'
})
const emit = defineEmits(['back'])

const ns = useNamespace('filter__panel__multi')

type InputItem = {
  value: any
  isValid?: boolean
  errorMessage: string
}

const defaultInputValue = { value: '', isValid: true, errorMessage: '请检查输入格式' }

const multiInputItems = ref<InputItem[]>(
  editData.value && editData.value.inputType === InputType.MULTIINPUT
    ? editData.value.value.map((val: any) => ({ ...defaultInputValue, value: val }))
    : [{ ...defaultInputValue }]
)

const addItem = () => {
  multiInputItems.value.push({ ...defaultInputValue })
}

const deleteItem = (index: number) => {
  multiInputItems.value.splice(index, 1)
}

const isActive = computed(
  () =>
    multiInputItems.value.length > 0 &&
    multiInputItems.value.every(item => item.value !== '' && item.isValid)
)

const multiItemsValue = computed(() => multiInputItems.value.map(item => item.value))

const getMultiInputClass = (index: number) => {
  return [
    ns.be('input'),
    {
      [ns.bem('input', 'error')]: !multiInputItems.value[index].isValid
    }
  ]
}

const handleChange = async (value: any, index: number) => {
  if (!currentOption.value?.validationSchema || value === '') return

  try {
    await currentOption.value.validationSchema.validate(value)
    multiInputItems.value[index].isValid = true
    multiInputItems.value[index].errorMessage = '请检查输入格式'
  } catch (err: any) {
    multiInputItems.value[index].isValid = false
    multiInputItems.value[index].errorMessage =
      err.type === 'typeError' ? '请检查输入格式' : err.message
  }
}

watch(
  editData,
  () => {
    if (editData.value && editData.value.inputType === InputType.MULTIINPUT) {
      multiInputItems.value = [...editData.value.value].map((val: any) => ({
        ...defaultInputValue,
        value: val
      }))
    }
  },
  {
    deep: true
  }
)
</script>
