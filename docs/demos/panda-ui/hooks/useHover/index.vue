<template>
  <button ref="wrapper" class="bl-button bl-button-vars bl-button--primary">
    {{ isHover ? "Hovering" : "Not Hover" }}
  </button>
</template>

<script setup lang="ts">
import { useHover } from "@panda-ui/hooks";
import { ref } from "vue";

const wrapper = ref();
const { isHover } = useHover(wrapper);
</script>

<style scoped lang="scss"></style>
