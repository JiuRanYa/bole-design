<script setup lang="ts">
import { Cat, Flag, Moon, Sun } from '@panda-ui/icons'
</script>

<template>
  <Icon :icon="Sun" />
  <Icon :icon="Moon" />
  <Icon>
    <Flag />
  </Icon>
  <Icon>
    <Cat />
  </Icon>
</template>

<style scoped>
.bl-icon {
  margin-inline-end: 12px;
}
</style>
