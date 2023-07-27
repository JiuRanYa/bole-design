<template>
  <div class="icon-demo-container" v-for="sourceType in Object.keys(iconPath)">
    <h1>{{ sourceType }}</h1>
    <!-- <div class="icon-demo" v-for="icon in iconMap[sourceType]"> -->
    <!-- <img :src="`/icon/${sourceType}/${icon}`" /> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'cdn-icon'
})

const iconPath = {
  brands: [{ name: 'apple.svg' }]
}
</script>

<style lang="scss" scoped>
.icon-demo-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
  .icon-demo {
    img {
      width: 30px;
    }
  }
}
</style>
