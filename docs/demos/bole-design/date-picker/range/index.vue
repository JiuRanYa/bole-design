<template>
  <DatePicker type="range" v-model:value="date" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const date = ref()

watch(
  () => date.value,
  value => {
    console.log(value)
  }
)
</script>
