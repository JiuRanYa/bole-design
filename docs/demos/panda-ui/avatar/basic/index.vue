<script setup lang="ts">
</script>

<template>
  <div class="avatar-box">
    <Avatar src="https://avatars.githubusercontent.com/u/58846658?v=4" size="small" />
    <Avatar src="https://avatars.githubusercontent.com/u/58846658?v=4" />
    <Avatar src="https://avatars.githubusercontent.com/u/58846658?v=4" size="large" />
    <Avatar src="https://avatars.githubusercontent.com/u/58846658?v=4" :size="50" />
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
