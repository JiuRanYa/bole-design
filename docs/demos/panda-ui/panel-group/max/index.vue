<template>
  <div class="wrapper">
    <PanelGroup>
      <Panel :defaultSizePercentage="30" :maxSizePercentage="30">
        <div class="inner">
          <div>MaxSize: 30</div>
          <div>DefaultSize: 30</div>
        </div>
      </Panel>
      <PanelResizeHandle />
      <Panel :minSizePercentage="30">
        <div class="inner">
          <div>MinSize: 30</div>
        </div>
      </Panel>
      <PanelResizeHandle />
      <Panel>
        <div class="inner">No constraints</div>
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
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
