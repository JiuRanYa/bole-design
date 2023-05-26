<template>
  <Row class="bl-header">
    <Col :span="4">
      <a class="bl-logo" href="/projects/bole-design/">
        <img src="/bl-logo.png" />
        <span class="bl-text">Bole Design</span>
      </a>
    </Col>
    <Col :span="6">
      <div class="bl-header-search">
        <input placeholder="在Bole Design中搜索" />
        <kbd>⌘ K</kbd>
      </div>
    </Col>
    <Col :span="12">
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
        <Switch class="theme-switch" @click="switchTheme"></Switch>
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
.theme-switch {
  border: 1px solid var(--bl-border-color-base);

  html.dark & {
    --bl-switch-bg-color: var(--bl-fill-color-background);
    --bl-switch-bg-color-open: var(--bl-fill-color-background);
    --bl-switch-signal-bg-color: #000;
    --bl-switch-icon-color: var(--bl-content-color-secondary);
  }
}
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
    backdrop-filter: blur(8px);
    &-search {
      display: flex;
      align-items: center;
      line-height: 1;
      padding-left: 30px;
      input {
        border: none;
        background-color: transparent;
        font-size: 14px;
        line-height: 1;
        height: 30px;
        display: inline-block;
        outline: none;
        &:focus {
          border: none;
        }
      }
      kbd {
        font-size: 10px;
        line-height: 1;
        background-color: var(--bl-fill-color-background);
        border: var(--bl-border-light-1);
        border-radius: var(--bl-radius-base);
        padding: 3px 5px 4px;
      }
    }
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
