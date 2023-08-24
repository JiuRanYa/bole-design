<template>
  <div class="bl-header-container">
    <div class="bl-header">
      <div class="bl-header-left">
        <a class="bl-logo" href="/projects/bole-design/">
          <span class="bl-title">Bole Design</span>
        </a>
        <div class="bl-nav">
          <a
            v-for="item in nav"
            :href="item.link"
            :class="{
              link: true,
              active: isActive(route.path, item.link)
            }"
          >
            {{ item.text }}
          </a>
        </div>
      </div>
      <div class="bl-header-right">
        <div class="bl-header-search">
          <input placeholder="在Bole Design中搜索" />
          <kbd>⌘ K</kbd>
        </div>
        <Switch
          :open-icon="Sun"
          :close-icon="Moon"
          :value="checked"
          class="theme-switch switchAppearance"
          @click="switchTheme"
        ></Switch>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { useNav } from '../composables/index'
import { useRoute } from 'vitepress'
import { Sun, Moon, Bolt } from '@bole-design/icons'

defineComponent({
  name: 'header'
})

const route = useRoute()
const nav = useNav()
const rootCls = document.documentElement.classList
const checked = ref(false)

function isActive(routePath: string, link: string) {
  const routeTop = routePath?.split('/').slice(1, 4).pop()
  const linkTop = link?.split('/').slice(1, 4).pop()

  return routeTop === linkTop
}
function setClass(dark: boolean): void {
  const css = document.createElement('style')
  css.type = 'text/css'
  css.appendChild(
    document.createTextNode(
      `:not(.switchAppearance):not(.switchAppearance *) {
				-webkit-transition: none !important;
				-moz-transition: none !important;
				-o-transition: none !important;
				-ms-transition: none !important;
				transition: none !important;
			}`
    )
  )
  document.head.appendChild(css)
  rootCls[dark ? 'add' : 'remove']('dark')
  // @ts-expect-error keep unused declaration, used to force the browser to redraw
  const _ = window.getComputedStyle(css).opacity
  document.head.removeChild(css)
  checked.value = !dark
}
function switchTheme(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const isDark = rootCls.contains('dark')

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    if (rootCls.contains('dark')) {
      setClass(false)
    } else {
      setClass(true)
    }
  })

  transition.ready.then(() => {
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
    // const clipPath = [
    //   'polygon(0% 0%, 20% 0%, 20% 100%, 20% 100%, 20% 0%, 40% 0%, 40% 100%, 40% 100%, 40% 0%, 60% 0%, 60% 100%, 60% 100%, 60% 0%, 80% 0%, 80% 100%, 80% 100%, 80% 0%, 100% 0%, 100% 100%, 0% 100%)',
    //   'polygon(20% 0%, 20% 0%, 20% 100%, 40% 100%, 40% 0%, 40% 0%, 40% 100%, 60% 100%, 60% 0%, 60% 0%, 60% 100%, 80% 100%, 80% 0%, 80% 0%, 80% 100%, 100% 100%, 100% 0%, 100% 0%, 100% 100%, 20% 100%)'
    // ]
    // const clipPath = [`inset(5% 100% 5% -50%)`, 'inset(45% 0% 45% 50%)', 'inset(0)']
    document.documentElement.animate(
      {
        clipPath: !isDark ? clipPath : [...clipPath].reverse()
      },
      {
        duration: 500,
        easing: 'ease-in',
        pseudoElement: !isDark ? '::view-transition-new(root)' : '::view-transition-old(root)'
      }
    )
  })
}
</script>

<style lang="scss">
.switchAppearance.switchAppearanceTransition {
  width: 22px;
}
.dark .switchAppearance:not(.switchAppearanceTransition) :deep(.check) {
  /*rtl:ignore*/
  transform: translateX(18px);
}
::view-transition-new(root) {
  z-index: 1;
}
::view-transition-old(root) {
  z-index: 9999;
}
::view-transition-new(root),
::view-transition-old(root) {
  animation: none;
  mix-blend-mode: normal;
}
.dark::view-transition-old(root) {
  z-index: 1;
}
.dark::view-transition-new(root) {
  z-index: 9999;
}
.bl {
  &-header-container {
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 100;
    background-color: var(--bg-color);
    border-bottom: var(--bl-border-light-2);
  }
  &-header {
    padding: 0 2rem;
    height: var(--header-height);
    display: flex;
    margin-left: auto;
    margin-right: auto;
    &-left {
      display: flex;
      align-items: center;
    }
    &-right {
      display: flex;
      align-items: center;
      justify-content: end;
      flex: 1 1 0%;
    }
    &-search {
      display: flex;
      align-items: center;
      line-height: 1;
      padding-left: 30px;
      margin-right: 60px;
      input {
        border: none;
        background-color: transparent;
        font-size: 14px;
        line-height: 1;
        height: 30px;
        display: inline-block;
        outline: none;
        &:focus {
          border: none;
        }
      }
      kbd {
        font-size: 10px;
        line-height: 1;
        background-color: var(--bl-fill-color-background);
        border: var(--bl-border-light-1);
        border-radius: var(--bl-radius-base);
        padding: 3px 5px 4px;
      }
    }
  }

  &-logo {
    display: flex;
    align-items: center;
  }
  &-title {
    color: var(--text-active);
    font-family: 'Caprasimo Regular';
    margin-right: 24px;
  }

  &-nav {
    height: var(--header-height);
    display: flex;
    align-items: center;
    justify-content: end;
    flex: 1 1 0%;
    font-size: 14px;

    .theme-switch {
      border: 1px solid var(--bl-border-color-base);
      --bl-switch-bg-color: var(--bl-fill-color-background);
      --bl-switch-bg-color-open: var(--bl-fill-color-secondary);

      html.dark & {
        --bl-switch-bg-color: var(--bl-fill-color-background);
        --bl-switch-bg-color-open: var(--bl-fill-color-background);
        --bl-switch-signal-bg-color: #000;
        --bl-switch-icon-color: var(--bl-content-color-secondary);
      }
    }

    .link {
      padding: 0 16px;
      height: 100%;
      font-weight: 500;
      line-height: var(--header-height);
      color: var(--text-base);
      margin-inline-end: 12px;
      transition: color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
      &:hover {
        color: var(--text-active);
      }
    }
    .active {
      color: var(--text-active);
    }
  }
}

@media (min-width: 1400px) {
  .bl-header {
    max-width: 1400px;
  }
}
</style>
