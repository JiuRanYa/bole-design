<script setup lang="ts">
import { Message } from '@panda-ui/components'
import { h } from 'vue'

function openMessage() {
  Message({
    message: '这是一条提示信息',
    duration: 1000,
    type: 'custom',
    renderer: () => {
      return h('span', [
        '这是自定义的',
        h(
          'span',
          {
            style: {
              color: '#32c5ff',
              fontStyle: 'italic',
            },
          },
          '消息',
        ),
      ])
    },
  })
}
</script>

<template>
  <Button @click="openMessage">
    Show message
  </Button>
</template>
