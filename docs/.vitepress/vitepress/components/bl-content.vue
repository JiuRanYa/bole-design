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
#page-content {
  padding-top: var(--header-height);
}
.has-sidebar {
  margin-left: 300px;
  padding: 40px;
}
</style>
