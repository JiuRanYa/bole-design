<script setup lang="ts">
import type { Emoji } from '@panda-ui/components/emoji-picker/props'
import { FaceSmileWink } from '@panda-ui/icons'
import { ref, watch } from 'vue'

const emoji = ref()

watch(emoji, () => {
  console.log(emoji.value)
})

function handleSelect(emoji: Emoji) {
  console.log(emoji)
}
</script>

<template>
  <EmojiPicker v-model:value="emoji" @select="handleSelect">
    <div class="emoji-picker-trigger">
      <Icon :icon="FaceSmileWink" />
    </div>
  </EmojiPicker>
</template>

<style lang="scss">
.emoji-picker-trigger {
  padding: 12px;
  display: inline-flex;
  border-radius: var(--bl-radius-large);
  &:hover {
    background: var(--bl-fill-color-hover);
  }
}
</style>
