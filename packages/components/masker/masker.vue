<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { emitEvent, useProps, useZIndex } from '@panda-ui/common'
import { Portal } from '../portal'
import { maskerProps } from './props'

defineOptions({
  name: 'Masker',
})

const _props = defineProps(maskerProps)
const emit = defineEmits(['update:active'])

const props = useProps('masker', _props, {
  active: false,
  closable: false,
  transitionName: '',
  reverse: false,
  maskTransition: () => ns.ns('fade'),
  maskClose: true,
})

const ns = useNamespace('masker')

const className = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    {
      [ns.bm('inherit')]: transferTo.value !== 'body' && props.inherit,
      [ns.bm('inner')]: props.inner,
      [ns.bm('reverse')]: props.reverse,
    },
  ]
})
const transferTo = computed(() => {
  return props.inner
    ? ''
    : typeof props.transfer === 'boolean'
      ? props.transfer
        ? 'body'
        : ''
      : props.transfer
})
const wrapShow = ref(props.active)
const currentActive = ref(props.active)

const getIndex = useZIndex()
const zIndex = computed(() => getIndex())

function handleMaskClose() {
  currentActive.value = false
  emit('update:active', false)
  emitEvent(props.onClose)
}
function handleMaskClick(event: MouseEvent) {
  if (!props.maskClose)
    return

  emitEvent(props.onMaskClick, event)
  handleMaskClose()
}
function afterOpen() {
  emitEvent(props.onShow)
}
function afterHide() {
  emitEvent(props.onHide)
  nextTick(() => {
    wrapShow.value = false
  })
}

watch(
  () => props.active,
  (value) => {
    currentActive.value = value

    if (value)
      wrapShow.value = value
  },
)
</script>

<template>
  <Portal v-if="wrapShow" :to="transferTo">
    <div
      :class="className" :style="{ zIndex }"
      v-bind="$attrs"
    >
      <Transition
        appear
        :name="props.maskTransition"
        @after-enter="afterOpen"
        @after-leave="afterHide"
      >
        <div v-show="currentActive" :class="ns.be('mask')" @click="handleMaskClick">
          <slot name="mask">
            <div :class="ns.be('mask-inner')" />
          </slot>
        </div>
      </Transition>

      <div
        tabindex="0"
        aria-hidden="true"
        data-sentinel="start"
        style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute"
      />

      <Transition v-if="props.transitionName" :name="props.transitionName" appear>
        <slot :show="currentActive" />
      </Transition>

      <slot v-else :show="currentActive" />

      <div
        tabindex="0"
        aria-hidden="true"
        data-sentinel="end"
        style="width: 0px; height: 0px; overflow: hidden; outline: none; position: absolute"
      />
    </div>
  </Portal>
</template>
