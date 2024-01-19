<template>
  <div
    class="switch-project-wrapper"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="{ isHover: isHover }"
  >
    <Button type="primary">
      <Icon :icon="HouseChimneyWindow" :scale="1.4" />
    </Button>
    <div class="drop-list" v-if="showList">
      <div
        class="drop-list-item"
        v-for="project in supportProjects"
        @click="switchProject(project)"
      >
        <Icon :icon="ChevronDown" v-if="project === currentPro"></Icon>
        {{ project }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineComponent, onMounted } from 'vue'
import { HouseChimneyWindow, ChevronDown } from '@panda-ui/icons'
import { BL_PROJECT_STORAGE, supportProjects } from '@/.vitepress/vitepress/tookens'

defineComponent({
  name: 'switch-project'
})

const isHover = ref(false)
const showList = ref(false)
const currentPro = ref()

function switchProject(project: string) {
  localStorage.setItem(BL_PROJECT_STORAGE, project)
  window.location.pathname = `/projects/${project}/`
}

function handleMouseEnter() {
  isHover.value = true
  setTimeout(() => {
    showList.value = true
  }, 250)
}

function handleMouseLeave() {
  isHover.value = false
  setTimeout(() => {
    showList.value = false
  }, 150)
}

onMounted(() => {
  currentPro.value = localStorage.getItem(BL_PROJECT_STORAGE)
})
</script>

<style lang="scss" scoped>
.switch-project-wrapper {
  position: fixed;
  right: 0vw;
  top: 70vh;
  width: 40px;
  overflow: hidden;
  height: 40px;
  transition: all 0.5s ease-in-out;
  background: var(--bl-color-primary-base);
  border-top-left-radius: 26px;
  border-bottom-left-radius: 26px;

  .bl-button {
    height: 40px;
    width: 40px;
    transition: width 0.5s ease-in-out;
    border-top-left-radius: 24px;
    border-bottom-left-radius: 24px;
    padding-left: 20px;
    padding: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .drop-list {
    margin-top: 40px;
    transform-origin: top center;

    &-item {
      display: flex;
      padding: 12px;
      font-size: 14px;
      line-height: 1;
      justify-content: center;
      cursor: pointer;
      color: var(--bl-color-primary-foreground);

      &:hover {
        background: var(--bl-color-primary-hover);
      }

      .bl-icon {
        position: absolute;
        left: 14px;
        margin-inline-end: 24px;
      }
    }
  }
}
.isHover {
  width: 160px;
  border-top-left-radius: 24px;
  height: calc(40px + 38px * 3 + 6px);
  border-bottom-left-radius: 24px;
  .bl-button {
    width: 100% !important;
  }
}
</style>
