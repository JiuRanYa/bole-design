<script setup lang="ts">
import { ref } from 'vue'

const container = ref()
</script>

<template>
  <aside ref="container" class="toc-wrapper"></aside>
</template>
<style scoped lang="scss">
.sponsors-button:deep {
  button {
    width: 100%;
  }
}
</style>
