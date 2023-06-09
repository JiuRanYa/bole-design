<script setup lang="ts">
import { weekDay } from './const'
import { useNamespace } from '@bole-design/hooks'
import { computed, ref } from 'vue'
import DatePickerCalendar from './date-picker-calendar.vue'
import { OriginDate } from './props'

defineOptions({
  name: 'DatePickerPanel'
})

const wrapper = ref()
const ns = useNamespace('date-picker')

const className = computed(() => {
  return [ns.be('panel'), ns.bs('vars')]
})

const emit = defineEmits(['pick'])
function handlePickValue(date: OriginDate) {
  emit('pick', date)
}

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
        <DatePickerCalendar @pick="handlePickValue" />
      </div>
      <div :class="ns.be('action')">
        <Button>取消</Button>
        <Button>确认</Button>
      </div>
    </div>
  </div>
</template>
