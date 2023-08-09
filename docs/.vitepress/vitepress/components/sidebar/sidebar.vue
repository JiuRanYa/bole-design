<script setup lang="ts">
import { defineComponent } from 'vue'
import SidebarLink from './sidebar-link.vue'
import { useSidebar } from '../../composables/sidebar'

defineComponent({
  name: 'bl-sidebar'
})

defineProps({
  hasSidebar: Boolean
})

const { sidebars } = useSidebar()
</script>

<template>
  <aside v-if="hasSidebar" class="bl-sidebar">
    <div class="sidebar-groups">
      <section v-for="(item, key) of sidebars" :key="key" class="sidebar-group">
        <p class="sidebar-group__title">
          {{ item.text }}
        </p>
        <SidebarLink v-for="(child, childKey) in item.children" :key="childKey" :item="child" />
      </section>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.bl-sidebar {
  width: 240px;
  height: 100%;
  padding: 48px 32px 96px;
  box-sizing: border-box;
  .sidebar-groups {
    .sidebar-group {
      &__title {
        font-size: 1rem;
        line-height: 24px;
        font-weight: 700;
      }
    }
  }
}
</style>
