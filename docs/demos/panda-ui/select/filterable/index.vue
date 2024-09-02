<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>(1)

const options = [
  {
    label: '选项1',
    value: 1,
  },
  {
    label: '选项2',
    value: 2,
  },
  {
    label: '选项3',
    value: 3,
  },
]
</script>

<template>
  <p>当前值：{{ value }}</p>
  <Select v-model:value="value" filterable :options="options" />
</template>

<style scoped>
.bl-select {
  width: 180px;
}
</style>
