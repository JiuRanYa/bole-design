<script setup lang="ts">
import { Moon, Sun } from '@panda-ui/icons'
</script>

<template>
  <Button :icon="Moon">
    月亮
  </Button>

  <Button>
    <template #icon>
      <Icon :icon="Sun" />
    </template>
    太阳
  </Button>
</template>
