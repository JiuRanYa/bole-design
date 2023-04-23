<template>
  <div :class="`${prefix}`">
    <div :class="`${prefix}-header`">header</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import { inject } from "vue";
import { prefixSymbol } from "../types/index";

const prefix = inject(prefixSymbol);

defineComponent({
  name: "header",
});
</script>

<style lang="scss">
.homepage {
  height: 50px;
  &-header {
  }
}
</style>
