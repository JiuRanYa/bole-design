<script setup lang="ts">
import { User } from '@panda-ui/icons'
</script>

<template>
  <div class="avatar-box">
    <Avatar circle :icon="User" size="small" />
    <Avatar circle :icon="User" />
    <Avatar circle :icon="User" size="large" />
  </div>
</template>

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
