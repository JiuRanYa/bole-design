<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import timezone from 'dayjs/plugin/timezone' // dependent on utc plugin
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

const _timezone = ref('Asia/Shanghai')
const currentDate = ref()

function handleChange(newDate: any) {
  const _newDate = dayjs(newDate).tz(_timezone.value)
  currentDate.value = _newDate
}
</script>

<template>
  <DatePicker v-model:value="currentDate" @change="handleChange" />

  <br>

  当前日期组件时区: {{ _timezone }}

  <br>

  绑定值: {{ currentDate }}
</template>
