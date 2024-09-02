<script setup lang="ts">
import { ref } from "vue";

const options = ref([
  {
    label: "选项1",
    value: 1,
  },
  {
    label: "选项2",
    value: 2,
  },
  {
    label: "选项3",
    value: 3,
  },
  {
    label: "选项4",
    value: 4,
  },
  {
    label: "选项5",
    value: 5,
  },
  {
    label: "选项6",
    value: 6,
  },
  {
    label: "选项7",
    value: 7,
  },
  {
    label: "选项8",
    value: 8,
  },
  {
    label: "选项9",
    value: 9,
  },
]);
</script>

<template>
  <Row :gap="[10, 10]">
    <Col :span="8">
      <Select :options="options" size="large"/>
    </Col>
    <Col :span="8">
      <Select :options="options" />
    </Col>
    <Col :span="8">
      <Select :options="options" size="small"/>
    </Col>
  </Row>
</template>

<style scoped>
.bl-select {
  width: 180px;
}
</style>
