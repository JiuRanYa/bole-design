<script setup lang="ts">
import { useRouter } from 'vitepress'
import { defineComponent } from 'vue'
import BLComponentDemo from './demo/bl-component-demo.vue'

defineComponent({
  name: 'home-page'
})
const router = useRouter()

function handleStartClick() {
  router.go(`/projects/bole-design/guide/design`)
}
</script>

<template>
  <div class="homepage">
    <div class="homepage-main">
      <div class="homepage-main-one">
        <div class="homepage-main-title">Bole Design</div>
        <div class="homepage-main-desc">
          高度可定制化，全量
          <span class="homepage-en"> Typescript </span>
          支持，面向开发者的工具集
        </div>
        <div class="homepage-main-btn">
          <Button size="middle" style="background: #18181b; color: white" @click="handleStartClick">
            开始使用
          </Button>
        </div>
      </div>

      <div class="homepage-main-two">
        <BLComponentDemo />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.homepage {
  width: 100vw;
  height: calc(100vh - var(--header-height));

  &-en {
    margin: 0 4px;
  }

  &-main {
    &-one {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 200px;
    }
    &-two {
      padding-top: 300px;
    }
    &-logo {
      img {
        width: 310px;
      }
    }
    &-title {
      margin: 1rem 0;
      font-size: 5rem;
      font-weight: 800;
      color: var(--text-reverse);
    }
    &-desc {
      font-size: 1.4rem;
      font-weight: 400;
    }
    &-btn {
      display: flex;
      margin-top: 50px;
      gap: 40px;
      .bl-button {
        width: 160px;
        height: 50px;
        border-radius: 2rem;
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
