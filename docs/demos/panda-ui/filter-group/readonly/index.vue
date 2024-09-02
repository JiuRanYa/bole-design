<script setup lang="ts">
import { ref } from 'vue'
import type { RuleData, RuleOption } from '@panda-ui/components/filter/types'
import { InputType, Category, LogicalOperator } from '@panda-ui/components/filter/types'

const ruleDataGroup = ref<RuleData>({
  category: Category.LOGIGAL,
  operator: LogicalOperator.OR,
  val: [
    {
      field: 'filterText',
      label: '过滤名称',
      operator: { label: '不等于', value: 'NOT_EQUALS' },
      val: '测试过滤名称',
      inputType: InputType.INPUT,
      category: Category.PRIMARY,
    },
    {
      category: Category.PRIMARY,
      field: 'textContent',
      label: '客诉内容',
      operator: { label: '包含', value: 'AND' },
      val: ['账号找回', '密码'],
      inputType: InputType.MULTIINPUT,
    },
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
]
</script>

<template>
  <FilterGroup v-model:ruleDataGroup="ruleDataGroup" :rule-options="ruleOptions" :readonly="true" />
</template>
