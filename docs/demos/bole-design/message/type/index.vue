<template>
  <Button
    type="info"
    @click="
      $message.info({
        message: 'Info message'
      })
    "
  >
    info
  </Button>
  <Button
    type="success"
    @click="
      $message.success({
        message: 'success message'
      })
    "
  >
    success
  </Button>
  <Button
    type="error"
    @click="
      $message.error({
        message: 'error message'
      })
    "
  >
    info
  </Button>
  <Button
    type="warning"
    @click="
      $message.warning({
        message: 'warning message'
      })
    "
  >
    info
  </Button>
</template>

<script setup lang="ts">
import { Message } from '@bole-design/components'

function openMessage() {
  Message({
    message: 'Success message',
    type: 'success'
  })
}
</script>
