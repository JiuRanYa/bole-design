<template>
  <button ref="reference" class="bl-button bl-button-vars bl-button--primary" @click="showPopper">
    点击展示
  </button>

  <div v-if="visible" ref="popper" class="bl-dropdown-list">Popper Content</div>
</template>

<script setup lang="ts">
import { usePopper } from "@panda-ui/hooks";
import { ref, computed } from "vue";

const popper = ref();
const visible = ref(false)

const { reference, updatePopper } = usePopper({
  popper: computed(() => popper.value),
  placement: ref("bottom"),
});

function showPopper () {
  visible.value = !visible.value
  updatePopper()
}
</script>

<style scoped lang="scss"></style>
