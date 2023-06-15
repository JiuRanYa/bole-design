<template>
  <DatePicker v-model:value="currentDate" />

  <br />
  <br />

  绑定值: {{ currentDate }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref()
</script>
