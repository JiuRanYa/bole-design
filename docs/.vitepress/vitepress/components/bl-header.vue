<template>
  <header :class="`${prefix}-header`">
    <span :class="`${prefix}-logo`"> Bole UI </span>
  </header>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";

const prefix = "bl";

defineComponent({
  name: "header",
});
</script>
