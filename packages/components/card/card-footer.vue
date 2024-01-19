<template>
  <div :class="ns.bs('footer')">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardFooter'
})

const ns = useNamespace('card')
</script>
