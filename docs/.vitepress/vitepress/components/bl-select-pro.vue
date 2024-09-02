<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vitepress'
import CardTitle from '@panda-ui/components/card/card-title.vue'
import { ArrowPointer } from '@panda-ui/icons'
import CardStack from './card-stack.vue'
import vFuzzy from './fuzzy'
import { SUPPORT_PROJECTS } from '@/.vitepress/configs/projects'

const maxVisibleCards = '4'
const containerWidth = '700'
const scaleMultiplier = '0.3'

const localStorageProjectTitleKey = 'bl-userPreferredPro'

const router = useRouter()
const active = ref(true)
const currentProjectTitle = computed(() => {
  return localStorage.getItem(localStorageProjectTitleKey)
})

function toKebabCase(str: string) {
  return str
    .split(' ')
    .map(i => i.toLowerCase())
    .join('-')
}

const projects = computed(() => {
  return SUPPORT_PROJECTS.sort((a, b) => {
    if (toKebabCase(a.title) === currentProjectTitle.value)
      return -1
    else if (toKebabCase(b.title) === currentProjectTitle.value)
      return 1
    else
      return 0
  })
})

function goto(project: any) {
  const targetPro = toKebabCase(project.title)

  localStorage.setItem(localStorageProjectTitleKey, targetPro)
  router.go(`/projects/${targetPro}/`)

  setTimeout(() => {
    window.location.reload()
  })
}
</script>

<template>
  <Masker v-model:active="active" :mask-close="false">
    <div class="project-selector">
      <CardStack
        ref="stack"
        class="card-stack-continer"
        :cards="projects"
        :card-width="300"
        :card-height="460"
        :stack-width="parseInt(containerWidth)"
        :max-visible-cards="parseInt(maxVisibleCards)"
        :scale-multiplier="parseFloat(scaleMultiplier)"
        :padding-horizontal="30"
      >
        <template #card="{ card: project }">
          <div class="wrapper">
            <div
              v-fuzzy="{
                url: project.icon,
              }"
              class="fuzzy"
            />
            <Card
              class="card"
              :class="{ selected: currentProjectTitle === toKebabCase(project.title) }"
            >
              <div style="width: 100%">
                <div class="card_header">
                  <Avatar class="card_header_avatar" circle :src="project.icon" :size="50" />
                  <div class="card_header_content">
                    <CardTitle class="card_header_content_title">
                      {{ project.title }}
                    </CardTitle>
                    <CardDescription class="card_header_content_description">
                      {{ project.desc }}
                    </CardDescription>
                  </div>
                </div>
              </div>
              <CardBody class="card_body">
                <img :src="project.showcase">
              </CardBody>
              <CardFooter v-if="project.$index === 1" class="card_footer">
                <Button :icon="ArrowPointer" style="width: 100%" @click="goto(project)">
                  查看
                </Button>
              </CardFooter>
            </Card>
          </div>
        </template>
      </CardStack>
    </div>
  </Masker>
</template>

<style lang="scss" scoped>
.project-selector {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;

  .card-stack-continer {
    .wrapper {
      position: relative;
      width: 300px;
      height: 460px;
      border-radius: var(--bl-radius-large);
      background: var(--bl-fill-color-base);
      overflow: hidden;

      .fuzzy {
        position: absolute;
        top: 0;
        left: 0;
        width: 300px;
        height: 460px;
      }
      .card {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 300px;
        width: 300px;
        height: 100%;
        display: flex;
        flex-direction: column;

        &_header {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;

          &_avatar {
            padding: 2px;
            // :deep img {
            //   transform: scale(1.1);
            // }
            pointer-events: none;
          }

          &_content {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;

            &_title {
              font-size: var(--bl-font-size-primary);
            }
            &_description {
              color: var(--bl-content-color-secondary);
            }
          }
        }

        &_body {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 50px;
          margin-bottom: 30px;

          img {
            width: 250px;
            min-height: 180px;
            border-radius: var(--bl-radius-base);
            opacity: 0.9;
            pointer-events: none;
          }
        }

        &_footer {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .selected {
        border-color: rgb(113, 113, 122);
      }
    }
  }
  .current-project-panel {
    z-index: 1;
    color: #ff7a18;
  }
}
</style>
