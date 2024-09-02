<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<template>
  <InputNumber v-model:value="inputValue" :step="0.001" control-position="right" />

  <br>
  <br>
  当前值: {{ inputValue }}
</template>
