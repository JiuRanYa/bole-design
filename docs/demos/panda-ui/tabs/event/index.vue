<script setup lang="ts">
import type { TabTriggerEmitState } from 'panda-ui'
import { ref } from 'vue'

defineOptions({
  name: 'DemoTabsBasic',
})
const activeName = ref('account')

function handleTabClick(state: TabTriggerEmitState) {
  console.log(state)
  window.alert(state.name)
}
</script>

<template>
  <Tabs v-model:value="activeName" tab-position="top" @tab-click="handleTabClick">
    <template #trigger>
      <TabsTrigger value="account">
        Account
      </TabsTrigger>
      <TabsTrigger value="password">
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
