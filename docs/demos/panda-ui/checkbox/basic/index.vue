<script setup lang="ts">
import { ref } from 'vue'

const value = ref(true)
</script>

<template>
  <Checkbox v-model:value="value" label="checkbox" />
</template>
