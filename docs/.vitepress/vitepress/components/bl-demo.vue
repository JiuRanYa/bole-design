<script setup lang="ts">
import { RendererElement, computed, defineComponent, ref } from 'vue'
import SourceCode from './demo/source-code.vue'

defineComponent({
  name: 'bl-demo'
})
const props = defineProps<{
  demos: object
  source: string
  path: string
  desc?: string
}>()
const showCode = ref(true)

const targetDemo = computed(() => {
  const keys = Object.keys(props.demos)

  const targetPath = keys.filter(key => key.includes(props.path))?.[0]

  if (targetPath) {
    return props.demos[targetPath].default
  }
})

const decodedDescription = computed(() => decodeURIComponent(props.desc!))

function expandCode() {
  showCode.value = !showCode.value
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-box-top">
      <p v-html="decodedDescription"></p>

      <div class="demo-container" style="">
        <component v-if="targetDemo" :is="targetDemo"></component>
      </div>
    </div>

    <div class="demo-code-actions">
      <img
        alt="expand code"
        src="https://gw.alipayobjects.com/zos/antfincdn/4zAaozCvUH/unexpand.svg"
        class="code-expand-icon-show"
        @click="expandCode"
      />
    </div>

    <SourceCode :source="source" v-if="showCode" />
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  border: var(--bl-border-base);
  border-radius: 4px;
  &-top {
    padding: 24px;
  }
  .demo-code-actions {
    border-top: var(--bl-border-base);
    width: 100%;
    height: 40px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: end;
    align-items: center;
    border-radius: 1px;
    .code-expand-icon-show {
      width: 18px;
      height: 18px;
      opacity: 0.3;
      cursor: pointer;
    }
  }
}
</style>
