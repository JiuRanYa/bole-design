<script lang="ts" setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<template>
  <div class="doc-content-wrapper">
    <div class="doc-content-container">
      <Content class="doc-content" />
    </div>
  </div>
</template>
