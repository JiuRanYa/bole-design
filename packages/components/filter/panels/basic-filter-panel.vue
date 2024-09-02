<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { CaretLeftM } from '@panda-ui/icons'
import { Icon, Select } from '@panda-ui/components'
import { Category, ComponentConfig, FILTER_INJECTION_KEY, InputType } from '../types'
import type { Operator, RuleDataVal } from '../types'
import { basicFilterPanelProps } from '../props'

defineOptions({
  name: 'BasicFilterPanel',
})

const props = defineProps(basicFilterPanelProps)

const emit = defineEmits(['back', 'operatorSelected'])

const { currentOption, editData, editRule, addRule } = inject(FILTER_INJECTION_KEY)!

const ns = useNamespace('filter')

const selectedOperator = ref(
  editData.value && currentOption.value?.inputType === editData.value.inputType
    ? editData.value.operator.value
    : (currentOption.value?.operators?.length && currentOption.value.operators[0].value),
)

const inputType = computed(() => currentOption.value?.inputType)
const label = computed(() => currentOption.value?.label)
const addClass = computed(() => {
  return [
    ns.be('panel__add'),
    {
      [ns.bem('panel__add', 'active')]: props.isAddActive,
    },
  ]
})

function handleSelectChange(option: any) {
  emit('operatorSelected', option)
}

function getOperator() {
  const operators = currentOption.value?.operators || []
  if (currentOption.value?.inputType === InputType.BOOLEAN)
    return props.currentFilterValue ? operators[0] : operators[1]
  else
    return operators.find((op: Operator) => op.value === selectedOperator.value)
}

function update() {
  if (!props.isAddActive)
    return

  const { field, label, inputType } = currentOption.value!

  const ruleVal: RuleDataVal = {
    category: Category.PRIMARY,
    operator: getOperator()!,
    val: props.currentFilterValue,
    field,
    label,
    inputType,
  }

  if (editData.value)
    editRule(ruleVal)
  else
    addRule(ruleVal)
}

watch(
  editData,
  () => {
    if (editData.value)
      selectedOperator.value = editData.value.operator.value
  },
  {
    deep: true,
  },
)
</script>

<template>
  <div :class="ns.be('panel')">
    <div :class="ns.be('panel__title')">
      <Icon :icon="CaretLeftM" :scale="2" :class="ns.be('panel__back')" @click="emit('back')" />
      <Icon :icon="ComponentConfig[inputType as keyof typeof ComponentConfig]?.icon" :scale="1.8" />
      <span>{{ label }}</span>
    </div>

    <div :class="ns.be('panel__content')">
      <template v-if="currentOption?.inputType !== InputType.BOOLEAN">
        <Select
          v-model:value="selectedOperator"
          :class="ns.be('panel__select')"
          :fit-popper="true"
          placement="bottom-start"
          :options="currentOption?.operators || []"
          @select="handleSelectChange"
        />
        <hr>
      </template>

      <slot />
    </div>

    <div :class="addClass" @click="update">
      {{ editData?.val ? '修改' : '添加' }}
    </div>
  </div>
</template>
