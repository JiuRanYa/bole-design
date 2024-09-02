<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref(12.5213123)
</script>

<template>
  <InputNumber v-model:value="inputValue" :precision="2" />

  <br>
  <br>
  当前值：{{ inputValue }}
</template>
