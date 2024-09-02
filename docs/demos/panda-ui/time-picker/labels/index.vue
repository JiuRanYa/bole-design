<template>
  <TimePicker
    separator=""
    style="max-width: 300px"
    v-model:value="currentValue"
    :labels="{
      hour: '时',
      minute: '分',
      second: '秒',
    }"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref("");
</script>
