<script lang="ts" setup>
import BLDocContent from './bl-doc-content.vue'

defineProps<{ hasSidebar: boolean }>()
</script>

<template>
  <main
    id="page-content"
    :class="{ 'has-sidebar': hasSidebar }"
    class="bl-doc page-content"
  >
    <BLDocContent>
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
    </BLDocContent>
  </main>
</template>

<style lang="scss">
.page-content {
  width: 100%;
}
.has-sidebar {
  display: grid;
  grid-template-columns: 1fr 300px;
  background-image: none;
  gap: 2.5rem;
  margin-left: 290px;
  .doc-content-wrapper {
    display: flex;
    display: grid;
    grid-template-columns: 1fr 240px;
    gap: 2.5rem;
  }
  .doc-content-container {
    padding-top: 2rem;
    width: 800px;
  }
}
</style>
