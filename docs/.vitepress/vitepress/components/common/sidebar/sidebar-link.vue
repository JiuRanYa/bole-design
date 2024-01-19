<template>
  <a
    :class="{
      link: true,
      active: isActive(route.path, realLink)
    }"
    :href="realLink"
  >
    <p class="link-text">{{ item.text }}</p>
  </a>
</template>

<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import type { Link } from '../../../type'
import { isActive } from '../../../utils/index'
import { useRoute } from 'vitepress'

const props = defineProps<{
  item: Link
}>()

defineComponent({
  name: 'bl-sidebar-link'
})
const route = useRoute()
const project = computed(() => route.path.split('/')[2])
const realLink = computed(() => `/projects/${project.value}${props.item.link}`)
</script>

<style lang="scss" scoped>
.link:not(.flex) {
  display: block;
}

.link {
  padding: 8px 0px;
  line-height: 1.5;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  text-decoration: underline;
  transition: color 0.25s;
}

.active {
  font-weight: 500;
  color: var(--text-active);
}

.link-text {
  line-height: 20px;
  font-size: 14px;
}
</style>
