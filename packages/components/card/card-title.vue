<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardTitle',
})
const ns = useNamespace('card')
</script>

<template>
  <div :class="ns.bs('title')">
    <slot />
  </div>
</template>
