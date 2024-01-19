<template>
  <div class="wrapper">
    <PanelGroup direction="vertical" grid>
      <Panel :minSizePercentage="20">
        <div class="inner">Min-size: 20</div>
      </Panel>
      <PanelResizeHandle />
      <Panel :minSizePercentage="20">
        <div class="inner">Min-size: 20</div>
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <div class="inner">Min-size: 0</div>
      </Panel>
    </PanelGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 500px;
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
