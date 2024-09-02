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
      field: 'filterText',
      label: '过滤名称',
      val: '名称a',
      operator: { label: '等于', value: 'EQUALS' },
      inputType: InputType.INPUT
    },
    {
      category: Category.PRIMARY,
      operator: { label: "不等于", value: "NOT_EQUALS" },
      val: "100",
      field: "count",
      label: "数量",
      inputType: InputType.INPUT
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
]
</script>

<template>
  <Filter v-model:ruleData="ruleData" :rule-options="ruleOptions" :readonly="true" />
</template>
