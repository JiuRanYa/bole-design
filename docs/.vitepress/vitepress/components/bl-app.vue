<script setup lang="ts">
import HomePage from './bl-container.vue'
import LayoutHeader from './bl-header.vue'
import LayoutFooter from './bl-footer.vue'
import BLContent from './bl-content.vue'
import { useSidebar } from '../composables/sidebar'

const { hasSidebar } = useSidebar()

console.log(hasSidebar)
</script>

<template>
  <div>
    <LayoutHeader />
    <BLContent :is-sidebar-open="hasSidebar">
      <template #content-top>
        <slot name="content-top" />
      </template>
      <template #content-bottom>
        <slot name="content-bottom" />
      </template>
      <template #aside-top>
        <slot name="aside-top" />
      </template>
      <template #aside-mid>
        <slot name="aside-mid" />
      </template>
      <template #aside-bottom>
        <slot name="aside-bottom" />
      </template>
    </BLContent>
    <LayoutFooter />
  </div>
</template>
