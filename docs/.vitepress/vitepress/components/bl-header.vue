<template>
  <header :class="`${prefix}-header`">
    <span :class="`${prefix}-logo`"> Bole UI </span>

    <div class="bl-nav">123</div>
  </header>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

const prefix = 'bl'

defineComponent({
  name: 'header',
})
</script>

<style lang="scss">
.bl {
  &-header {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    height: var(--header-height);
    background-color: var(--bg-color);
    border-bottom: var(--bl-border-light-2);
    transition: var(--bl-transition-border), var(--bl-transition-transform);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &-logo {
    width: 200px;
  }
}
</style>
