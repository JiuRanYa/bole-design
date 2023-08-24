<script setup lang="ts">
import tag from '@/.vitepress/plugins/tag'
import MarkdownIt from 'markdown-it'
import { ref } from 'vue'
import { useToc } from '../../composables/toc'

const container = ref()
const localMd = MarkdownIt().use(tag)

const headers = useToc()
console.log(headers.value)
</script>

<template>
  <aside ref="container" class="toc-wrapper">
    <h3 class="toc-content__heading">On This Page</h3>
    <ul class="toc-items">
      <li v-for="{ link, title, children } in headers" :key="link" class="toc-item">
        <a class="toc-link" :href="link" :title="title">
          {{ title }}
        </a>

        <ul v-if="children">
          <li
            v-for="{ link: childLink, title: childText } in children"
            :key="childLink"
            class="toc-item"
          >
            <a class="toc-link subitem" :href="childLink" :title="title"> {{ childText }} </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>
<style lang="scss">
.toc-wrapper {
  margin-left: 64px;
  height: 100vh;
  position: sticky;
  top: 5rem;
  .toc-content__heading {
    font-size: 14px;
    margin-top: 12px;
  }

  .toc-items {
    margin-top: 8px;
    font-size: 14px;
    .toc-item {
      padding-top: 0.5rem;
      .toc-link {
        color: var(--text-base) !important;
        font-weight: 400;
        font-size: 14px;
        &:hover {
          text-decoration: none;
          color: var(--text-hover) !important;
        }
      }

      ul {
        padding-left: 1rem;
      }
    }
  }
}
</style>
