<template>
  <div class="dev">
    <div class="dev-nav">
      <router-link
        v-for="route in router.options.routes"
        :key="route.path"
        class="router-link dev-nav-item"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
    <main class="dev-main">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineComponent({
  name: 'app'
})
</script>

<style lang="scss" scoped>
.dev {
  padding: 10px 50px 30px;
  background: #f8f9fa;
  height: 100vh;
  &-nav {
    height: 50px;
    display: flex;
    align-items: center;
    .router-link {
      text-decoration: none;
      color: var(--bl-color-primary-base);
    }

    &-item {
      padding: 10px;
    }
    .router-link-active {
      color: var(--bl-color-warning-base);
    }
  }

  &-main {
    background: white;
    height: calc(100% - 50px);
    padding: 20px;
    border: 1px solid var(--bl-border-color-light-1);
  }
}
</style>
