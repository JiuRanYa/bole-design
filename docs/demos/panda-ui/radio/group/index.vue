<template>
  <RadioGroup v-model:value="value">
    <Radio label="上海" />
    <Radio label="北京" />
    <Radio label="杭州" />
  </RadioGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";

const value = ref();
</script>
