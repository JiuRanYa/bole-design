<template>
  <Button
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
    error
  </Button>
  <Button
    type="warning"
    @click="
      $message.warning({
        message: 'warning message'
      })
    "
  >
    warning
  </Button>
</template>

<script setup lang="ts">
import { Message } from '@panda-ui/components'

function openMessage() {
  Message({
    message: 'Success message',
    type: 'success'
  })
}
</script>
