<template>
  <ScrollArea height="400px">
    <div v-for="t in tags" class="scroll-area-item">
      {{ t }}
    </div>
  </ScrollArea>
</template>

<script setup lang="ts">
const tags = Array.from({ length: 50 }).map((_, i, a) => `${i + 1}`)
</script>

<style lang="scss">
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
