<script setup lang="ts">
import { defineComponent, shallowRef } from 'vue'
import { useRoute } from 'vitepress'
import { Message } from '@panda-ui/components'
import { toCapitalCase } from '@panda-ui/common'
import iconMap from '@/iconCategory.json'

const iconCategory = shallowRef<any>(iconMap)

defineComponent({
  name: 'CdnIcon',
})

const { data } = useRoute()
const type = data.frontmatter.title
async function copyCode(icon: any) {
  let code = `${toCapitalCase(icon.name).split('.')[0]}`
  if (type !== 'solid')
    code += toCapitalCase(type).slice(0, 1)

  Message({
    message: '复制成功',
    type: 'success',
  })

  await navigator.clipboard.writeText(code)
}
</script>

<template>
  <!-- <Icon v-bind="icons.loading"></Icon> -->
  <div class="icon-demo-container">
    <Tooltip v-for="icon in iconCategory[type]" :content="icon.name" trigger="hover">
      <div class="icon-demo" @click="copyCode(icon)">
        <div class="svg-wrapper" v-html="icon.show_svg" />
      </div>
    </Tooltip>
  </div>
</template>

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
