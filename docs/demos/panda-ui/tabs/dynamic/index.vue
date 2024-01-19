<template>
  <Tabs v-model:value="activeName" defaultValue="account" tab-position="top">
    <template #trigger>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </template>
    <TabsPane :value="activeName"> </TabsPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'demo-tabs-basic'
})
const activeName = ref('account')
</script>
