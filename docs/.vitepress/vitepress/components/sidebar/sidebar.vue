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
  width: 100%;
  padding-left: 3rem;
  margin-top: 1rem;
  box-sizing: border-box;
  position: sticky;
  top: 5rem;
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
</style>
