<template>
  <DatePicker v-model:value="currentDate" :onChange="handleChange" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref()

const handleChange = (value: Date | Date[]) => {
  window.alert(value)
}
</script>
