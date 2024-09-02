<script setup lang="ts">
import type { Side } from '@panda-ui/common'
import { ref } from 'vue'

defineOptions({
  name: 'DemoTabsPosition',
})
const position = ref('top')
const activeName = ref('account')

function changePos(pos: Side) {
  position.value = pos
}
</script>

<template>
  <ButtonGroup style="margin-bottom: 48px"> <Button @click="changePos('left')">
      left
    </Button>
    <Button @click="changePos('right')">
      right
    </Button>
    <Button @click="changePos('top')">
      top
    </Button>
    <Button @click="changePos('bottom')">
      bottom
    </Button>
  </ButtonGroup>
  <Tabs v-model:value="activeName" default-value="account" :tab-position="position">
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
      Change your password here.
    </TabsPane>
  </Tabs>
</template>
