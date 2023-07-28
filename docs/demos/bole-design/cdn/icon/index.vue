<template>
  <!-- <Icon v-bind="icons.loading"></Icon> -->
  <svg fill="none" height="512" width="512" xmlns="http://www.w3.org/2000/svg">
    <g fill="#528dd7">
      <path
        d="M64 480c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32s32 14.4 32 32v384c0 17.6-14.4 32-32 32z"
      />
      <path
        d="M360.4 80c-62.8 0-86.8-32-149.2-32-50.8 0-74.8 20.8-115.2 28.8v64c40.4-8 64.4-28.8 115.2-28.8 62.8 0 86.4 32 149.2 32 20.4 0 35.6-2.8 55.6-9.2v192c-20 6.4-35.2 9.2-55.6 9.2-62.8 0-86.8-32-149.2-32-20.4 0-36.4 3.6-51.2 8v64c14.8-4.8 30.8-8 51.2-8 62.8 0 86.4 32 149.2 32 37.2 0 56.4-9.6 119.6-32V48c-63.2 22.4-82.4 32-119.6 32z"
      />
    </g>
  </svg>
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
// import { useIcons } from '@bole-design/common/config/icons'

// const icons = useIcons()

defineComponent({
  name: 'cdn-icon'
})

const { data } = useRoute()
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
