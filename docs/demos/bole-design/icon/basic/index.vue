<template>
  <Icon :icon="Sun"></Icon>
  <Icon :icon="Moon"></Icon>
  <Icon>
    <Flag></Flag>
  </Icon>
  <Icon>
    <Cat></Cat>
  </Icon>
</template>

<script setup lang="ts">
import { Sun, Moon, Flag, Cat } from '@bole-design/icons'
</script>

<style scoped>
.bl-icon {
  margin-inline-end: 12px;
}
</style>
