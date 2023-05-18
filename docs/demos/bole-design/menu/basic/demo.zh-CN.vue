<template>
  <Menu :options="options"></Menu>
</template>

<script setup lang="ts">
const options = [
  {
    label: 'Navigation One',
    key: 'mail',
  },
  {
    label: 'Navigation Two',
    key: 'app',
    disabled: true,
  },
]
</script>
