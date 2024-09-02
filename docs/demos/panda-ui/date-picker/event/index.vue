<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(quarterOfYear)

const currentDate = ref()

function handleChange(value: Date | Date[]) {
  window.alert(value)
}
</script>

<template>
  <DatePicker v-model:value="currentDate" :on-change="handleChange" />

  <br>
</template>
