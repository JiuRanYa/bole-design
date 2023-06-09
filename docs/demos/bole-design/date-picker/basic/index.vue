<template>
  <DatePicker v-model:value="currentDate" />

  <br />
  <br />

  绑定值: {{ currentDate }}
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const currentDate = ref(dayjs().format('YYYY-MM-DD'))
</script>
