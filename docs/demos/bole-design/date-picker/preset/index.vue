<template>
  <DatePicker :presets="presets" />
</template>

<script setup lang="ts">
const presets = {
  昨日: ['2023-6-8'],
  七天前: ['2023-6-1']
}
</script>
