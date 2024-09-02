<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'DemoTabsBasic',
})
const activeName = ref('account')
</script>

<template>
  <Tabs v-model:value="activeName" default-value="account" tab-position="top">
    <template #trigger>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
        Password
      </TabsTrigger>
    </template>
    <TabsPane :value="activeName" />
  </Tabs>
</template>
