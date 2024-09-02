<script setup lang="ts">
import { Flag, FlagR, Moon, MoonR, Sun, SunR } from '@panda-ui/icons'
</script>

<template>
  <Icon :icon="Sun" :scale="2" />
  <Icon :icon="SunR" :scale="2" />
  <Icon :icon="Moon" :scale="2" />
  <Icon :icon="MoonR" :scale="2" />
  <Icon :icon="Flag" :scale="2" />
  <Icon :icon="FlagR" :scale="2" />
</template>

<style scoped>
.bl-icon {
  margin-inline-end: 12px;
}
</style>
