<template>
  <Row class="bl-header">
    <Col :span="8">
      <div class="bl-logo">
        <img src="/bl-logo.png" />
        <span class="bl-text"> Bole Design </span>
      </div>
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
import { useNav } from '../composables/index'

defineComponent({
  name: 'header'
})

const nav = useNav()

console.log(nav)
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
      text-decoration: none;
      padding: 20px;
      color: var(--bl-content-color-base);
    }
    .router-link-active {
      border-bottom: var(--bl-border-shape) var(--bl-color-primary-base);
    }
  }
}
</style>
