<template>
  <Button @click="openMessage">Show message</Button>
  <Button @click="openTitleMessage">有标题的消息</Button>
</template>

<script setup lang="ts">
import { Message } from '@panda-ui/components'

function openMessage() {
  Message({
    message: '这是一条提示信息'
  })
}
function openTitleMessage() {
  Message({
    message: '这是一条提示信息',
    title: '标题'
  })
}
</script>
