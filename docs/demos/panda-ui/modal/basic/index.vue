<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)

</script>

<template>
  <Button type="primary" @click="active = !active">
    打开Modal
  </Button>

  <Modal v-model:active="active">
    <div class="modal-title">
      标题
    </div>

    <div class="modal-desc">
      你可以在modal中定义任何你想要的内容
    </div>

    <div class="modal-action">
      <Button type="secondary" @click="active = !active">
        Cancel
      </Button>
      <Button type="primary">
        Save
      </Button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.modal-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
}
.modal-desc {
  margin-bottom: 60px;
}
.modal-action {
  display: flex;
  justify-content: flex-end;
}
</style>
