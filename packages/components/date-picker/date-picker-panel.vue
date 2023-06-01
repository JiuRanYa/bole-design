<template>
  <div :class="className">
    <div :class="ns.bm('list')">
      <div :class="ns.bem('pandel', 'body')">
        <div :class="ns.bm('header')">123</div>
        <div :class="ns.bm('calendar')"></div>
      </div>
      <div :class="ns.bm('action')"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@bole-design/hooks'
import { computed, defineComponent } from 'vue'

defineComponent({
  name: 'date-picker-panel'
})

const ns = useNamespace('date-picker')

const className = computed(() => {
  return [ns.bm('panel'), ns.bs('vars')]
})
</script>
