<template>
  <div :class="ns.bs('header')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardHeader'
})

const ns = useNamespace('card')
</script>
