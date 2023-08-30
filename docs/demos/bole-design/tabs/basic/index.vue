<template>
  <Tabs v-model:value="activeName" defaultValue="account" tab-position="top">
    <template #trigger>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </template>
    <TabsPane value="account">Make changes to your account here.</TabsPane>
    <TabsPane value="password">Change your password here.</TabsPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'demo-tabs-basic'
})
const activeName = ref('account')
</script>
