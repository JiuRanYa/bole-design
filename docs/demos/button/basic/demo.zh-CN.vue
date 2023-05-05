<template>
  <Button>Default</Button>
  <Button type="primary" @click="handleClick">Primary</Button>
  <Button type="info">Info</Button>
  <Button type="success">Success</Button>
  <Button type="error">Error</Button>
  <Button type="warning">Warning</Button>
</template>

<script setup lang="ts">
function handleClick() {
  alert('123')
}
</script>
