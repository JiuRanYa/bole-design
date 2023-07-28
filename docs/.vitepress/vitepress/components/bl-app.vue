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
    <LayoutFooter />
  </div>
</template>
