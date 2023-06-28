<script setup lang="ts">
import { weekDay } from './const'
import { useNamespace } from '@bole-design/hooks'
import { computed, inject, ref } from 'vue'
import DatePickerCalendar from './date-picker-calendar.vue'
import { OriginDate } from './props'
import { Button } from '@bole-design/components'
import { DATE_PICKER_INJECTION_KEY } from '@bole-design/tokens/date-picker'

defineOptions({
  name: 'DatePickerPanel'
})

const wrapper = ref()
const ns = useNamespace('date-picker')

const className = computed(() => {
  return [ns.be('panel'), ns.bs('vars')]
})

const emit = defineEmits(['pick', 'confirm', 'cancel'])
const root = inject(DATE_PICKER_INJECTION_KEY)
function handlePickValue(date: OriginDate) {
  emit('pick', date)
}

function confirmValue() {
  if (root?.currentValue.value.length && root.isRange) {
    const value = [root.startMeta.getDate(), root.endMeta.getDate()]
    root?.updateModelValue(value)
  }
  emit('confirm')
}
function handleCancel() {
  emit('cancel')
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
        <Button @click="handleCancel">取消</Button>
        <Button style="--bl-button-color: var(--bl-color-primary-text)" @click="confirmValue">
          确认
        </Button>
      </div>
    </div>
  </div>
</template>
