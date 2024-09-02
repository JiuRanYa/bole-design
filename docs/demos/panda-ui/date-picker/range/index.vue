<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const value = ref([dayjs().subtract(1, 'day'), dayjs()])
</script>

<template>
  <DatePicker v-model:value="value" type="range" />
</template>
