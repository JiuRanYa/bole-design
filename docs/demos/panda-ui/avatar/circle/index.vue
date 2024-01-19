<template>
  <div class="avatar-box">
    <Avatar circle src="https://avatars.githubusercontent.com/u/58846658?v=4" size="small" />
    <Avatar circle src="https://avatars.githubusercontent.com/u/58846658?v=4" />
    <Avatar circle src="https://avatars.githubusercontent.com/u/58846658?v=4" size="large" />
    <Avatar circle src="https://avatars.githubusercontent.com/u/58846658?v=4" :size="50" />
  </div>
</template>

<script setup lang="ts"></script>

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
