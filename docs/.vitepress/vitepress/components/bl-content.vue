<script lang="ts" setup>
import BLDocContent from './bl-doc-content.vue'

defineProps<{ hasSidebar: boolean }>()
</script>

<template>
  <main
    id="page-content"
    :class="{ 'page-content': true, 'has-sidebar': hasSidebar }"
    class="bl-doc"
  >
    <BLDocContent>
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
    </BLDocContent>
  </main>
</template>

<style lang="scss">
.page-content {
}
.has-sidebar {
  display: flex;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2.5rem;
  .doc-content-wrapper {
    display: flex;
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2.5rem;
  }
}
</style>
