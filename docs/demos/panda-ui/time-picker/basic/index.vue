<template>
  <TimePicker style="max-width: 300px" v-model:value="currentValue" />

  <br/>

  currentValue: {{currentValue}}
</template>

<script setup lang="ts">
import { ref } from "vue";

const currentValue = ref("");
</script>
