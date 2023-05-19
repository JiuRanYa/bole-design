<template>
  <a
    :class="{
      link: true,
      active: isActive(route.path, props.item.link)
    }"
    :href="item.link"
    @click="$emit('close')"
  >
    <p class="link-text">{{ item.text }}</p>
  </a>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import type { Link } from '../../type'
import { useRoute } from 'vitepress'
import { isActive } from '../../utils/index'

const route = useRoute()

const props = defineProps<{
  item: Link
}>()

defineComponent({
  name: 'bl-sidebar-link'
})
</script>

<style lang="scss" scoped>
.link:not(.flex) {
  display: block;
}

.link {
  padding: 10px 16px;
  line-height: 1.5;
  font-size: 0.9rem;
  border-radius: 8px;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  color: var(--bl-color-primary-base);
  transition: color 0.25s;
}

.link.active {
  background-color: var(--bl-color-primary-light-8);
  .link-text {
    font-weight: 600;
    transition: color 0.25s;
    color: var(--bl-color-primary-base);
  }
}

.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: #495057;
  transition: color 0.5s;
}
</style>
