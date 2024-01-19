<template>
  <Icon :icon="Sun" :scale="2"></Icon>
  <Icon :icon="Moon" :scale="2"></Icon>
  <Icon :scale="2">
    <Flag></Flag>
  </Icon>
  <Icon :scale="2">
    <Cat></Cat>
  </Icon>
</template>

<script setup lang="ts">
import { Sun, Moon, Flag, Cat } from '@panda-ui/icons'
</script>

<style scoped>
.bl-icon {
  margin-inline-end: 12px;
}
</style>
