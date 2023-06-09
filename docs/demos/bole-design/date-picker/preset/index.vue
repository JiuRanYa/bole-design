<template>
  <DatePicker :presets="presets" v-model:value="currentDate" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const currentDate = ref(dayjs().format('YYYY-MM-DD'))

const presets = {
  昨日: ['2023-6-8'],
  七天前: [dayjs().subtract(1, 'week')],
  一月前: [dayjs().subtract(1, 'month')]
}
</script>
