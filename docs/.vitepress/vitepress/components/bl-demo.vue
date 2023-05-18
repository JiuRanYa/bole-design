<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import SourceCode from './demo/source-code.vue'

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

const targetDemo = computed(() => {
  const keys = Object.keys(props.demos)

  const targetPath = keys.filter(key => key.includes(props.path))?.[0]

  if (targetPath) {
    return props.demos[targetPath].default
  }
})

const decodedDescription = computed(() => decodeURIComponent(props.desc!))
</script>

<template>
  <p v-html="decodedDescription"></p>

  <component v-if="targetDemo" :is="targetDemo"></component>

  <SourceCode :source="source" />
</template>
