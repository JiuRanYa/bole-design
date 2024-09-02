<script setup lang="ts">
import { computed, ref } from "vue";

const list = ref([
  {
    label: "apple",
    selected: false,
  },
  {
    label: "watermelon",
    selected: false,
  },
]);

const checked = computed(() => selectedList.value.length === list.value.length);

const selectedList = computed(() => list.value.filter((item) => item.selected));

const indeterminate = computed(
  () =>
    selectedList.value.length !== 0 &&
    selectedList.value.length !== list.value.length
);

function handleChange() {
  const check = !checked.value;
  list.value.forEach((item) => (item.selected = check));
}
</script>

<template>
  <div style="display: flex; gap: 12px">
    <Checkbox
      :indeterminate="indeterminate"
      :value="checked"
      label="全选"
      @change="handleChange"
    />
    <Checkbox
      v-model:value="item.selected"
      v-for="item in list"
      :label="item.label"
    />
  </div>
</template>
