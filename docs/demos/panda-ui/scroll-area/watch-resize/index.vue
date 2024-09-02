<script setup lang="ts">
import { computed, ref } from 'vue'

const len = ref(3)
const tags = computed(() => {
  return Array.from({ length: len.value }).map((_, i, a) => `${i + 1}`)
})

function overflowScroll() {
  len.value = len.value === 3 ? 50 : 3
}
</script>

<template>
  <ScrollArea height="300px" :watch-resize="true">
    <div v-for="t in tags" class="scroll-area-item">
      {{ t }}
    </div>
  </ScrollArea>

  <Button type="secondary" class="btn-overflow" @click="overflowScroll">
    {{ len === 3 ? '溢出' : '取消溢出' }}
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
.btn-overflow {
  margin: 10px;
}
</style>
