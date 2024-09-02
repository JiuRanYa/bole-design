<script setup lang="ts">
import { computed } from 'vue'
import { triggerWhiteList, useProps } from '@panda-ui/common'
import { ChevronDown, Xmark } from '@panda-ui/icons'
import { useClickOutside, useNamespace } from '@panda-ui/hooks'
import { Icon } from '../icon'
import { Popper } from '../popper'
import { cascaderProps } from './props'
import { useCascader } from './useCascader'
import CascaderPanel from './cascader-panel.vue'

defineOptions({
  name: 'Cascader',
})

const _props = defineProps(cascaderProps)
const emits = defineEmits(['select', 'update:visible', 'update:value'])
const ns = useNamespace('cascader')
const classNames = computed(() => {
  return [ns.b(), ns.bs('vars')]
})

const props = useProps('cascader', _props, {
  placement: 'bottom-start',
  placeholder: '请选择',
  transitionName: () => ns.ns('drop'),
  separator: '/',
  value: null,
  to: false,
  briefLabel: false,
  cascadedCount: null,
  options: [],
  popperAlive: null,
  visible: false,
  trigger: {
    default: 'click',
    validator: value => triggerWhiteList.includes(value),
  },
  disabled: false,
  readonly: false,
})

const {
  popper,
  popperEl,
  hasValue,
  openedIds,
  transferTo,
  reference,
  currentValues,
  currentLabels,
  usingHover,
  optionsList,
  currentVisible,
  toggleVisible,
  handlePanelOpen,
  showClearIcon,
  handleOptionSelect,
  handleClearEmitValue,
} = useCascader(props, {
  emit: emits,
})

function handleClickOutside() {
  if (currentVisible.value)
    toggleVisible(false)
}

useClickOutside(handleClickOutside, { ignore: [popperEl] }, reference)
</script>

<template>
  <div :class="classNames">
    <div
      ref="reference"
      :class="{
        [ns.bm('selector')]: true,
        [ns.bem('selector', 'focused')]: currentVisible,
        [ns.bm('disabled')]: props.disabled,
      }"
      @click="toggleVisible()"
    >
      <!-- <input v-if="filterble" :class="ns.be('input')" placeholder="placeholder" disabled /> -->
      <div :class="[ns.be('control')]">
        {{ currentLabels[0] }}
        <span
          v-if="props.placeholder && !hasValue"
          :class="ns.be('placeholder')"
          placeholder="placeholder"
        >
          {{ props.placeholder }}
        </span>
      </div>
      <div :class="[ns.be('icon'), ns.be('suffix')]">
        <Icon
          :icon="ChevronDown" :class="ns.be('arrow')"
          :style="{ opacity: showClearIcon ? '0%' : '' }"
        />
        <Transition name="fade-in">
          <Icon
            v-if="showClearIcon"
            :icon="Xmark"
            :scale="1.1"
            :class="ns.be('clear')"
            @click.stop="handleClearEmitValue"
          />
        </Transition>
      </div>
    </div>

    <Popper
      ref="popper"
      :to="transferTo"
      :alive="props.popperAlive ?? !transferTo"
      :visible="currentVisible"
      :transition="props.transitionName"
      :class="[ns.be('popper'), ns.bs('vars'), ns.bm('popper')]"
      @click.stop
    >
      <div :class="ns.be('panels')">
        <CascaderPanel
          v-for="(options, index) in optionsList"
          :key="options"
          :options="options"
          :values="currentValues"
          :opened-id="openedIds[index]"
          @select="handleOptionSelect($event, index)"
          @hover="usingHover && handlePanelOpen($event, index)"
        />
      </div>
    </Popper>
  </div>
</template>
