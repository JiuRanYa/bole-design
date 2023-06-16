<template>
  <DatePicker type="range" v-model:value="date" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, watch } from 'vue'

const date = ref([dayjs().subtract(1, 'day'), dayjs()])

watch(
  () => date.value,
  value => {
    console.log(value)
  }
)
</script>
