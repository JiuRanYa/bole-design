<script setup lang="ts">
import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

import { ref } from 'vue'

dayjs.extend(quarterOfYear)

const date = ref([dayjs().subtract(1, 'day'), dayjs()])
const presets = {
  前七天: [dayjs().subtract(1, 'week'), dayjs()],
  前一月: [dayjs().subtract(1, 'month'), dayjs()],
  该季度: [dayjs().startOf('quarter'), dayjs().endOf('quarter')],
}
</script>

<template>
  <DatePicker v-model:value="date" type="range" :presets="presets" />
</template>
