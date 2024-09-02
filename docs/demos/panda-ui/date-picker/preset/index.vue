<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const currentDate = ref(dayjs())

const presets = {
  昨日: dayjs(),
  七天前: dayjs().subtract(1, 'week'),
  一月前: dayjs().subtract(1, 'month'),
}
</script>

<template>
  <DatePicker v-model:value="currentDate" :presets="presets" format="YY-MM-DD HH:mm" />
</template>
