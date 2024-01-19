<template>
  <Select v-model:value="value" :options="cities" placeholder="Select" filterable>
    <template #option="{ option, index, isSelected }">
      {{ `${index + 1}、${option.label}: ${isSelected}` }}
    </template>
  </Select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('')
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing'
  },
  {
    value: 'Shanghai',
    label: 'Shanghai'
  },
  {
    value: 'Nanjing',
    label: 'Nanjing'
  },
  {
    value: 'Chengdu',
    label: 'Chengdu'
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen'
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou'
  }
]
</script>

<style lang="scss" scoped>
.bl-select {
  width: 180px;
}
</style>
