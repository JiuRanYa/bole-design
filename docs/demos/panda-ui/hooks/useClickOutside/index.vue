<script lang="ts" setup>
import { useClickOutside } from "@panda-ui/hooks";
import { ref } from "vue";

const target = ref(null);
const state = ref("未点击区域外");

function handleClickoutside() {
  state.value = '已点击区域外'
}

useClickOutside(handleClickoutside, {}, target);
</script>

<template>
  <div ref="target" class="container">
    {{state}}
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  justify-content: center;
  padding: 50px;
  border: var(--bl-border-base);
  border-radius: 12px;
}
</style>
