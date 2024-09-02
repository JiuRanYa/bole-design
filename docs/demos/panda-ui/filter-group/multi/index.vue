<script setup lang="ts">
import { ref } from 'vue'
import { string } from 'yup'
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
          field: 'email',
          label: '邮箱',
          operator: { label: '等于', value: 'EQUALS' },
          val: '111@uio.com',
          inputType: InputType.INPUT,
          category: Category.PRIMARY,
        },
      ]
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
    validationSchema: string().email(),
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
]
</script>

<template>
  <FilterGroup v-model:ruleDataGroup="ruleDataGroup" :rule-options="ruleOptions" />
</template>
