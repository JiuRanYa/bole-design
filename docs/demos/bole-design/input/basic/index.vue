<template>
  <Input v-model:value="value" />

  <br />
  <br />

  Input value : {{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
