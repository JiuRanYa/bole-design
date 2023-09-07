<template>
  <div class="avatar-box">
    <Avatar :icon="User"></Avatar>
    <Avatar :icon="User"></Avatar>
    <Avatar :icon="User"></Avatar>
  </div>
  <div class="avatar-box">
    <Avatar circle :icon="User"></Avatar>
    <Avatar circle :icon="User"></Avatar>
    <Avatar circle :icon="User"></Avatar>
  </div>
</template>

<script setup lang="ts">
import { User } from '@bole-design/icons'
</script>

<style lang="scss" scoped>
.avatar-box {
  display: inline-flex;
  width: 100%;

  & + & {
    margin-top: 24px;
  }
}
</style>
