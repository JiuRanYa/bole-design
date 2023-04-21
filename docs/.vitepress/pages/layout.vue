<template>
  <div>123</div>

  <Content />
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useData } from "vitepress";
const { page } = useData();

defineComponent({
  name: "layout",
});
</script>
