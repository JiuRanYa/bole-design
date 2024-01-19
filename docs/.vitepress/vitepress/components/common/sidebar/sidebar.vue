<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import SidebarLink from './sidebar-link.vue'
import { useSidebar } from '../../../composables/sidebar'
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'

defineComponent({
  name: 'bl-sidebar'
})

defineProps({
  hasSidebar: Boolean
})

const { sidebars } = useSidebar()

const style = ref({
  overflow: 'hidden'
})
</script>

<template>
  <Simplebar data-simplebar-auto-hide="true" class="bl-sidebar">
    <aside v-if="hasSidebar" :style="style">
      <div class="sidebar-groups">
        <section v-for="(item, key) of sidebars" :key="key" class="sidebar-group">
          <p class="sidebar-group__title">
            {{ item?.text }}
          </p>
          <SidebarLink v-for="(child, childKey) in item.children" :key="childKey" :item="child" />
        </section>
      </div>
    </aside>
  </Simplebar>
</template>

<style lang="scss">
.bl-sidebar {
  width: 250px;
  padding-left: 3rem;
  box-sizing: border-box;
  position: fixed;
  margin-top: 1rem;
  height: calc(100vh - var(--header-height) - 1rem);
  .sidebar-groups {
    .sidebar-group {
      &:not(:first-child) {
        margin-top: 20px;
      }
      &__title {
        color: var(--text-active);
        font-size: 14px;
        line-height: 24px;
        font-weight: 600;
        margin: 12px 0;
      }
    }
  }
}

.simplebar-scrollbar {
  &::before {
    width: 6px;
    background-color: var(--bl-content-color-disabled);
    border-radius: 12px;
  }
}
</style>
