<script setup lang="ts">
import { ref } from 'vue'

const disabled = ref()
</script>

<template>
  <InputNumber :disabled="disabled" />

  <Button type="primary" size="small" style="margin-left: 24px" @click="disabled = !disabled">
    Toggle Disabled
  </Button>
</template>
