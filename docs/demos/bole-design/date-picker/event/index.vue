<template>
  <DatePicker v-model:value="currentDate" :onChange="handleChange" />

  <br />
  <br />

  <DatePicker v-model:value="currentDate2" :onChange="handleChange" type="range" />

  绑定值: {{ currentDate }}
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const currentDate = ref()
const currentDate2 = ref([dayjs().subtract(1, 'day'), dayjs()])

const handleChange = (value: any) => {
  console.log(value)
}
</script>
