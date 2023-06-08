<template>
  <Button :icon="Moon">月亮</Button>

  <Button>
    <template #icon>
      <Icon :icon="Sun"></Icon>
    </template>
    太阳
  </Button>
</template>

<script setup lang="ts">
import { Moon, Sun } from '@bole-design/icons'
</script>
