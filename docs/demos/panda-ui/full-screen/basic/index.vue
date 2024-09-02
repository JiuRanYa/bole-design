<script setup lang="ts">
import { ref } from 'vue'

const fullScreen = ref()
</script>

<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle, full }" class="modal-full-screen">
    <div class="container" :class="{ 'is-full': full }">
      <span>
        需要全屏展示的元素，当前全屏状态状态：
        <strong>{{ full }}</strong>
      </span>
      <br>
      <br>
      <div>
        <Button type="primary" @click="toggle('window')">
          {{ !full ? '网页全屏' : '退出全屏' }}
        </Button>
        <Button type="primary" @click="toggle('browser')">
          {{ !full ? '浏览器全屏' : '退出浏览器全屏' }}
        </Button>
      </div>
    </div>
  </FullScreen>
</template>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  color: var(--bl-color-primary-base);
}

.is-full {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bl-color-primary-foreground);
}
</style>
