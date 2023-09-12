<template>
  <label :class="className">
    <input :class="ns.be('input')" />

    <span :class="ns.be('inner')"></span>
  </label>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed } from 'vue'

defineOptions({
  name: 'Checkbox'
})

const ns = useNamespace('checkbox')

const className = computed(() => {
  return [ns.b()]
})

console.log(ns.be('input'))
</script>
