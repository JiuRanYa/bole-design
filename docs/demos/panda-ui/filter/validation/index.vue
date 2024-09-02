<script setup lang="ts">
import { ref } from 'vue'
import { number, string } from 'yup'
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
      field: 'count',
      label: '客诉数量',
      operator: { label: '等于', value: 'EQUALS' },
      val: 100,
      inputType: InputType.INPUT,
    },
    {
      category: Category.PRIMARY,
      field: 'userCount',
      label: '用户数量',
      operator: { label: '包含', value: 'AND' },
      val: [99],
      inputType: InputType.MULTIINPUT,
    },
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
    field: 'count',
    label: '客诉数量',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
    ],
    inputType: InputType.INPUT,
    validationSchema: number().min(18, '数量必须大于18'),
  },
  {
    field: 'userCount',
    label: '用户数量',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' },
    ],
    inputType: InputType.MULTIINPUT,
    validationSchema: number().positive(),
  },
]
</script>

<template>
  <Filter v-model:ruleData="ruleData" :rule-options="ruleOptions" />
</template>
