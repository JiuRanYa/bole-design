<template>
  <DatePicker type="range" v-model:value="date" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const date = ref([dayjs().subtract(1, 'day'), dayjs()])
</script>
