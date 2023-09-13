<template>
  <Portal v-if="props.active" :to="transferTo">
    <div v-bind="$attrs" ref="wrapper" :class="className">
      <Transition>
        <div v-show="currentActive" :class="ns.be('mask')" @click="">
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
import { computed, defineComponent } from 'vue'
import { Portal } from '../portal'
import { maskerProps } from './props'
import { useNamespace } from '@bole-design/hooks'

defineComponent({
  name: 'bl-masker'
})

const props = defineProps(maskerProps)

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
console.log(transferTo.value)
const currentActive = computed(() => props.active)
</script>
