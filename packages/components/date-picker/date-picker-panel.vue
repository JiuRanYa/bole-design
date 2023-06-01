<script setup lang="ts">
import { weekDay } from './const'
import { useNamespace } from '@bole-design/hooks'
import { computed, defineComponent, ref } from 'vue'
import DatePickerCalendar from './date-picker-calendar.vue'

defineComponent({
  name: 'date-picker-panel'
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
        <div :class="ns.be('calendar')">
          <DatePickerCalendar />
        </div>
      </div>
      <div :class="ns.be('action')"></div>
    </div>
  </div>
</template>
