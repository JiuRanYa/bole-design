<template>
  <div :class="ns.bs('description')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardDescription'
})
const ns = useNamespace('card')
</script>
