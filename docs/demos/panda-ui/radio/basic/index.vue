<template>
  <Radio v-model:value="value" label="radio"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref()
</script>
