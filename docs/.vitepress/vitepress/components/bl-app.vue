<script setup lang="ts">
import BlSidebar from './sidebar/sidebar.vue'
import LayoutHeader from './bl-header.vue'
import LayoutFooter from './bl-footer.vue'
import BLContent from './bl-content.vue'
import { useSidebar } from '../composables/sidebar'
import { InjectionKey, nextTick, onMounted, provide } from 'vue'
import { rootKey } from '../tookens/index'

const { hasSidebar } = useSidebar()
const isClient = typeof window !== 'undefined'
const rootCls = isClient ? document.documentElement.classList : undefined

provide(rootKey, { hasSidebar })

onMounted(() => {
  nextTick(() => {
    // rootCls?.add('dark')
  })
})
</script>

<template>
  <div>
    <LayoutHeader />
    <div class="homepage" :class="{ 'no-bg': !hasSidebar }">
      <div class="homepage-body" :class="{ 'no-sider': !hasSidebar, 'bg-container': !hasSidebar }">
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
    </div>
    <LayoutFooter />
  </div>
</template>

<style lang="scss" scoped>
.bg-container {
  position: relative;
}
.homepage-bg {
  position: absolute;
}
.homepage.no-bg {
  background: url('/bl-bg.svg');
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-color: white;
  padding-bottom: 150px;
}
.homepage-body {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  justify-content: center;
  grid-template-columns: 240px minmax(0, 1fr);
  align-items: flex-start;
  position: relative;
  gap: 2.5rem;
  max-width: 100vw;
}
.dark {
  .homepage {
    background: none;
  }
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
