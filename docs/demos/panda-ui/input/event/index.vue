<template>
  <Input v-model:value="value" placeholder="Panda UI" @change="handleChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

function handleChange() {
  console.log(value.value)
}
</script>
