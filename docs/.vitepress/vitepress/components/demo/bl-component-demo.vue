<template>
  <div class="demo-wrapper">
    <div class="demo-navbar">
      <div v-for="navItem in navbar" class="demo-navbar-item">
        <div class="navbar-item-summary" @click="switchNav(navItem.nav)">
          {{ navItem.nav }}
        </div>
        <div v-if="isActive(navItem.nav)" class="navbar-item-desc">
          {{ navItem.desc }}
        </div>
      </div>
    </div>

    <div class="demo-code"></div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

defineComponent({
  name: 'bl-component-demo'
})

const currentNav = ref('Button')

function isActive(nav: string) {
  if (nav === currentNav.value) {
    return true
  }
  return false
}
function switchNav(nav: string) {
  currentNav.value = nav
}

const navbar = ref([
  {
    nav: 'Button',
    desc: 'A normal button'
  },
  {
    nav: 'Date Picker',
    desc: 'A normal button'
  },
  {
    nav: 'Date Picker1',
    desc: 'A normal button'
  },
  {
    nav: 'Date Picker2',
    desc: 'A normal button'
  }
])
</script>

<style lang="scss" scoped>
.demo-wrapper {
  width: 1200px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;

  .demo-navbar {
    display: flex;
    margin-bottom: 24px;

    .demo-navbar-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      background: hsl(240 4.8% 95.9%);
      border: 1px solid var(--bl-border-color-light-2);
      border-radius: 20px;
      padding: 4px 6px;
      will-change: width;
      cursor: pointer;
      transition: all var(--bl-transition-base);

      .navbar-item-summary {
        background: white;
        border-radius: 12px;
        padding: 2px 10px;
      }

      .navbar-item-desc {
        margin-left: 12px;
        margin-right: 6px;
      }
    }
  }

  .demo-code {
    border: 1px solid var(--bl-border-color-light-1);
    border-radius: 12px;
    height: 500px;
  }
}
</style>
