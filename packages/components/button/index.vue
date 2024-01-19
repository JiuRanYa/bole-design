<template>
  <button type="button" :class="classNames" :disabled="props.disabled">
    <div v-if="icon || $slots.icon" :class="ns.be('icon')">
      <Icon :icon="icon" v-if="icon" />
      <slot v-else name="icon" />
    </div>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { buttonProps } from './props'
import { computed } from 'vue'
import { useNamespace } from '@panda-ui/hooks'
import { useProps } from '@panda-ui/common'
import { Icon } from '../icon'

defineOptions({
  name: 'Button'
})

const ns = useNamespace('button')

const _props = defineProps(buttonProps)
const props = useProps('button', _props, {
  type: 'outline',
  size: 'middle',
  icon: null,
  disabled: false
})

const classNames = computed(() => {
  return {
    [ns.b()]: true,
    [ns.bs('vars')]: true,
    [ns.bm('inherit')]: props.inherit,
    [ns.bm(props.type)]: props.type !== 'default',
    [ns.bm(props.size)]: props.size !== 'middle',
    [ns.bm('disabled')]: props.disabled
    // [ns.bm('icon-only')]: props.icon && !slots.default
  }
})
</script>
