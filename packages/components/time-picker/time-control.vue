<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'

import { useNamespace } from '@panda-ui/hooks'
import { doubleDigits } from '@panda-ui/common'
import type { Labels, TimeType } from './symbol'
import { handleKeyEnter } from './helper'

const props = defineProps({
  enabled: {
    type: Object as PropType<Record<TimeType, boolean>>,
    required: true,
  },
  activated: {
    type: Object as PropType<Record<TimeType, boolean>>,
    required: true,
  },
  timeValue: {
    type: Object as PropType<Record<TimeType, number>>,
    default: () => ({}),
  },
  unitType: {
    type: String as PropType<TimeType | ''>,
    default: '',
  },
  focused: {
    type: Boolean,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  separator: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  labels: {
    type: Object as PropType<Labels>,
  },
})

const emit = defineEmits(['unitFocus', 'input', 'nextUnit', 'prevUnit', 'minus', 'plus'])
const ns = useNamespace('time-picker')

const formattedHour = computed(() => {
  return formatValue('hour')
})
const formattedMinute = computed(() => {
  return formatValue('minute')
})
const formattedSecond = computed(() => {
  return formatValue('second')
})
function getUnitFocusClass(type: TimeType) {
  return props.visible && props.unitType === type ? ns.bem('unit', 'focused') : null
}

function formatValue(type: TimeType) {
  return props.activated[type] ? doubleDigits(props.timeValue[type]) : `--`
}

function handleTimeFocus(type: TimeType) {
  emit('unitFocus', type)
}

const isActivated = computed(() => {
  return (Object.keys(props.enabled) as TimeType[]).some(type => props.activated[type])
})

function handleInput(event: KeyboardEvent) {
  const type = handleKeyEnter(event)

  switch (type) {
    case 'next': {
      emit('nextUnit')
      break
    }
    case 'prev': {
      emit('prevUnit')
      break
    }
    case 'up': {
      emit('minus', event.ctrlKey)
      break
    }
    case 'down': {
      emit('plus', event.ctrlKey)
      break
    }
    default: {
      if (typeof type === 'number')
        emit('input', type)
    }
  }
}
const wrapper = ref()

defineExpose({
  isActivated,
  wrapper,
  focus: () => {
    wrapper.value?.focus()
  },
  blur: () => {
    wrapper.value?.blur()
  },
})
</script>

<template>
  <div
    ref="wrapper"
    role="none"
    tabindex="-1"
    :class="ns.be('input')"
    @keydown="handleInput"
  >
    <div v-if="!props.focused && !isActivated" :class="ns.be('placeholder')">
      {{ placeholder }}
    </div>
    <template v-else>
      <div
        v-if="enabled.hour"
        :class="[ns.be('unit'), getUnitFocusClass('hour')]"
        role="spinbutton"
        :aria-valuenow="props.timeValue.hour"
        :aria-valuetext="formattedHour"
        :aria-valuemin="0"
        :aria-valuemax="23"
        @click="handleTimeFocus('hour')"
      >
        {{ formattedHour }}
      </div>
      <div
        v-if="props.labels?.hour"
        :class="ns.be('label')"
        aria-hidden
        @click="handleTimeFocus('hour')"
      >
        {{ labels?.hour }}
      </div>
      <template v-if="enabled.minute">
        <div :class="ns.be('separator')">
          {{ props.separator }}
        </div>

        <div
          v-if="enabled.minute"
          :class="[ns.be('unit'), getUnitFocusClass('minute')]"
          role="spinbutton"
          :aria-valuenow="props.timeValue.minute"
          :aria-valuetext="formattedMinute"
          :aria-valuemin="0"
          :aria-valuemax="59"
          @click="handleTimeFocus('minute')"
        >
          {{ formattedMinute }}
        </div>

        <div
          v-if="props.labels?.minute"
          :class="ns.be('label')"
          aria-hidden
          @click="handleTimeFocus('minute')"
        >
          {{ labels?.minute }}
        </div>
      </template>

      <template v-if="enabled.second">
        <div :class="ns.be('separator')">
          {{ props.separator }}
        </div>

        <div
          v-if="enabled.second"
          :class="[ns.be('unit'), getUnitFocusClass('second')]"
          role="spinbutton"
          :aria-valuenow="props.timeValue.second"
          :aria-valuetext="formattedSecond"
          :aria-valuemin="0"
          :aria-valuemax="59"
          @click="handleTimeFocus('second')"
        >
          {{ formattedSecond }}
        </div>

        <div
          v-if="props.labels?.second"
          :class="ns.be('label')"
          aria-hidden
          @click="handleTimeFocus('second')"
        >
          {{ labels?.second }}
        </div>
      </template>
    </template>
  </div>
</template>
