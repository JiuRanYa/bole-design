<template>
  <TimePicker v-model:value="currentValue" style="max-width: 300px;" format="HH:mm"/>
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref("");
</script>
