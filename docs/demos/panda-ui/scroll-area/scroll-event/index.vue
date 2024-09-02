<script setup lang="ts">
import type { ScrollAreaEvent } from 'panda-ui'

const tags = Array.from({ length: 50 }).map((_, i, a) => `${i + 1}`)

function handleScroll(e: ScrollAreaEvent) {
  console.log(e)
}
</script>

<template>
  <ScrollArea height="400px" @scroll="handleScroll">
    <div v-for="t in tags" class="scroll-area-item">
      {{ t }}
    </div>
  </ScrollArea>
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
