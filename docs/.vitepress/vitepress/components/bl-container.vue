<script setup lang="ts">
import { defineComponent } from 'vue'
import Wave from './wave/wave.vue'

defineComponent({
  name: 'home-page',
})
</script>

<template>
  <div class="homepage">
    <div class="homepage-main">
      <div class="homepage-title">Bole Design</div>
      <div class="homepage-desc">
        高度可定制化，全量
        <span class="homepage-en"> Typescript </span>
        支持，面向开发者的工具集
      </div>
      <div class="homepage-bg">
        <img src="/bl-bg.svg" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.homepage {
  padding-top: var(--header-height);

  &-en {
    margin: 0 4px;
  }

  &-main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
    .homepage-logo {
      img {
        width: 310px;
      }
    }
    .homepage-title {
      margin: 1rem 0;
      font-size: 3rem;
      font-weight: 400;
    }
    .homepage-desc {
      font-size: 1.4rem;
      font-weight: 300;
    }
    .homepage-bg {
      img {
        width: 100%;
      }
    }
  }

  &-wave {
    height: 220px;
  }
}
</style>
