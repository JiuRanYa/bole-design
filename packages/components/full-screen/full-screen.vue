<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFullScreen, useNamespace } from '@panda-ui/hooks'
import { useZIndex } from '@panda-ui/common'
import { Portal } from '../portal'
import type { FullScreenExposed, FullScreenType } from './types'

defineOptions({
  name: 'FullScreen',
})

const getIndex = useZIndex()
const ns = useNamespace('full-screen')
const className = computed(() => [ns.b(), ns.bs('vars'), { [ns.bm('full')]: isEntered.value }])
const isEntered = ref(false)
const transferTo = computed(() => (isEntered.value ? 'body' : ''))

const style = computed(() => {
  return {
    [ns.cv('z-index')]: getIndex(),
  }
})

const currentType = ref<FullScreenType>()
const {
  enter: browserEnter,
  exit: browserExit,
  target: rootRef,
  full: browserFull,
} = useFullScreen()

function enter(type: FullScreenType = 'window') {
  if (isEntered.value)
    exit()

  isEntered.value = true

  if (type !== 'window')
    browserEnter()

  currentType.value = type
}

function exit() {
  isEntered.value = false

  browserExit()
}

function toggle(type: FullScreenType = 'window') {
  if (isEntered.value) {
    if (currentType.value !== type)
      enter(type)
    else
      exit()
  }
  else {
    enter(type)
  }
}

defineExpose<FullScreenExposed>({
  toggle,
})

watch(browserFull, (value) => {
  if (!value)
    isEntered.value = false
})
</script>

<template>
  <Portal :to="transferTo">
    <div ref="rootRef" :class="className" v-bind="$attrs" :style="style">
      <slot :enter="enter" :exit="exit" :toggle="toggle" :full="isEntered" />
    </div>
  </Portal>
</template>
