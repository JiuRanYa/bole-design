<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { defineComponent } from 'vue'
import { calendarProps } from './props'
import { useProps } from '@bole-design/common'
import MonthGrid from './month-grid.vue'

defineComponent({
  name: 'date-picker-calendar'
})
const _props = defineProps(calendarProps)

const ns = useNamespace('date-picker')
const props = useProps('calendar', _props, {
  value: ''
})
const renderDate = ['2023-06', '2023-07', '2023-08']
</script>

<template>
  <div :class="ns.be('calendar')">
    <MonthGrid v-for="date in renderDate" :value="date" />
  </div>
</template>
