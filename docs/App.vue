<script setup lang="ts">
import HomePage from './.vitepress/vitepress/components/bl-container.vue'
import LayoutHeader from './.vitepress/vitepress/components/bl-header.vue'
import LayoutFooter from './.vitepress/vitepress/components/bl-footer.vue'
import Demo from './demos/button/basic/demo.zh-CN.vue'
</script>

<template>
  <div>
    <LayoutHeader />
    <HomePage />
    <LayoutFooter />
    <Demo />
  </div>
</template>
