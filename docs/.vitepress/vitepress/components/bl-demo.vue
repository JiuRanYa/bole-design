<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Code } from '@panda-ui/icons'
import { CollapseTransition } from '@panda-ui/components'
import SourceCode from './source-code.vue'

const props = defineProps<{
  demos: {
    type: object
  }
  source: string
  path: string
  desc?: string
}>()
defineComponent({
  name: 'BlDemo',
})
const showCode = ref(false)

const targetDemo = computed(() => {
  const keys = Object.keys(props.demos)

  const targetPath = keys.filter(key => key.includes(props.path))?.[0] as keyof typeof props.demos

  if (targetPath)
    return props.demos[targetPath]
  else
    return ''
})

const decodedDescription = computed(() => decodeURIComponent(props.desc!))

function expandCode() {
  showCode.value = !showCode.value
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-box-top">
      <p v-if="decodedDescription" v-html="decodedDescription" />

      <div class="demo-container" style="">
        <component :is="targetDemo" v-if="targetDemo" />
      </div>
    </div>

    <div class="demo-code-actions">
      <Tooltip content="查看源代码" :reverse="true" transfer class="demo-code-action">
        <Icon :icon="Code" @click="expandCode" />
      </Tooltip>
    </div>

    <CollapseTransition>
      <SourceCode v-if="showCode" :source="source" />
    </CollapseTransition>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  border: 1px solid var(--bl-c-divider);
  border-radius: 6px;
  margin-top: 12px;
  &-top {
    padding: 24px;
  }
  .demo-code-actions {
    width: 100%;
    height: 28px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: end;
    align-items: center;
    border-radius: 1px;
    border-top: 1px dotted var(--bl-c-divider);
    .code-expand-icon-show {
      width: 18px;
      height: 18px;
      opacity: 0.3;
      cursor: pointer;
    }
    .demo-code-action {
      cursor: pointer;
      transition: var(--vxp-transition-color);
      &:hover,
      &:focus {
        color: var(--bl-color-primary-opacity-2);
      }
    }
  }
}
</style>
