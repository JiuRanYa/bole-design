<script setup lang="ts">
import { defineComponent } from "vue";
import DefaultTheme from "vitepress/theme";
import Wave from "../components/wave.vue";

const { Layout } = DefaultTheme;
const prefix = "homepage";

defineComponent({
  name: "my-layout",
});
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <div :class="`${prefix}__wave`">
        <div :class="`${prefix}__wave-block`"></div>
        <!-- <Wave ref="wave"></Wave> -->
      </div>
    </template>
    <Content />
  </Layout>
</template>
