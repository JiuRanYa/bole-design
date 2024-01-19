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
    field: 'emailChild',
    label: '邮箱-child',
    inputType: 'input',
    operator: { label: '等于', value: 'EQUALS' },
    value: '222@uio.com'
  }
]

const rules = ref(defaultRules)

const ruleOptions = [
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
    field: 'customField',
    label: '自定义字段',
    inputType: 'custom'
  },
  {
    field: 'emailChild',
    label: '邮箱-child',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input',
    parentField: 'customField'
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
      { label: '小于等于', value: 'LESS_THAN_EQUALS' }
    ],
    inputType: 'date',
    parentField: 'customField'
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
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input',
    parentField: 'customField'
  },
  {
    field: 'customFieldChild',
    label: '自定义字段-child',
    inputType: 'custom',
    parentField: 'customField'
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
      { label: '小于等于', value: 'LESS_THAN_EQUALS' }
    ],
    inputType: 'date',
    parentField: 'customFieldChild'
  }
]
</script>
