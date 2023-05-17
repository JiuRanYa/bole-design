<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'bl-sidebar'
})

defineProps({
  hasSidebar: Boolean
})
</script>

<template>
  <div v-if="hasSidebar">
    <aside>sidebar</aside>
  </div>
</template>

<style lang="scss" scoped>
aside {
  width: 20vw;
  height: 100vh;
  background: red;
  position: fixed;
  left: 0;
}
</style>
