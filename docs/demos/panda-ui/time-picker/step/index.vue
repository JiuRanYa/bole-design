<template>
  <TimePicker v-model:value="currentValue" style="max-width: 300px;" :minuteStep="30" :hourStep="6"/>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref("");
</script>
