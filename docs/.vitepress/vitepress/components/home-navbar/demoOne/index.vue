<template>
  <div class="demo-one-container">
    <div class="demo-title">Form</div>
    <div class="demo-desc">
      通过精心设计，您可以轻松构建表单布局，从而增强您的表单在视觉上的吸引力。
    </div>
    <div class="demo-form">
      <div class="form-sider">个人资料</div>
      <div class="form-content">
        <div class="form-content-title">个人资料</div>
        <div class="form-content-desc">完善您的个人资料方便好友认识你~</div>

        <div class="form-item">
          <div class="form-label">用户名</div>

          <Input style="width: 600px" placeholder="Bole Design" />
          <div class="form-label-desc">
            这是您的公开显示名称。可以是您的真实姓名或化名。您每30天只能更改一次此名称。
          </div>
        </div>

        <div class="form-label">邮箱</div>
        <Select :options="options"></Select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { FaceGrinBeamR, FaceSurpriseR, SunR, MoonR } from '@bole-design/icons'

defineComponent({
  name: 'demo-one'
})
const options = [
  {
    label: '8127439@gmail.com',
    value: 1
  },
  {
    label: 'xia1259812@gmail.com',
    value: 2
  },
  {
    label: 'tsxc213901235@gmail.com',
    value: 3
  }
]
</script>

<style lang="scss" scoped>
.demo-one-container {
  display: grid;

  .demo-title {
    font-size: 26px;
    font-weight: 700;
    color: var(--text-reverse);
  }
  .demo-desc {
    margin-top: 12px;
    font-size: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--bl-color-primary-light-9);
  }

  .demo-form {
    display: flex;
    margin-top: 24px;

    .form-sider {
      width: 200px;
      font-size: 16px;
      font-weight: 700;
      color: var(--text-reverse);
    }

    .form-content {
      flex: 1;
      &-title {
        font-weight: 700;
        font-size: 18px;
        font-weight: 700;
        color: var(--text-reverse);
      }
      &-desc {
        font-size: 14px;
        margin-top: 8px;
        padding-bottom: 24px;
        margin-bottom: 36px;
        border-bottom: 1px solid var(--bl-color-primary-light-9);
      }
      .form-item {
        margin-bottom: 32px;
      }

      .form-label {
        font-size: 16px;
        font-weight: 700;
        color: var(--text-reverse);
        margin-bottom: 12px;
        &-desc {
          margin-top: 12px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
