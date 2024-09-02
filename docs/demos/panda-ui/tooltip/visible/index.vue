<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
</script>

<template>
  <Tooltip :visible="visible">
    <template #content>
      <span>Content</span>
    </template>
    <Button @mouseenter="visible = true" @mouseleave="visible = false">
      Hover me
    </Button>
  </Tooltip>
</template>
