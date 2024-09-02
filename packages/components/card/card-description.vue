<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardDescription',
})
const ns = useNamespace('card')
</script>

<template>
  <div :class="ns.bs('description')">
    <slot />
  </div>
</template>
