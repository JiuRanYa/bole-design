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
  .doc-content-container {
    h1 {
      margin-top: 0 !important;
    }
  }
}
</style>
