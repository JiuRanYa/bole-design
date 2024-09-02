<script setup lang="ts">
import { ref } from 'vue'
import type { RuleData, RuleOption } from '@panda-ui/components/filter/types'
import { InputType, Category, LogicalOperator } from '@panda-ui/components/filter/types'

const ruleData = ref<RuleData>({
  category: Category.LOGIGAL,
  operator: LogicalOperator.AND,
  val: [
    {
      category: Category.PRIMARY,
      field: 'email',
      label: '邮箱',
      operator: { label: '等于', value: 'EQUALS' },
      val: '111@uio.com',
      inputType: InputType.INPUT,
    },
    {
      category: Category.PRIMARY,
      field: 'emailChild',
      label: '邮箱-child',
      inputType: InputType.INPUT,
      operator: { label: '等于', value: 'EQUALS' },
      val: '222@uio.com',
    }
  ]
})

const ruleOptions: RuleOption[] = [
  {
    field: 'email',
    label: '邮箱',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUT,
  },
  {
    field: 'num',
    label: '客诉数量',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' },
    ],
    inputType: InputType.MULTIINPUT,
  },
  {
    field: 'customField',
    label: '自定义字段',
    inputType: InputType.CUSTOM,
  },
  {
    field: 'emailChild',
    label: '邮箱-child',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUT,
    parentField: 'customField',
  },
  {
    field: 'dateFieldChild',
    label: '时间date字段-child',
    operators: [
      { label: '大于', value: 'GREATER_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
    ],
    inputType: InputType.DATE,
    parentField: 'customField',
  },
  {
    field: 'countChild',
    label: '数量-child',
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
    parentField: 'customField',
  },
  {
    field: 'customFieldChild',
    label: '自定义字段-child',
    inputType: InputType.CUSTOM,
    parentField: 'customField',
  },
  {
    field: 'dateFieldChildChild',
    label: '时间date字段-child-child',
    operators: [
      { label: '大于', value: 'GREATER_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
    ],
    inputType: InputType.DATE,
    parentField: 'customFieldChild',
  },
]
</script>

<template>
  <Filter v-model:ruleData="ruleData" :rule-options="ruleOptions" />
</template>
