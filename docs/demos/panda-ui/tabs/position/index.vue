<template>
  <ButtonGroup style="margin-bottom: 48px">
    <Button @click="changePos('left')">left</Button>
    <Button @click="changePos('right')">right</Button>
    <Button @click="changePos('top')">top</Button>
    <Button @click="changePos('bottom')">bottom</Button>
  </ButtonGroup>
  <Tabs v-model:value="activeName" defaultValue="account" :tab-position="position">
    <template #trigger>
      <TabsTrigger value="account">Account</TabsTrigger>
      <TabsTrigger value="password">Password</TabsTrigger>
    </template>
    <TabsPane value="account">Make changes to your account here.</TabsPane>
    <TabsPane value="password">Change your password here.</TabsPane>
  </Tabs>
</template>

<script setup lang="ts">
import { Side } from '@panda-ui/common'
import { ref } from 'vue'

defineOptions({
  name: 'demo-tabs-position'
})
const position = ref('left')
const activeName = ref('account')

function changePos(pos: Side) {
  position.value = pos
}
</script>
