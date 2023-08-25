<template>
  <div class="demo-wrapper">
    <div class="demo-navbar">
      <div
        v-for="navItem in navbar"
        :class="{ active: isActive(navItem.nav) }"
        class="demo-navbar-item"
        :style="computedStyle(navItem.nav)"
      >
        <div class="navbar-item-summary" @click="switchNav(navItem.nav)">
          {{ navItem.nav }}
        </div>
        <div class="navbar-item-desc">
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
function computedStyle(nav: string) {
  if (nav === 'Button') {
    return {
      '--closed': '82px',
      '--open': '188px'
    }
  }
  if (nav === 'DataInput') {
    return {
      '--closed': '104px',
      '--open': '248px'
    }
  }
  if (nav === 'DatePicker') {
    return {
      '--closed': '114px',
      '--open': '258px'
    }
  }
  if (nav === 'Tooltip') {
    return {
      '--closed': '83px',
      '--open': '250px'
    }
  }
}

const navbar = ref([
  {
    nav: 'Button',
    desc: 'User action'
  },
  {
    nav: 'DataInput',
    desc: 'Data Component'
  },
  {
    nav: 'DatePicker',
    desc: 'Fincy Date Picker'
  },
  {
    nav: 'Tooltip',
    desc: 'Fluent Prompt comp'
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
      transition: width var(--bl-transition-base);
      width: var(--closed);
      text-rendering: optimizelegibility;
      overflow-x: hidden;
      overflow-y: hidden;
      height: 34px;
      text-wrap: nowrap;

      .navbar-item-summary {
        background: white;
        border-radius: 12px;
        padding: 2px 10px;
        display: flex;
        flex-wrap: nowrap;
        text-size-adjust: 100%;
      }

      .navbar-item-desc {
        margin-left: 12px;
        margin-right: 6px;
        display: flex;
        flex-wrap: wrap;
        text-size-adjust: 100%;
        height: 100%;
        align-items: center;
        overflow: hidden;
      }
    }
    .active {
      width: var(--open) !important;
    }
  }

  .demo-code {
    border: 1px solid var(--bl-border-color-light-1);
    border-radius: 12px;
    height: 500px;
  }
}
</style>
