<template>
  <div :class="className" :style="styles">
    <img v-if="props.src" :alt="props.alt" :src="props.src" :class="ns.be('image')" />

    <template v-else-if="icon || $slots.icon">
      <slot name="icon">
        <Icon :class="ns.be('icon')" :icon="icon" :scale="props.iconScale"></Icon>
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ComponentSize, StyleType, useProps } from '@bole-design/common'
import { useNamespace } from '@bole-design/hooks'
import { avatarProps } from './props'
import { computed } from 'vue'

defineOptions({
  name: 'Avatar'
})

const _props = defineProps(avatarProps)
const props = useProps('avatar', _props, {
  src: '',
  size: 'default',
  iconScale: 1,
  alt: '',
  circle: false
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
      [ns.bm('circle')]: props.circle
    }
  ]
})
const styles = computed(() => {
  const style: StyleType = {}
  console.log(style, 123)

  if (typeof size.value === 'number') {
    style[ns.cv('size')] = `${size.value}px`
  }
  return style
})
</script>
