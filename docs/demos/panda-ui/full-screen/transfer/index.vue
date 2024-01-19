<template>
  <FullScreen ref="fullScreen" v-slot="{ toggle, full }">
    <div class="container" :class="{ 'is-full': full }">
      <Button type="primary" @click="toggle('window')"> 网页全屏 </Button>
      <Button type="primary" @click="toggle('browser')"> 浏览器全屏 </Button>
      <Tooltip transfer="#full-screen-tooltips" content="全屏后可见">
        <Button> 全屏后可见 </Button>
      </Tooltip>
      <Tooltip transfer content=" 全屏后不可见 ">
        <Button> 全屏后不可见 </Button>
      </Tooltip>
    </div>
    <div id="full-screen-tooltips"></div>
  </FullScreen>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  color: var(--bl-color-primary-base);
}

.is-full {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bl-color-primary-foreground);
}
</style>
