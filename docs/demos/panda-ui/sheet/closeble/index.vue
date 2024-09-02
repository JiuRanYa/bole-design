<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<template>
  <Button type="primary" @click="active = !active">
    打开Sheet
  </Button>

  <Sheet v-model:active="active">
    <div class="sheet-title">
      Edit
    </div>
    <div class="sheet-desc">
      Make changes to your profile here. Click save when you're done.
    </div>
    <div class="sheet-content">
      <span> Some contents </span>
      <span> Some contents </span>
    </div>
    <template #action>
      <Button style="width: 120px" type="primary">
        Update
      </Button>
    </template>
  </Sheet>
</template>

<style lang="scss" scoped>
.sheet-title {
  font-weight: 600;
  font-size: 18px;
  color: var(--bl-color-primary-light-2);
}
.sheet-desc {
  color: var(--bl-content-color-secondary);
  margin-top: 12px;
}
.sheet-content {
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}
</style>
