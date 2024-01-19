<template>
  <div class="wrapper">
    <draggable
      v-bind="{ animation: 200 }"
      tag="panel-group"
      :list="panelData"
      item-key="element.content"
    >
      <template #item="{ element }">
        <Panel>
          <div class="inner">{{ element.content }}</div>
          <PanelResizeHandle />
        </Panel>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const panelData = ref([
  {
    content: 1
  },
  {
    content: 2
  },
  {
    content: 3
  }
])
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 200px;
}
.inner {
  background: var(--bl-color-secondary-base);
  color: var(--bl-color-primary-base);
  flex: auto;
  font-size: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
}
</style>
