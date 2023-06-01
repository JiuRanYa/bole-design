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

const ns = useNamespace('calendar')
const props = useProps('calendar', _props, {
  value: ''
})
</script>

<template>
  <div :class="ns.b()">
    <MonthGrid />
  </div>
</template>
