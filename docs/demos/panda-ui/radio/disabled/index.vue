<template>
  <Radio v-model:value="value" label="enabled"/>
  <Radio v-model:value="value" label="disabled" disabled/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const value = ref()
</script>
