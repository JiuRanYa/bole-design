<template>
  <Icon v-bind="icons.loading"></Icon>
  <div class="icon-demo-container">
    <div class="icon-demo" v-for="icon in iconMap['brands']">
      <!-- <img :src="`/icon/${type}/${icon}`" loading="lazy" decoding="async" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vitepress'
import iconMap from '@/iconMap'
import { useIcons } from '@bole-design/common/config/icons'

const icons = useIcons()

defineComponent({
  name: 'cdn-icon'
})

const { data } = useRoute()
console.log(icons)
const type = data.frontmatter.title
</script>

<style lang="scss" scoped>
.icon-demo-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-;
  gap: 20px;
  .icon-demo {
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
