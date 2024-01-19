<template>
  <Filter :ruleOptions="ruleOptions" v-model:rules="rules" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const defaultRules = [
  {
    field: 'email',
    label: '邮箱',
    operator: { label: '等于', value: 'EQUALS' },
    value: '111@uio.com',
    inputType: 'input'
  },
  {
    field: 'dateField',
    label: '时间date字段',
    operator: { label: '等于', value: 'EQUALS' },
    value: '2023-12-28',
    inputType: 'date'
  },
  {
    field: 'isResolved',
    label: '是否处理',
    operator: { label: 'is_true', value: 'is-true' },
    value: true,
    inputType: 'boolean'
  }
]

const rules = ref(defaultRules)

const ruleOptions = [
  {
    field: 'isResolved',
    label: '是否处理',
    inputType: 'boolean',
    operators: [
      { label: 'is_true', value: 'is-true' },
      { label: 'is_false', value: 'is-false' }
    ]
  },
  {
    field: 'email',
    label: '邮箱',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input'
  },
  {
    field: 'num',
    label: '客诉数量',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' }
    ],
    inputType: 'multiInput'
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
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input'
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
      { label: '小于等于', value: 'LESS_THAN_EQUALS' }
    ],
    inputType: 'date'
  }
]
</script>
