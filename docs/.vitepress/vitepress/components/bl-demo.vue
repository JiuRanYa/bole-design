<script setup lang="ts">
import { computed, defineComponent } from 'vue'

defineComponent({
  name: 'bl-demo'
})
const props = defineProps<{
  demos: object
  source: string
  path: string
  rawSource: string
  desc?: string
}>()

const decodedDescription = computed(() => decodeURIComponent(props.desc!))
</script>

<template>
  <p v-html="decodedDescription"></p>
</template>
