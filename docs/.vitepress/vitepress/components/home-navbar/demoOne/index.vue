<template>
  <div class="demo-one-container">
    <div class="demo-title">Form</div>
    <div class="demo-desc">
      通过精心设计，您可以轻松构建表单布局，从而增强您的表单在视觉上的吸引力。
    </div>
    <div class="demo-form">
      <Tabs tab-position="left" v-model:value="tabValue">
        <template #trigger>
          <TabsTrigger class="form-sider" value="profile">个人资料</TabsTrigger>
          <TabsTrigger class="form-sider" value="email">账户信息</TabsTrigger>
          <TabsTrigger class="form-sider" value="appearance">外观设置</TabsTrigger>
          <TabsTrigger class="form-sider" value="notification">通知消息</TabsTrigger>
        </template>
        <TabsPane value="profile">
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

            <Select v-model:value="value" :options="options"></Select>

            <Button type="primary" style="margin-top: 40px">更新个人资料</Button>
          </div>
        </TabsPane>
        <TabsPane value="email">
          <div class="form-content">
            <div class="form-content-title">账户信息</div>
            <div class="form-content-desc">请更新您的账户设置，设置您偏好的语言和时区~</div>

            <div class="form-item">
              <div class="form-label">姓名</div>

              <Input style="width: 600px" placeholder="Bole Design" />
              <div class="form-label-desc">这是将在您的个人资料上和电子邮件中显示的名字。</div>
            </div>

            <div class="form-item">
              <div class="form-label">生日</div>

              <DatePicker style="width: 600px" v-model:value="birValue" />
              <div class="form-label-desc">您的出生日期用于计算您的年龄。</div>
            </div>

            <div class="form-item">
              <div class="form-label">语言</div>

              <Select
                style="width: 500px"
                v-model:value="emailValue"
                :options="emailSelectOptions"
                placeholder="Select language"
              />
              <div class="form-label-desc">您的出生日期用于计算您的年龄。</div>
            </div>
            <Button type="primary" style="margin-top: 20px">更新账户信息</Button>
          </div>
        </TabsPane>
        <TabsPane value="appearance">
          <div class="form-content">
            <div class="form-content-title">外观设置</div>
            <div class="form-content-desc">个性化应用的外观设置，自动切换白天和黑夜主题~</div>
          </div>
        </TabsPane>
        <TabsPane value="notification">
          <div class="form-content">
            <div class="form-content-title">通知消息</div>
            <div class="form-content-desc">配置您接收通知的方式~</div>

            <div class="form-item">
              <div class="form-content-title">外观设置</div>
              <div class="notification-card">
                <div>
                  <div class="notification-card-title">通讯邮件</div>
                  <div class="notification-card-desc">接收关于您的账户活动的电子邮件</div>
                </div>

                <Switch class="notification-switch" v-model:value="switchValue"></Switch>
              </div>
              <div class="notification-card">
                <div>
                  <div class="notification-card-title">通讯邮件</div>
                  <div class="notification-card-desc">接收关于您的账户活动的电子邮件</div>
                </div>

                <Switch class="notification-switch"></Switch>
              </div>
              <div class="notification-card">
                <div>
                  <div class="notification-card-title">通讯邮件</div>
                  <div class="notification-card-desc">接收关于您的账户活动的电子邮件</div>
                </div>

                <Switch class="notification-switch"></Switch>
              </div>
              <div class="notification-card">
                <div>
                  <div class="notification-card-title">通讯邮件</div>
                  <div class="notification-card-desc">接收关于您的账户活动的电子邮件</div>
                </div>

                <Switch class="notification-switch"></Switch>
              </div>
            </div>
          </div>
          <Button type="primary" style="margin-top: 20px">更新通知消息</Button>
        </TabsPane>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { defineComponent, ref } from 'vue'

defineComponent({
  name: 'demo-one'
})
const tabValue = ref('profile')
const value = ref()
const emailValue = ref()
const birValue = ref(dayjs().subtract(1, 'day'))
const switchValue = ref(true)
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
const emailSelectOptions = [
  {
    label: 'English',
    value: 1
  },
  {
    label: 'French',
    value: 2
  },
  {
    label: 'Chinese',
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
    border-bottom: 1px solid var(--bl-fill-color-disabled);
  }

  .demo-form {
    display: flex;
    margin-top: 24px;

    .bl-tabs {
      width: 100%;
    }

    .form-sider {
      width: 200px;
      font-size: 14px;
      padding: 8px 16px;
      font-weight: 500;
      margin-top: 4px;
      &:not(.bl-tabs-trigger__active) {
        color: var(--text-base);
        &:hover {
          text-decoration: underline;
        }
      }
    }

    .form-content {
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
        border-bottom: 1px solid var(--bl-fill-color-disabled);
        color: rgb(113, 113, 122);
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
          color: rgb(113, 113, 122);
        }
      }

      .notification-card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: var(--bl-radius-large);
        width: 60%;
        border: 1px solid var(--bl-fill-color-disabled);
        margin-top: 24px;
        &-title {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-reverse);
          margin-bottom: 12px;
        }
        &-desc {
          color: rgb(113, 113, 122);
        }
      }
    }
  }
}
</style>
