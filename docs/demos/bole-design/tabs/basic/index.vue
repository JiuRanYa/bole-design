<template>
  <Tabs v-model="activeName" class="demo-tabs">
    <TabPane label="User" name="first">User</TabPane>
    <TabPane label="config" name="second">config</TabPane>
    <TabPane label="role" name="third">role</TabPane>
    <TabPane label="tast" name="fourth">task</TabPane>
  </Tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'Tabs'
})
const activeName = ref('first')
</script>
