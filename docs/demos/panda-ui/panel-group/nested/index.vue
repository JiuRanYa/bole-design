<template>
  <div class="wrapper">
    <PanelGroup>
      <Panel>
        <div class="inner">1</div>
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <PanelGroup direction="vertical">
          <Panel>
            <div class="inner">2</div>
          </Panel>
          <PanelResizeHandle />
          <Panel>
            <div class="inner">3</div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 260px;
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
