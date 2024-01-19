<template>
  <DatePicker v-model:value="currentDate" :onChange="handleChange" />

  <br />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(quarterOfYear)

const currentDate = ref()

const handleChange = (value: Date | Date[]) => {
  window.alert(value)
}
</script>
