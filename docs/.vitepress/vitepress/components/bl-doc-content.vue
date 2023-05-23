<script lang="ts" setup>
import { useData } from 'vitepress'
import BLTableContent from './doc-content/table-content.vue'

const { page } = useData()
console.log(page.value.headers)
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
    </div>

    <BLTableContent v-if="page.headers" />
  </div>
</template>
