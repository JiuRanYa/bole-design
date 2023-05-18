<template>
  <div>This is the demo</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: ''
})
const props = defineProps<{
  demos: object
  source: string
  path: string
  rawSource: string
  description?: string
}>()

console.log(props)
</script>
