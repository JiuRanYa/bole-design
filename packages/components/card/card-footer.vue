<script setup lang="ts">
import { useNamespace } from '@panda-ui/hooks'

defineOptions({
  name: 'CardFooter',
})

const ns = useNamespace('card')
</script>

<template>
  <div :class="ns.bs('footer')">
    <slot />
  </div>
</template>
