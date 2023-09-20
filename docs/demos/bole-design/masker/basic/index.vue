<template>
  <Button @click="active = !active">打开遮罩</Button>
  <Masker v-model:active="active"></Masker>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

defineComponent({
  name: ''
})

const active = ref(false)
</script>
