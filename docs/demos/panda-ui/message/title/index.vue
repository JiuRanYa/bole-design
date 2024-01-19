<template>
  <Button @click="openMessage">有标题的消息</Button>
</template>

<script setup lang="ts">
import { Message } from '@panda-ui/components'

function openMessage() {
  Message({
    message: '这是一条提示信息',
    type: 'info',
    title: '标题',
    description: '这是消息的描述'
  })
}
</script>
