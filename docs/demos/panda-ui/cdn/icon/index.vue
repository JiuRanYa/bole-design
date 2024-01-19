<template>
  <!-- <Icon v-bind="icons.loading"></Icon> -->
  <div class="icon-demo-container">
    <Tooltip :content="icon.name" trigger="hover" v-for="icon in iconCategory[type]">
      <div class="icon-demo" @click="copyCode(icon)">
        <div v-html="icon.show_svg" class="svg-wrapper"></div>
      </div>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useRoute } from 'vitepress'
import iconMap from '@/iconCategory.json'
import { Message } from '@panda-ui/components'
import { toCapitalCase } from '@panda-ui/common'

const iconCategory = shallowRef<any>(iconMap)

defineComponent({
  name: 'cdn-icon'
})

const { data } = useRoute()
const type = data.frontmatter.title
async function copyCode(icon: any) {
  let code = `${toCapitalCase(icon.name).split('.')[0]}`
  if (type !== 'solid') {
    code += toCapitalCase(type).slice(0, 1)
  }
  Message({
    message: '复制成功',
    type: 'success'
  })

  await navigator.clipboard.writeText(code)
}
</script>

<style lang="scss">
.icon-demo-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .icon-demo {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    cursor: pointer;
    .svg-wrapper {
      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    &:hover {
      background: var(--bl-color-primary-light-9);
    }
  }
}
</style>
