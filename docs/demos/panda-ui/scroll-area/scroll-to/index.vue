<script setup lang="ts">
import { ref } from 'vue'
import type { ScrollAreaInstance } from 'panda-ui'

const tags = Array.from({ length: 50 }).map((_, i, a) => `${i + 1}`)

const scrollAreaRef = ref<ScrollAreaInstance>()

function handleScrollToTop() {
  scrollAreaRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <ScrollArea ref="scrollAreaRef" height="400px">
    <div v-for="t in tags" class="scroll-area-item">
      {{ t }}
    </div>
  </ScrollArea>

  <Button type="primary" @click="handleScrollToTop">
    回到顶部
  </Button>
</template>

<style lang="scss" scoped>
.scroll-area-item {
  height: 60px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--bl-border-base);
  border-radius: var(--bl-radius-base);

  &:last-child {
    margin-bottom: 0px;
  }
  &:first-child {
    margin-top: 0px;
  }
}
</style>
