<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { useProps } from '@panda-ui/common'
import { Icon } from '../icon'
import { buttonProps } from './props'

defineOptions({
  name: 'Button',
})

const _props = defineProps(buttonProps)

const ns = useNamespace('button')

const props = useProps('button', _props, {
  type: 'outline',
  size: 'middle',
  icon: null,
  disabled: false,
})

const btnRef = ref()
const classNames = computed(() => {
  return {
    [ns.b()]: true,
    [ns.bs('vars')]: true,
    [ns.bm('inherit')]: props.inherit,
    [ns.bm(props.type)]: props.type !== 'default',
    [ns.bm(props.size)]: props.size !== 'middle',
    [ns.bm('disabled')]: props.disabled,
    // [ns.bm('icon-only')]: props.icon && !slots.default
  }
})

defineExpose({
  el: btnRef,
})
</script>

<template>
  <button ref="btnRef" type="button" :class="classNames" :disabled="props.disabled">
    <div v-if="icon || $slots.icon" :class="ns.be('icon')">
      <Icon v-if="icon" :icon="icon" />
      <slot v-else name="icon" />
    </div>
    <slot />
  </button>
</template>
