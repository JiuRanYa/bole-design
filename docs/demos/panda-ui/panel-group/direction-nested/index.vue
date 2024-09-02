<script setup lang="ts">
import PanelGroup from "@panda-ui/components/panel-group/panel-group.vue";
</script>

<template>
  <div class="wrapper">
    <PanelGroup direction="vertical" grid>
      <Panel style="overflow: unset;">
        <PanelGroup grid>
          <Panel>
            <div class="inner">123</div>
          </Panel>

          <PanelResizeHandle />

          <Panel>
            <div class="inner">123</div>
          </Panel>
        </PanelGroup>
      </Panel>

      <PanelResizeHandle />

      <Panel>
        <PanelGroup grid>
          <Panel>
            <div class="inner">123</div>
          </Panel>

          <PanelResizeHandle />

          <Panel>
            <div class="inner">123</div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  </div>
</template>

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
  border-radius: 12px;
}
</style>
