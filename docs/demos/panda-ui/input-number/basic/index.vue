<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<template>
  <InputNumber v-model:value="inputValue" />

  <br>
  <br>

  当前值: {{ inputValue }}
</template>
