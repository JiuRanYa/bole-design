<template>
  <Icon :icon="Sun" :scale="2"></Icon>
  <Icon :icon="SunR" :scale="2"></Icon>
  <Icon :icon="Moon" :scale="2"></Icon>
  <Icon :icon="MoonR" :scale="2"></Icon>
  <Icon :icon="Flag" :scale="2"></Icon>
  <Icon :icon="FlagR" :scale="2"></Icon>
</template>

<script setup lang="ts">
import { Sun, SunR, Flag, FlagR, Moon, MoonR } from '@panda-ui/icons'
</script>

<style scoped>
.bl-icon {
  margin-inline-end: 12px;
}
</style>
