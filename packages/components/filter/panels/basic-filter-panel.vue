<template>
  <div :class="ns.be('panel')">
    <div :class="ns.be('panel__title')">
      <Icon :icon="CaretLeftM" :scale="2" :class="ns.be('panel__back')" @click="emit('back')" />
      <Icon :icon="ComponentConfig[inputType]?.icon" :scale="1.8" />
      <span>{{ label }}</span>
    </div>
    <div :class="ns.be('panel__content')">
      <template v-if="currentOption.inputType !== InputType.BOOLEAN">
        <Select
          :class="ns.be('panel__select')"
          :fitPopper="true"
          placement="bottom-start"
          v-model:value="selectedOperator"
          :options="currentOption.operators"
          :to="`.${ns.be('panel__content')}`"
          @change="handleSelectChange"
        ></Select>
        <hr />
      </template>

      <slot> </slot>
    </div>
    <div :class="addClass" @click="add">{{ editData?.value ? '修改' : '添加' }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { CaretLeftM } from '@panda-ui/icons'
import { Select, Icon } from '@panda-ui/components'
import { Operator, RuleData, ComponentConfig, FILTER_INJECTION_KEY, InputType } from '../types'
import { basicFilterPanelProps } from '../props'

const { currentOption, editData, editRule, addRule } = inject(FILTER_INJECTION_KEY)

defineOptions({
  name: 'BasicFilterPanel'
})
const emit = defineEmits(['back', 'add', 'renderBetween'])
const props = defineProps(basicFilterPanelProps)
const ns = useNamespace('filter')

const selectedOperator = ref(
  editData.value && currentOption.value?.inputType === editData.value.inputType
    ? editData.value.operator.value
    : currentOption.value?.operators[0].value
)

const inputType = computed(() => currentOption.value?.inputType)
const label = computed(() => currentOption.value?.label)
const addClass = computed(() => {
  return [
    ns.be('panel__add'),
    {
      [ns.bem('panel__add', 'active')]: props.isAddActive
    }
  ]
})

const handleSelectChange = (value: string) => {
  const operator = currentOption.value?.operators.find((op: Operator) => op.value === value)
  emit('renderBetween', operator.isBetween)
}

const getOperator = () => {
  const operators = currentOption.value?.operators || []
  if (currentOption.value.inputType === InputType.BOOLEAN) {
    return props.currentFilterValue ? operators[0] : operators[1]
  } else {
    return operators.find((op: Operator) => op.value === selectedOperator.value)
  }
}

const add = () => {
  if (!props.isAddActive) return

  const { operators, ...rule }: RuleData = {
    ...currentOption.value,
    operator: getOperator(),
    value: props.currentFilterValue
  }
  if (editData.value) {
    editRule(rule)
  } else {
    addRule(rule)
  }
}

watch(
  editData,
  () => {
    if (editData.value) {
      selectedOperator.value = editData.value.operator.value
    }
  },
  {
    deep: true
  }
)
</script>
