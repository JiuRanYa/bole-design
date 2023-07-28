<template>
  <!-- <Icon v-bind="icons.loading"></Icon> -->
  <div class="icon-demo-container">
    <Tooltip :content="icon.name" trigger="hover" v-for="icon in iconCategory[type]">
      <div class="icon-demo">
        <div v-html="icon.show_svg" class="svg-wrapper"></div>
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

<style lang="scss">
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
    .svg-wrapper {
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    &:hover {
      background: var(--bl-color-primary-light-9);
    }
  }
}
</style>
