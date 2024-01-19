<template>
  <FilterGroup v-model:rulesGroup="rulesGroup">
    <template #filter="{ filter }">
      <Filter :ruleOptions="ruleOptions" v-model:rules="filter.rules">
        <template #rule="{ rule }">
         【{{ rule.label }}】
        </template>
        <template #filter> 自定义筛选按钮 </template>
      </Filter>
    </template>
    <template #actions="{ index, filter, addFilter, copyFilter, removeFilter }">
      <div @click="addFilter(index)">[add]</div>
      <div @click="copyFilter(index)">[copy]</div>
      <div @click="removeFilter(index)">[remove]</div>
    </template>
  </FilterGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Filter } from '@panda-ui/components'

const rulesGroup = ref([
  [
    {
      field: 'count',
      label: '数量',
      operator: { label: '不等于', value: 'NOT_EQUALS' },
      value: '123',
      inputType: 'input'
    }
  ],
  [
    {
      field: 'filterText',
      label: '过滤名称',
      operator: { label: '等于', value: 'EQUALS' },
      value: '名称a',
      inputType: 'input'
    }
  ]
])

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
