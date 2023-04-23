<script setup lang="ts">
import { useData } from "vitepress";
import HomePage from "./HomePage.vue";
import LayoutHeader from "./Header.vue";
import LayoutFooter from "./Footer.vue";
import { provide } from "vue";
import { prefixSymbol } from "../types/index";

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData();

const prefix = "homepage";

provide(prefixSymbol, prefix);
</script>

<template>
  <div v-if="frontmatter.home">
    <LayoutHeader />
    <HomePage />
    <LayoutFooter />
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div>
</template>
