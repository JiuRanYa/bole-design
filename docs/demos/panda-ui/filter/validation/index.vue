<template>
  <Filter :ruleOptions="ruleOptions" v-model:rules="rules" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { string, number } from 'yup'

const defaultRules = [
  {
    field: 'email',
    label: '邮箱',
    operator: { label: '等于', value: 'EQUALS' },
    value: '111@uio.com',
    inputType: 'input'
  },
  {
    field: 'count',
    label: '客诉数量',
    operator: { label: '等于', value: 'EQUALS' },
    value: 100,
    inputType: 'input'
  },
  {
    field: 'userCount',
    label: '用户数量',
    operator: { label: '包含', value: 'AND' },
    value: [99],
    inputType: 'multiInput'
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
    inputType: 'input',
    validationSchema: string().email()
  },
  {
    field: 'count',
    label: '客诉数量',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '介于', value: 'BETWEEN', isBetween: true },
      { label: '大于等于', value: 'GREATER_THAN_EQUALS' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input',
    validationSchema: number().min(18, '数量必须大于18')
  },
  {
    field: 'userCount',
    label: '用户数量',
    operators: [
      { label: '包含', value: 'AND' },
      { label: '包含其中之一', value: 'OR' }
    ],
    inputType: 'multiInput',
    validationSchema: number().positive()
  }
]
</script>
