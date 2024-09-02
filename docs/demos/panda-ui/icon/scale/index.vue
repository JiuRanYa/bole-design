<script setup lang="ts">
import { Cat, Flag, Moon, Sun } from '@panda-ui/icons'
</script>

<template>
  <Icon :icon="Sun" :scale="2" />
  <Icon :icon="Moon" :scale="2" />
  <Icon :scale="2">
    <Flag />
  </Icon>
  <Icon :scale="2">
    <Cat />
  </Icon>
</template>

<style scoped>
.bl-icon {
  margin-inline-end: 12px;
}
</style>
