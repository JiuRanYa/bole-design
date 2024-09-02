<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<template>
  <InputNumber v-model:value="inputValue" :min="10" :max="100" />

  <br>
  <br>

  当前值: {{ inputValue }}
</template>
