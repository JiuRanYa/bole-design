<template>
  <Transition :name="ns.bm('fade')" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :class="classList" :style="style">
      <slot>
        <p>
          {{ props.message }}
        </p>
      </slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useNamespace, useSetTimeout } from '@bole-design/hooks'
import { computed, onMounted, ref } from 'vue'
import { defaultProps, messageProps } from './props'
import { useProps } from '@bole-design/common'

defineOptions({
  name: 'Message'
})
const _props = defineProps(messageProps)
const props = useProps('select', _props, defaultProps)

const ns = useNamespace('message')

// TODO: using useIndex instead
const zIndex = ref(2000)
const visible = ref(false)

const classList = computed(() => {
  return [ns.b()]
})

const style = computed(() => {
  return {
    zIndex: zIndex.value
  }
})
const { timer } = useSetTimeout()

function close() {
  visible.value = false
}
function startTimer() {
  timer.close = setTimeout(() => {
    close()
  }, props.duration)
}
onMounted(() => {
  startTimer()
  visible.value = true
})

defineExpose({
  visible
})
console.log(ns.bm('fade'))
</script>
