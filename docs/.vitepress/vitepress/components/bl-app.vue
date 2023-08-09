<script setup lang="ts">
import BlSidebar from './sidebar/sidebar.vue'
import LayoutHeader from './bl-header.vue'
import LayoutFooter from './bl-footer.vue'
import BLContent from './bl-content.vue'
import { useSidebar } from '../composables/sidebar'
import { nextTick, onMounted } from 'vue'

const { hasSidebar } = useSidebar()
const isClient = typeof window !== 'undefined'
const rootCls = isClient ? document.documentElement.classList : undefined

onMounted(() => {
  nextTick(() => {
    // rootCls?.add('dark')
  })
})
</script>

<template>
  <div>
    <LayoutHeader />
    <div class="homepage-body" :class="{ 'no-sider': !hasSidebar }">
      <BlSidebar :hasSidebar="hasSidebar" />
      <BLContent :hasSidebar="hasSidebar">
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
    </div>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.homepage-body {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  justify-content: center;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: flex-start;
}
.no-sider {
  display: flex;
}
@media (min-width: 1400px) {
  .homepage-body {
    max-width: 1400px;
  }
}
</style>
