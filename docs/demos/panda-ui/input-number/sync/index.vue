<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()

function handleChange(value) {
  console.log(value)
}
</script>

<template>
  <InputNumber
    v-model:value="inputValue"
    sync
    :min="10"
    :max="100"
    :precision="3"
    @change="handleChange"
  />

  <br>
  <br>

  当前值: {{ inputValue }}
</template>
