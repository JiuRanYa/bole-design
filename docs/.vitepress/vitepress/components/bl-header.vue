<template>
  <Row class="bl-header">
    <Col :span="8">
      <a class="bl-logo" href="/projects/bole-design/">
        <img src="/bl-logo.png" />
        <span class="bl-text">Bole Design</span>
      </a>
    </Col>
    <Col :span="16">
      <div class="bl-nav">
        <a
          v-for="item in nav"
          :href="item.link"
          :class="{
            link: true,
            active: isActive(route.path, item.link)
          }"
          >{{ item.text }}</a
        >
        <span @click="switchTheme">switch-dark</span>
      </div>
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useProject } from '../composables/project'
import { useNav } from '../composables/index'
import { useRoute } from 'vitepress'

defineComponent({
  name: 'header'
})

const route = useRoute()
const nav = useNav()
const project = useProject()
const isClient = typeof window !== 'undefined'
const rootCls = isClient ? document.documentElement.classList : undefined

function isActive(routePath: string, link: string) {
  return routePath.includes(link)
}
function switchTheme() {
  if (rootCls.contains('dark')) {
    rootCls.remove('dark')
  } else {
    rootCls.add('dark')
  }
}
</script>

<style lang="scss">
.bl {
  &-header {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    height: var(--header-height);
    background-color: transparent;
    border-bottom: var(--bl-border-light-2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    //backdrop-filter: saturate(40%) blur(4px);
  }

  &-logo {
    margin-left: 100px;
    height: 55px;
    display: flex;
    align-items: center;
    text-decoration: none;
    img {
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
  }

  &-nav {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: end;
    padding-right: 100px;
    font-size: 14px;

    .link {
      padding: 0 16px;
      height: 100%;
      line-height: var(--header-height);
      color: var(--bl-content-color-base);
      margin-right: 12px;
      transition: var(--bl-transition-border);
      border-bottom: var(--bl-border-shape) transparent;
      &:hover {
        border-bottom: var(--bl-border-shape) var(--bl-color-primary-base);
      }
    }
    .active {
      border-bottom: var(--bl-border-shape) var(--bl-color-primary-base);
    }
  }
}
</style>
