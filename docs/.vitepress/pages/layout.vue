<template>
  <Layout>
    <Content />
  </Layout>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
const { page } = useData();

const { Layout } = DefaultTheme;

defineComponent({
  name: "layout",
});
</script>
