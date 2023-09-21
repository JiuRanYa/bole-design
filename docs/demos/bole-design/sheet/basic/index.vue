<template>
  <Button type="primary" @click="active = !active">打开Sheet</Button>
  <Sheet v-model:active="active" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
