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
  padding: 8px 0px;
  line-height: 1.5;
  font-size: 0.9rem;
  border-radius: 8px;

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
