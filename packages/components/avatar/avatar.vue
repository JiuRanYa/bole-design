<script setup lang="ts">
import type { ComponentSize, StyleType } from '@panda-ui/common'
import { useProps } from '@panda-ui/common'
import { useNamespace } from '@panda-ui/hooks'
import { computed } from 'vue'
import { Icon } from '../icon'
import { avatarProps } from './props'

defineOptions({
  name: 'Avatar',
})

const _props = defineProps(avatarProps)
const props = useProps('avatar', _props, {
  src: '',
  size: 'default',
  iconScale: 1,
  alt: '',
  circle: false,
})
const ns = useNamespace('avatar')

const size = computed(() => {
  return props.size
})
const className = computed(() => {
  return [
    ns.b(),
    {
      [ns.bs('vars')]: true,
      [ns.bm(size.value as ComponentSize)]:
        typeof size.value !== 'number' && size.value !== 'default',
      [ns.bm('circle')]: props.circle,
    },
  ]
})
const styles = computed(() => {
  const style: StyleType = {}

  if (typeof size.value === 'number')
    style[ns.cv('size')] = `${size.value}px`

  return style
})
</script>

<template>
  <div :class="className" :style="styles">
    <img v-if="props.src" :alt="props.alt" :src="props.src" :class="ns.be('image')">

    <template v-else-if="icon || $slots.icon">
      <slot name="icon">
        <Icon :class="ns.be('icon')" :icon="icon" :scale="props.iconScale" />
      </slot>
    </template>
  </div>
</template>
