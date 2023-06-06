<script setup lang="ts">
import { weekDay } from './const'
import { useNamespace } from '@bole-design/hooks'
import { computed, ref } from 'vue'
import DatePickerCalendar from './date-picker-calendar.vue'

defineOptions({
  name: 'DatePickerPanel'
})

const wrapper = ref()
const ns = useNamespace('date-picker')

const className = computed(() => {
  return [ns.be('panel'), ns.bs('vars')]
})

defineExpose({
  wrapper
})
</script>

<template>
  <div :class="className" ref="wrapper">
    <div :class="ns.bm('list')">
      <div :class="ns.bem('panel', 'body')">
        <div :class="ns.be('header')">
          <div v-for="i in weekDay" :class="ns.bem('header', 'day')">{{ i }}</div>
        </div>
        <DatePickerCalendar />
      </div>
      <div :class="ns.be('action')"></div>
    </div>
  </div>
</template>
