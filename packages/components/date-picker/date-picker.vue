<script setup lang="ts">
import DatePickerPanel from './date-picker-panel.vue'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { computed, defineComponent, ref, toRef } from 'vue'
import { Popper, PopperExposed } from '@bole-design/components'
import { useProps } from '@bole-design/common'
import { datePickerProps } from './props'

defineComponent({
  name: 'date-picker'
})

const _props = defineProps(datePickerProps)
const props = useProps('date-picker', _props, {
  placement: 'bottom-start'
})

const ns = useNamespace('date-picker')

const referenceEl = computed(() => {
  return originTrigger.value
})
const popper = ref<PopperExposed>()
const originTrigger = ref<HTMLElement>()
const popperEl = computed(() => popper.value?.wrapper)

const visible = ref(false)
const placement = toRef(props, 'placement')

usePopper({
  referenceEl,
  popperEl,
  placement
})

useClickOutside(originTrigger, handleClickOutside)

const popperClass = computed(() => {
  return [ns.be('popper')]
})

function showDatePanel() {
  visible.value = !visible.value
}

function handleClickOutside() {
  visible.value = false
}
</script>

<template>
  <span ref="originTrigger" @click="showDatePanel">Date picker trigger</span>
  <Popper :class="popperClass" to="body" ref="popper" :visible="visible">
    <DatePickerPanel></DatePickerPanel>
  </Popper>
</template>
