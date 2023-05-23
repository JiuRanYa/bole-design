<template>
  <Row class="bl-header">
    <Col :span="8">
      <a class="bl-logo" href="/projects/bole-design/">
        <img src="/bl-logo.png" />
        <span class="bl-text">{{ project }}</span>
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

function isActive(routePath: string, link: string) {
  return routePath.includes(link)
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
    background-color: var(--bg-color);
    border-bottom: var(--bl-border-light-2);
    transition: all var(--bl-transition-base);
    display: flex;
    justify-content: space-between;
    align-items: center;
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
    transition: var(--bl-transition-border), var(--bl-transition-transform);
    font-size: 14px;

    .link {
      padding: 0 16px;
      height: 100%;
      line-height: var(--header-height);
      color: var(--bl-content-color-base);
      &:hover {
        color: var(--bl-color-primary-base);
      }
    }
    .active {
      border-bottom: var(--bl-border-shape) var(--bl-color-primary-base);
    }
  }
}
</style>
