<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref()
</script>

<template>
  <DatePicker v-model:value="currentDate" type="dateTime" format="YY-MM-DD HH" />
</template>
