<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'DemoTabsBasic',
})
const activeName = ref('account')
</script>

<template>
  <Tabs v-model:value="activeName" tab-position="top">
    <template #trigger>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password" disabled>
        Password
      </TabsTrigger>
    </template>
    <TabsPane value="account">
      <div>
        Make changes to your account here.
      </div>
    </TabsPane>
    <TabsPane value="password">
      <div>
        Change your password here.
      </div>
    </TabsPane>
  </Tabs>
</template>
