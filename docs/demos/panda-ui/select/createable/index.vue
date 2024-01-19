<template>
  <p>当前值：{{ value }}</p>

  <Select
    v-model:value="value"
    :options="options"
    filterable
    creatable
    default-first-option
  ></Select>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>()

const options = [
  {
    label: '选项1',
    value: 1
  },
  {
    label: '选项2',
    value: 2
  },
  {
    label: '选项3',
    value: 3
  },
  {
    label: '选项4',
    value: 4
  },
  {
    label: '选项5',
    value: 5
  }
]
</script>

<style scoped lang="scss">
.bl-select {
  width: 180px;
}
</style>
