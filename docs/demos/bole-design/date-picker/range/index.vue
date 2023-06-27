<template>
  {{ value }}
  <DatePicker type="range" v-model:value="value" value-format="YYYY年MM月DD日" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const value = ref([dayjs().subtract(1, 'day'), '2023年12月23日'])
</script>
