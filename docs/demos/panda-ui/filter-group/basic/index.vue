<template>
  <FilterGroup v-model:rulesGroup="rulesGroup" :ruleOptions="ruleOptions"> </FilterGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const rulesGroup = ref([])

const ruleOptions = [
  {
    field: 'filterText',
    label: '过滤名称',
    operators: [
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' }
    ],
    inputType: 'input'
  },
  {
    field: 'textContent',
    label: '客诉内容',
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
      { label: '百分比', value: 'PERCENT' },
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
      { label: '等于', value: 'EQUALS' },
      { label: '不等于', value: 'NOT_EQUALS' },
      { label: '小于', value: 'LESS_THAN' },
      { label: '小于等于', value: 'LESS_THAN_EQUALS' }
    ],
    inputType: 'date'
  }
]
</script>
