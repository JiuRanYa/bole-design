<template>
  <Masker
    v-model:active="currentActive"
    :transfer="props.transfer"
    :inner="props.inner"
    :class="className"
  >
    <div :class="ns.bm('wrap')">
      <div role="dialog" :aria-modal="currentActive" :class="ns.bm('dialog')" :style="dialogStyle">
        123
      </div>
    </div>
  </Masker>
</template>

<script setup lang="ts">
import { useProps } from '@bole-design/common'
import { Masker } from '../masker'
import { modalProps } from './props'
import { computed, ref, watch } from 'vue'
import { useNamespace } from '@bole-design/hooks'

defineOptions({
  name: 'Modal'
})

const _props = defineProps(modalProps)
const props = useProps('modal', _props, {
  active: false,
  transfer: 'body',
  inner: false
})

const ns = useNamespace('modal')
const currentActive = ref(props.active)

const dialogStyle = computed(() => {
  return {
    width: '550px'
  }
})

const className = computed(() => {
  return [ns.b(), ns.bs('vars')]
})

watch(
  () => props.active,
  value => {
    currentActive.value = value
  }
)
</script>
