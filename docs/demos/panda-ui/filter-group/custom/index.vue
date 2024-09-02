<script setup lang="ts">
import { ref } from 'vue'
import { Filter } from '@panda-ui/components'
import type { RuleData, RuleOption } from '@panda-ui/components/filter/types'
import { InputType, Category, LogicalOperator } from '@panda-ui/components/filter/types'

const ruleDataGroup = ref<RuleData>({
  category: Category.LOGIGAL,
  operator: LogicalOperator.OR,
  val: [
    {
      field: 'count',
      label: 'count',
      operator: { label: '不等于', value: 'NOT_EQUALS' },
      val: '123',
      inputType: InputType.INPUT,
      category: Category.PRIMARY,
    },
    {
      category: Category.LOGIGAL,
      operator: LogicalOperator.AND,
      val: [
        {
          field: 'dateField',
          label: '时间date字段',
          operator: { label: '等于', value: 'EQUALS' },
          val: '2023-12-28',
          inputType: InputType.DATE,
          category: Category.PRIMARY,
        },
        {
          field: 'count',
          label: '数量',
          operator: { label: '等于', value: 'EQUALS' },
          val: 12,
          inputType: InputType.INPUTNUMBER,
          category: Category.PRIMARY,
        },
      ]
    }
  ]
})

const ruleOptions: RuleOption[] = [
  {
    field: 'filterText',
    label: '过滤名称',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUT,
  },
  {
    field: 'count',
    label: '数量',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '百分比', value: 'PERCENT' },
      { label: '大于', value: 'GREATER_THAN' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUT,
  },
  {
    field: 'dateField',
    label: '时间date字段',
    operators: [
      { label: '大于', value: 'GREATER_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
    ],
    inputType: InputType.DATE,
  },
  {
    field: 'textContent',
    label: '客诉内容',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' },
    ],
    inputType: InputType.MULTIINPUT,
  },
]

function setRuleDataGroup(index: number, ruleData: RuleData) {
  if (ruleDataGroup.value.operator === LogicalOperator.OR) {
    ruleDataGroup.value.val[index] = ruleData ? ruleData : null
  } else {
    ruleDataGroup.value = ruleData
  }
}
</script>

<template>
  <FilterGroup v-model:ruleDataGroup="ruleDataGroup">
    <template #filter="{ filter, index }">
      <Filter v-model:ruleData="filter.ruleData" :rule-options="ruleOptions"
        @change="setRuleDataGroup(index, filter.ruleData)">
        <template #trigger>
          筛选按钮
        </template>
      </Filter>
    </template>
  </FilterGroup>
</template>
