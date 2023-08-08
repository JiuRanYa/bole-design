<template>
  <Button type="primary" @click="openMessage">Open</Button>
</template>

<script setup lang="ts">
import { Message } from '@bole-design/components'

function openMessage() {
  Message({
    message: '这是一条提示信息'
  })
}
</script>
