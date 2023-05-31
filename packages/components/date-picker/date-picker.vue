<script setup lang="ts">
import DatePickerPanel from './date-picker-panel.vue'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { computed, defineComponent, ref } from 'vue'
import { Popper, PopperExposed } from '@bole-design/components'

defineComponent({
  name: 'time-picker'
})

const ns = useNamespace('date-picker')

const referenceEl = computed(() => {
  return originTrigger.value
})
const originTrigger = ref<HTMLElement>()
const popper = ref<PopperExposed>()
const popperEl = computed(() => popper.value?.wrapper)
const visible = ref(false)

usePopper({
  referenceEl,
  popperEl,
  placement: ref('bottom')
})
function showDatePanel() {
  visible.value = !visible.value
}

function handleClickOutside() {
  visible.value = false
}
const popperClass = computed(() => {
  return [ns.be('popper')]
})

useClickOutside(originTrigger, handleClickOutside)
</script>

<template>
  <span ref="originTrigger" @click="showDatePanel">Date picker trigger</span>
  <Popper :class="popperClass" to="body" ref="popper" :visible="visible">
    <DatePickerPanel></DatePickerPanel>
  </Popper>
</template>
