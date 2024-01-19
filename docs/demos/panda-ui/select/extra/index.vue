<template>
  <p>当前值：{{ value }}</p>
  <Select v-model:value="value" :options="options">
    <template #prepend>
      <div
        style="
          width: 100%;
          padding: 4px 16px 8px;
          margin-bottom: 8px;
          border-bottom: var(--bl-border-light-2);
        "
      >
        随便放点东西
      </div>
    </template>
    <template #append>
      <div
        style="
          width: 100%;
          padding: 8px 16px 4px;
          margin-top: 8px;
          border-top: var(--bl-border-light-2);
        "
      >
        随便放点东西
      </div>
    </template>
  </Select>
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
  }
]
</script>

<style scoped>
.bl-select {
  width: 180px;
}
</style>
