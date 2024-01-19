<template>
  <Button @click="openMessage">没有图标的消息</Button>
</template>

<script setup lang="ts">
import { Message } from '@panda-ui/components'

function openMessage() {
  Message({
    message: '这是一条提示信息',
    type: 'custom'
  })
}
</script>
