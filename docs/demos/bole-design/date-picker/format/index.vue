<template>
  <Row :gap="[16, 24]">
    <Col>
      <DatePicker type="range" v-model:value="value" value-format="YYYY年MM月DD日" />
    </Col>
    <Col> 绑定的值：{{ value }} </Col>
  </Row>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'

const value = ref([dayjs().subtract(1, 'day'), dayjs()])
</script>
