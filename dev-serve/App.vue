<template>
  <div>app</div>
  <main>
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </main>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'app',
})
</script>
