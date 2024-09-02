<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardBody',
})
const ns = useNamespace('card')
</script>

<template>
  <div :class="ns.bs('body')">
    <slot />
  </div>
</template>
