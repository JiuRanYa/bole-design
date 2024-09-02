<script setup lang="ts">
import { useNamespace, useSetTimeout } from '@panda-ui/hooks'
import { computed, nextTick, onMounted, ref } from 'vue'
import { useProps, useZIndex } from '@panda-ui/common'
import { Icon } from '../icon'
import { Renderer } from '../renderer'
import { defaultProps, messageProps } from './props'
import { TypeComponentsMap } from './symbol'
import { getLastOffset, getOffsetOrSpace } from './instance'

defineOptions({
  name: 'Message',
})
const _props = defineProps(messageProps)

defineEmits(['destroy'])

const props = useProps('select', _props, defaultProps)

const ns = useNamespace('message')

const getIndex = useZIndex()
const zIndex = computed(() => getIndex())
const visible = ref(false)
const hasTitle = computed(() => {
  return props.title ?? false
})

const messageRef = ref()
const iconComponent = computed(() => props.icon || TypeComponentsMap[props.type] || '')

const iconClass = computed(() => {
  return {
    [ns.be('icon')]: true,
  }
})
const classList = computed(() => {
  return [
    ns.b(),
    ns.bs('vars'),
    ns.bm(props.type),
    {
      [ns.be('vertical')]: hasTitle.value,
    },
  ]
})

const messageStyle = computed(() => {
  return {
    bottom: `${offset.value}px`,
    zIndex: zIndex.value,
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
  }, props.duration + 400)
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
  bottom,
})
</script>

<template>
  <Transition :name="ns.bm('fade')" @before-leave="onClose" @after-leave="$emit('destroy')">
    <div v-show="visible" :id="id" ref="messageRef" :class="classList" :style="messageStyle">
      <div v-if="!props.renderer && hasTitle" :class="ns.be('header')">
        <Icon
          v-if="iconComponent"
          :style="[{ color: props.iconColor }, props.iconStyle]"
          :class="iconClass"
        >
          <component :is="iconComponent" />
        </Icon>
        <p>
          {{ props.title }}
        </p>
      </div>

      <template v-if="!hasTitle">
        <Icon
          v-if="iconComponent"
          :style="[{ color: props.iconColor }, props.iconStyle]"
          :class="iconClass"
        >
          <component :is="iconComponent" />
        </Icon>
      </template>

      <div v-if="!props.renderer" :class="ns.be('description')">
        {{ props.message }}
      </div>

      <Renderer
        v-if="typeof props.renderer === 'function'"
        :renderer="props.renderer"
        :data="props"
      />
    </div>
  </Transition>
</template>
