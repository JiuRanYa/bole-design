<script setup lang="ts">
import { useRouter } from 'vitepress'
import { defineComponent } from 'vue'

defineComponent({
  name: 'pd-home-page'
})
const router = useRouter()

function handleStartClick() {
  router.go(`/projects/panda/guide/design`)
}
</script>

<template>
  <div class="homepage">
    <div class="homepage-main">
      <div class="homepage-main-one">
        <div class="homepage-main-title">Panda</div>
        <div class="homepage-main-desc">
          Boost your productivity with us,
          <span class="homepage-en"> empower </span>
          your workflow and achieve more.
        </div>
        <div class="homepage-main-btn">
          <Button type="primary" size="middle" @click="handleStartClick"> 开始使用 </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  height: calc(100vh - var(--header-height));
  &-en {
    margin: 0 4px;
    font-weight: 800;
  }

  &-main {
    &-bg {
      pointer-events: none;
      position: absolute;
      z-index: -10;
    }
    &-one {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 200px;
    }
    &-two {
      padding-top: 200px;
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
  }

  &-wave {
    height: 220px;
  }
}
</style>
