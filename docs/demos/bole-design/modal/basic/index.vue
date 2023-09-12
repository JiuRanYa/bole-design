<template>
  <Button type="primary" @click="active = !active">打开Modal</Button>

  <Modal v-model:active="active" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)

const currentAcitve = ref(true)
</script>
