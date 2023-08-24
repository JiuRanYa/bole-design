<script lang="ts" setup>
import { useData } from 'vitepress'
import BLTableContent from './doc-content/table-content.vue'
import { nextTick, onMounted } from 'vue'
import { useToc } from '../composables/toc'

const headers = useToc()
onMounted(() => {
  nextTick(() => {})
})
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
    </div>

    <BLTableContent v-if="headers.length" />
  </div>
</template>

<style lang="scss" scoped>
.doc-content-wrapper {
  display: flex;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2.5rem;
  .doc-content-container {
    padding-top: 2rem;
    width: 800px;
    h1 {
      margin-top: 0 !important;
    }
  }
}
</style>
