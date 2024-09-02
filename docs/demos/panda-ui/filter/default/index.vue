<script setup lang="ts">
import { ref } from 'vue'
import type { RuleData, RuleOption } from '@panda-ui/components/filter/types'
import { InputType, Category, LogicalOperator } from '@panda-ui/components/filter/types'

const ruleData = ref<RuleData>({
  category: Category.LOGIGAL,
  operator: LogicalOperator.AND,
  val: [
    {
      field: 'email',
      label: '邮箱',
      operator: { label: '等于', value: 'EQUALS' },
      val: '111@uio.com',
      inputType: InputType.INPUT,
      category: Category.PRIMARY,
    },
    {
      field: 'dateField',
      label: '时间date字段',
      operator: { label: '等于', value: 'EQUALS' },
      val: '2023-12-28',
      inputType: InputType.DATE,
      category: Category.PRIMARY,
    },
    {
      field: 'isResolved',
      label: '是否处理',
      operator: { label: 'is_true', value: 'is-true' },
      val: true,
      inputType: InputType.BOOLEAN,
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
})

const ruleOptions: RuleOption[] = [
  {
    field: 'count',
    label: '数量',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '大于', value: 'GREATER_THAN' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUTNUMBER,
  },
  {
    field: 'isResolved',
    label: '是否处理',
    inputType: InputType.BOOLEAN,
    operators: [
      { label: 'is_true', value: 'is-true' },
      { label: 'is_false', value: 'is-false' },
    ],
  },
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
    field: 'count',
    label: '数量',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
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
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
    ],
    inputType: InputType.DATE,
  },
]
</script>

<template>
  <Filter v-model:ruleData="ruleData" :rule-options="ruleOptions" />
</template>
