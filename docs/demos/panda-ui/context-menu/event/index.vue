<template>
  <ContextMenu @show="handleShow">
    <template #trigger>
      <div class="context-menu-trigger">Click here</div>
    </template>
    <template #content> <div class="menu-content">content</div> </template>
  </ContextMenu>
</template>

<script setup lang="ts">
function handleShow(params) {
  console.log(params)
}
</script>

<style lang="scss" scoped>
.context-menu-trigger {
  border: 1px dashed var(--bl-border-color-base);
  width: 300px;
  height: 200px;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu-content {
  border: 1px dashed var(--bl-border-color-base);
  padding: 20px;
}
</style>
