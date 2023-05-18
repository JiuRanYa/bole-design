<template>
  <Row class="bl-header">
    <Col :span="8">
      <a class="bl-logo" href="/">
        <img src="/bl-logo.png" />
        <span class="bl-text">{{ project }}</span>
      </a>
    </Col>
    <Col :span="16">
      <div class="bl-nav">
        <a v-for="item in nav" :href="item.link">{{ item.text }}</a>
      </div>
    </Col>
  </Row>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useProject } from '../composables/project'
import { useNav } from '../composables/index'

defineComponent({
  name: 'header'
})

const nav = useNav()
const project = useProject()
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
    transition: var(--bl-transition-border), var(--bl-transition-transform);
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

    a {
      padding: 20px;
      color: var(--bl-content-color-base);
    }
    .router-link-active {
      border-bottom: var(--bl-border-shape) var(--bl-color-primary-base);
    }
  }
}
</style>
