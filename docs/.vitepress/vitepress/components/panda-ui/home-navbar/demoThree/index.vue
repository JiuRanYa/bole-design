<script setup lang="ts">
import { defineComponent, ref } from 'vue'

const currentDate = ref()

defineComponent({
  name: '',
})
</script>

<template>
  <div>
    <DatePicker v-model:value="currentDate" />
  </div>
</template>
