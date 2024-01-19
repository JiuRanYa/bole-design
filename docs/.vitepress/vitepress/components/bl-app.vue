<script setup lang="ts">
import BlSidebar from './common/sidebar/sidebar.vue'
import LayoutHeader from './bl-header.vue'
import LayoutFooter from './bl-footer.vue'
import BLContent from './bl-content.vue'
import SwitchProject from './common/switch-project/index.vue'
import { useSidebar } from '../composables/sidebar'
import { onMounted, provide } from 'vue'
import { rootKey, supportProjects } from '../tookens/index'
const { hasSidebar } = useSidebar()

provide(rootKey, { hasSidebar })

const defaultPro = 'panda-ui'
const localStorageProName = 'bl-userPreferredPro'

onMounted(() => {
  let userPreferredPro = localStorage.getItem(localStorageProName) ?? defaultPro

  !localStorage.getItem(localStorageProName) &&
    localStorage.setItem(localStorageProName, userPreferredPro)

  const targetPath = `/projects/${userPreferredPro}/`

  if (!supportProjects.includes(userPreferredPro)) {
    userPreferredPro = defaultPro
    localStorage.setItem(localStorageProName, userPreferredPro)
    window.location.pathname = targetPath
  }

  if (!window.location.pathname.includes(targetPath)) {
    window.location.pathname = targetPath
  }
})
</script>

<template>
  <div>
    <LayoutHeader />
    <div class="homepage" :class="{ 'no-bg': !hasSidebar }">
      <div class="homepage-body" :class="{ 'no-sider': !hasSidebar, 'bg-container': !hasSidebar }">
        <BlSidebar v-if="hasSidebar" :hasSidebar="hasSidebar" />
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

    <SwitchProject />
  </div>
</template>

<style lang="scss" scoped>
.bg-container {
  position: relative;
}
.homepage-bg {
  position: absolute;
}
.homepage {
  margin-top: var(--header-height);
}
.homepage.no-bg {
  background: url('/bl-bg.svg');
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-color: white;
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
