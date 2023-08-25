<template>
  <Input v-model:value="value" placeholder="Bole Design" />

  <br />
  <br />

  Input value : {{ value }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
