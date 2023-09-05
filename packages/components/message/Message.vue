<template>
  <Transition :name="ns.bm('fade')" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div ref="messageRef" v-show="visible" :class="classList" :style="messageStyle" :id="id">
      <Icon :style="[{ color: props.iconColor }, props.iconStyle]" :class="iconClass">
        <component :is="iconComponent" />
      </Icon>
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
import { CSSProperties, computed, nextTick, onMounted, ref } from 'vue'
import { defaultProps, messageProps } from './props'
import { useProps } from '@bole-design/common'
import { TypeComponentsMap } from './symbol'
import { getLastOffset, getOffsetOrSpace } from './instance'

defineOptions({
  name: 'Message'
})
const _props = defineProps(messageProps)
const props = useProps('select', _props, defaultProps)

const ns = useNamespace('message')

// TODO: using useIndex instead
const zIndex = ref(2000)
const visible = ref(false)

const messageRef = ref()
const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || '')

const iconClass = computed(() => {
  return {
    [ns.be('icon')]: true
  }
})
const classList = computed(() => {
  return [ns.b(), ns.bs('vars'), ns.bm(props.type)]
})

const messageStyle = computed<CSSProperties>(() => {
  return {
    bottom: `${offset.value}px`,
    zIndex: zIndex.value
  }
})
const { timer } = useSetTimeout()

const height = ref(0)
const lastOffset = computed(() => getLastOffset(props.id))
const offset = computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value)
const bottom = computed((): number => height.value + offset.value)

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
  nextTick(() => {
    height.value = messageRef.value!.getBoundingClientRect().height
  })
})

defineExpose({
  visible,
  bottom
})
</script>
