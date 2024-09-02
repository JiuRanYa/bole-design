
<script setup lang="ts">
import { ref } from 'vue'

const currentDate = ref()
const currentDate2 = ref()
</script>

<template>

  <DatePicker v-model:value="currentDate" type="dateTime" style="margin-inline-end: 24px;"/>

  <DatePicker v-model:value="currentDate" type="dateTime" format="YY-MM-DD HH:mm" style="margin-inline-end: 24px;"/>

  <DatePicker v-model:value="currentDate2" type="dateTimeRange"/>

</template>
