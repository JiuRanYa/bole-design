<template>
  <!-- <Icon v-bind="icons.loading"></Icon> -->
  <div class="icon-demo-container">
    <Tooltip :content="icon" trigger="hover" v-for="icon in iconCategory[type]">
      <div class="icon-demo">
        <img :src="`/icon/${type}/${icon}`" loading="lazy" decoding="async" />
      </div>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useRoute } from 'vitepress'
import iconMap from '@/iconCategory.json'

const iconCategory = shallowRef<any>(iconMap)

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
  .icon-demo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    img {
      width: 30px;
      height: 30px;
    }

    &:hover {
      background: var(--bl-color-primary-light-9);
    }
  }
}
</style>
