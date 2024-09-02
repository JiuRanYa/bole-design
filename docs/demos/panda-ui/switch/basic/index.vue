<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <Switch v-model:value="checked" />
  <br>
  <p style="margin-top: 10px">
    checked: {{ checked }}
  </p>
</template>
