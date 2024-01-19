<template>
  <div :class="ns.bs('title')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

const ns = useNamespace('card')
defineOptions({
  name: 'CardTitle'
})
</script>
