<script setup lang="ts">
import DatePickerPanel from './date-picker-panel.vue'
import { useClickOutside, useNamespace, usePopper } from '@bole-design/hooks'
import { computed, ref, toRef } from 'vue'
import { Popper, PopperExposed } from '@bole-design/components'
import { placementWhiteList, useProps } from '@bole-design/common'
import { datePickerProps } from './props'
import { CalendarR } from '@bole-design/icons'

defineOptions({
  name: 'DatePicker'
})

const _props = defineProps(datePickerProps)
const props = useProps('date-picker', _props, {
  placement: {
    default: 'bottom-start',
    validator: value => placementWhiteList.includes(value)
  },
  transitionName: () => ns.ns('drop')
})
const ns = useNamespace('date-picker')

const referenceEl = computed(() => {
  return originTriggerRef.value
})
const panelRef = ref()
const popperRef = ref<PopperExposed>()
const originTriggerRef = ref<HTMLElement>()

const panelEle = computed(() => panelRef.value?.wrapper)
const popperEl = computed(() => popperRef.value?.wrapper)

const visible = ref(false)
const placement = toRef(props, 'placement')

usePopper({
  referenceEl,
  popperEl,
  placement
})

useClickOutside(originTriggerRef, handleClickOutside, { ignore: [panelEle] })

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
  <span ref="originTriggerRef" @click="showDatePanel">
    <ButtonGroup>
      <Button>
        <template #icon>
          <Icon :icon="CalendarR" :scale="1.4"></Icon>
        </template>
        手动
      </Button>
      <Button @click.stop>预设</Button>
    </ButtonGroup>
  </span>
  <Popper
    :class="popperClass"
    to="body"
    ref="popperRef"
    :visible="visible"
    :transition="props.transitionName"
    style="transform-origin: center top"
  >
    <DatePickerPanel ref="panelRef"></DatePickerPanel>
  </Popper>
</template>
