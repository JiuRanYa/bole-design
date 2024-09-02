<script setup lang="ts">
import { onMounted, provide } from 'vue'
import { useRoute, useRouter } from 'vitepress'
import { useSidebar } from '../composables/sidebar'
import { rootKey } from '../tookens/index'
import BlSidebar from './common/sidebar/sidebar.vue'
import LayoutHeader from './bl-header.vue'
import LayoutFooter from './bl-footer.vue'
import BLContent from './bl-content.vue'
import { supportProjects } from '@/.vitepress/configs/projects'

const { hasSidebar } = useSidebar()

provide(rootKey, { hasSidebar })

const route = useRoute()

const router = useRouter()

onMounted(() => {
  const defaultPro = 'panda-ui'
  const localStorageProName = 'bl-userPreferredPro'
  const path = route.path
  const hasLocalStorage = localStorage.getItem(localStorageProName)
  const splitPaths = path.split('/')

  let pathProject = ''
  splitPaths.forEach((path) => {
    if (supportProjects.includes(path))
      pathProject = path
  })

  if (supportProjects.includes(pathProject)) {
    if (localStorage.getItem(localStorageProName) !== pathProject) {
      localStorage.setItem(localStorageProName, pathProject)

      router.go(`/projects/${pathProject}/`)
      window.location.reload()
    }
    return
  }

  if (hasLocalStorage) {
    const toProject = localStorage.getItem(localStorageProName) ?? ''
    if (supportProjects.includes(toProject))
      router.go(`/projects/${toProject}/`)
    else
      localStorage.setItem(localStorageProName, defaultPro)
  }
  else {
    localStorage.setItem(localStorageProName, 'select-pro')

    router.go(`/projects/select-pro/`)
  }
})
</script>

<template>
  <LayoutHeader />
  <div class="homepage" :class="{ 'no-bg': !hasSidebar }">
    <div class="homepage-body" :class="{ 'no-sider': !hasSidebar, 'bg-container': !hasSidebar }">
      <BlSidebar v-if="hasSidebar" :has-sidebar="hasSidebar" />
      <BLContent :has-sidebar="hasSidebar">
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
