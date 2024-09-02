<script setup lang="ts">
const tags = Array.from({ length: 50 }).map((_, i, a) => `${i + 1}`)

function handleScroll(e) {}
</script>

<template>
  <ScrollArea width="400px" mode="horizontal" @scroll="handleScroll">
    <div class="scroll-flex-content">
      <p v-for="item in 50" :key="item" class="scroll-area-item">
        {{ item }}
      </p>
    </div>
  </ScrollArea>
</template>

<style lang="scss" scoped>
.scroll-flex-content {
  display: flex;
  height: 100%;
}
.scroll-area-item {
  width: 160px;
  height: 400px;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: var(--bl-border-base);
  border-radius: var(--bl-radius-base);
  flex-shrink: 0;
}
</style>
