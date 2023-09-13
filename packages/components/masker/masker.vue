<template>
  <Portal v-if="props.active" :to="transferTo">
    <div v-bind="$attrs" ref="wrapper" :class="className">
      <Transition>
        <div v-show="currentActive" :class="ns.be('mask')" @click="handleMaskClick">
          <slot name="mask">
            <div :class="ns.be('mask-inner')"></div>
          </slot>
        </div>
      </Transition>

      <Transition v-if="props.transitionName" :name="props.transitionName">
        <slot :show="currentActive"></slot>
      </Transition>
      <slot v-else :show="currentActive"></slot>
    </div>
  </Portal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Portal } from '../portal'
import { maskerProps } from './props'
import { useNamespace } from '@bole-design/hooks'
import { emitEvent, useProps } from '@bole-design/common'

defineOptions({
  name: 'Masker'
})

const _props = defineProps(maskerProps)
const props = useProps('masker', _props, {
  closable: false
})

const ns = useNamespace('masker')

const className = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    {
      [ns.bm('inherit')]: transferTo.value !== 'body' && props.inherit,
      [ns.bm('inner')]: props.inner
    }
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
const currentActive = computed(() => props.active)

function handleMaskClick(event: MouseEvent) {
  emitEvent(props.onMaskClick, event)
}
</script>
