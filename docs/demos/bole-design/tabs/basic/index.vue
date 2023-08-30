<template>
  <Tabs v-model:value="activeName" defaultValue="account" tab-position="top">
    <template #trigger>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </template>
    <TabPane value="account">Make changes to your account here.</TabPane>
    <TabPane value="password">Change your password here.</TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Tabs'
})
const activeName = ref('account')
</script>
