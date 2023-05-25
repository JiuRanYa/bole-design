<script setup lang="ts">
import { defineComponent } from 'vue'

defineComponent({
  name: 'home-page'
})

function handleStartClick() {}
</script>

<template>
  <div class="homepage">
    <div class="homepage-main">
      <!-- <div class="homepage-main-logo"> -->
      <!--   <img src="/bl-logo.png" /> -->
      <!-- </div> -->
      <div class="homepage-main-title">Bole Design</div>
      <div class="homepage-main-desc">
        高度可定制化，全量
        <span class="homepage-en"> Typescript </span>
        支持，面向开发者的工具集
      </div>
      <div class="homepage-main-btn">
        <Button type="primary" size="middle" @click="handleStartClick">开始使用</Button>
      </div>
      <!-- <div class="homepage-main-bg"> -->
      <!--   <img src="/bl-bg.svg" /> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<style lang="scss">
.homepage {
  padding-top: var(--header-height);
  height: calc(100vh - var(--header-height));

  &-en {
    margin: 0 4px;
  }

  &-main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 100px;
    &-logo {
      img {
        width: 310px;
      }
    }
    &-title {
      margin: 1rem 0;
      font-size: 5rem;
      font-weight: 400;
    }
    &-desc {
      font-size: 1.4rem;
      font-weight: 300;
      background: linear-gradient(to bottom right, #ffffff 20%, rgba(255, 255, 255, 0.38));
      -webkit-text-fill-color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
    }
    &-btn {
      display: flex;
      margin-top: 50px;
      gap: 40px;
      .bl-button {
        border-radius: 2rem;
        width: 160px;
        height: 50px;
      }
    }
    &-bg {
      pointer-events: none;
      position: absolute;
      bottom: 10vw;
      img {
        width: 100vw;
      }
    }
  }

  &-wave {
    height: 220px;
  }
}
</style>
