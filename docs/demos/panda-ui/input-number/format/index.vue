<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref()
</script>

<template>
  <InputNumber v-model:value="inputValue" :formatter="(value: any) => `${value}%`" />

  <br>
  <br>

  当前值: {{ inputValue }}
</template>
