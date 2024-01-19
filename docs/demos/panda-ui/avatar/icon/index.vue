<template>
  <div class="avatar-box">
    <Avatar circle :icon="User" size="small"></Avatar>
    <Avatar circle :icon="User"></Avatar>
    <Avatar circle :icon="User" size="large"></Avatar>
  </div>
</template>

<script setup lang="ts">
import { User } from '@panda-ui/icons'
</script>

<style lang="scss" scoped>
.avatar-box {
  display: inline-flex;
  align-items: center;
  width: 100%;

  & + & {
    margin-top: 24px;
  }
}
</style>
