<template>
  <Input>
    <template #before>
      <Label>Name</Label>
    </template>
    <template #prefix>
      <Icon :icon="User" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import { User } from '@panda-ui/icons'
</script>
