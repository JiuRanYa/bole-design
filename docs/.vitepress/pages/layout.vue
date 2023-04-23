<template>
  <Layout>
    <Wave></Wave>
    123
    <Content />
  </Layout>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { useData } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Wave from "../components/wave.vue";

const { page } = useData();

const { Layout } = DefaultTheme;

defineComponent({
  name: "layout",
});
</script>
