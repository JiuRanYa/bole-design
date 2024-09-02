<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { BilibiliB, User, YoutubeB } from '@panda-ui/icons'
import dayjs from 'dayjs'

defineComponent({
  name: '',
})

const value = ref<number>(1)
const roleValue = ref('member')
const roleValue2 = ref('owner')
const activeName = ref('password')
const currentDate = ref(dayjs().format('YYYY-MM-DD'))

const roleOptions = [
  {
    label: 'Owner',
    value: 'owner',
  },
  {
    label: 'Member',
    value: 'member',
  },
  {
    label: 'Contributor',
    value: 'contro',
  },
]
const options = [
  {
    label: 'Vue',
    value: 'vue',
  },
  {
    label: 'React',
    value: 'react',
  },
  {
    label: 'Vanila',
    value: 'vanila',
  },
]
</script>

<template>
  <div class="card-wrapper">
    <div class="card-col">
      <Card>
        <CardHeader>
          <CardTitle> Create project </CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardBody>
          <div>
            <Label>Name</Label>
            <Input placeholder="Name of your project" />
          </div>
          <div style="margin-top: 12px">
            <Label>Frame</Label>
            <Select v-model:value="value" :options="options" />
          </div>
        </CardBody>
        <CardFooter>
          <Button>Cancel</Button>
          <Button type="primary">
            Deploy
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Cookie setting</CardTitle>
          <CardDescription>Manage your cookie settings here. </CardDescription>
        </CardHeader>
        <CardBody>
          <div style="display: flex; align-items: center">
            <div>
              <Label>Strictly Necessary</Label>
              <CardDescription style="font-size: 12px">
                These cookies are essential in order to use the website and use its features.
              </CardDescription>
            </div>
            <Switch />
          </div>
          <div style="display: flex; align-items: center; margin-top: 20px">
            <div>
              <Label>Functional Cookies</Label>
              <CardDescription style="font-size: 12px">
                These cookies allow the website to provide personalized functionality
              </CardDescription>
            </div>
            <Switch value />
          </div>
          <div style="display: flex; align-items: center; margin-top: 20px">
            <div>
              <Label>Performance Cookies</Label>
              <CardDescription style="font-size: 12px">
                These cookies help to improve the performance of the website.
              </CardDescription>
            </div>
            <Switch />
          </div>
        </CardBody>
        <CardFooter>
          <Button style="width: 100%">
            Save Setting
          </Button>
        </CardFooter>
      </Card>
    </div>
    <div class="card-col">
      <Card style="width: 380px">
        <CardHeader>
          <CardTitle> Team Members </CardTitle>
          <CardDescription> Invite your team members to collaborate. </CardDescription>
        </CardHeader>
        <CardBody>
          <div class="user-wrapper">
            <Avatar
              circle
              src="https://avatars.githubusercontent.com/u/58846658?v=4"
              size="large"
            />
            <div class="user-content">
              <div class="user-name">
                Tong Siyuan
              </div>
              <CardDescription class="user-role">
                Team Members
              </CardDescription>
            </div>
            <Select
              v-model:value="roleValue"
              style="width: 140px"
              class="user-role-select"
              :options="roleOptions"
              :fit-popper="false"
            />
          </div>
          <div class="user-wrapper">
            <Avatar circle src="https://ui.shadcn.com/avatars/03.png" size="large" />
            <div class="user-content">
              <div class="user-name">
                Tang Xiaofei
              </div>
              <CardDescription class="user-role">
                Team Members
              </CardDescription>
            </div>
            <Select
              v-model:value="roleValue2"
              style="width: 140px"
              class="user-role-select"
              :options="roleOptions"
              :fit-popper="false"
            />
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <Tabs v-model:value="activeName" default-value="account" tab-position="top">
            <template #trigger>
              <TabsTrigger style="width: 50%" value="account">
                Account
              </TabsTrigger>
              <TabsTrigger style="width: 50%" value="password">
                Password
              </TabsTrigger>
            </template>
            <TabsPane value="account">
              <Card style="min-width: 100%">
                <CardHeader>
                  <CardTitle>Your account</CardTitle>
                  <CardDescription> Make changes to your account here </CardDescription>
                </CardHeader>
                <CardBody>
                  <Label>UserName</Label>
                  <Input>
                    <template #prefix>
                      <Icon :icon="User" />
                    </template>
                  </Input>
                  <div style="margin-top: 20px">
                    <Label>Your Birthday</Label>
                    <DatePicker v-model:value="currentDate" />
                  </div>
                </CardBody>
                <CardFooter>
                  <Button style="width: 100%" type="primary">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </TabsPane>
            <TabsPane value="password">
              <Card style="min-width: 100%">
                <CardHeader>
                  <CardTitle> Change Password </CardTitle>
                  <CardDescription> After saving, you'll be logged out.</CardDescription>
                </CardHeader>
                <CardBody>
                  <Label>Current Password</Label>
                  <Input placeholder="Confirm your current password" />
                  <div style="margin-top: 20px">
                    <Label>New Password</Label>
                    <Input placeholder="Enter your new password" />
                  </div>
                </CardBody>
                <CardFooter>
                  <Button style="width: 100%" type="primary">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </TabsPane>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
    <div class="card-col">
      <Card style="width: 380px">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>Enter your email below to create your account </CardDescription>
        </CardHeader>
        <CardBody>
          <Button style="width: 45%">
            <Icon :icon="BilibiliB" style="margin-right: 12px" />
            <Label>Bilibili</Label>
          </Button>
          <Button style="width: 45%">
            <Icon :icon="YoutubeB" style="margin-right: 12px" />
            <Label> Youtube </Label>
          </Button>
          <Label style="margin-top: 20px">Email</Label>
          <Input placeholder="tongsiyuan@bolegames.com" />
          <div style="margin-top: 12px">
            <Label>Password</Label>
            <Input />
          </div>

          <CardFooter>
            <Button style="width: 100%" type="primary">
              Create account
            </Button>
          </CardFooter>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Share this document</CardTitle>

          <CardDescription>Anyone with the link can view this document. </CardDescription>
        </CardHeader>
        <CardBody>
          <div style="position: relative">
            <Input value="//design.spinbi.com" placeholder="share Panda UI" style="width: 66%" />
            <Button disabled style="position: absolute; right: 0; bottom: 0" type="primary">
              Copy Link
            </Button>
          </div>
          <Label style="margin-top: 20px; margin-bottom: 20px">People you want to share</Label>
          <div class="user-wrapper">
            <Avatar
              circle
              src="https://avatars.githubusercontent.com/u/58846658?v=4"
              size="large"
            />
            <div class="user-content">
              <div class="user-name">
                Tong Siyuan
              </div>
              <CardDescription class="user-role">
                Team Members
              </CardDescription>
            </div>
          </div>
          <div class="user-wrapper">
            <Avatar circle src="https://ui.shadcn.com/avatars/03.png" size="large" />
            <div class="user-content">
              <div class="user-name">
                Tang Xiaofei
              </div>
              <CardDescription class="user-role">
                Team Members
              </CardDescription>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  grid-template-columns: 33% 33% 33%;
  column-gap: 20px;

  .card-col {
    width: 33%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
}

.user-wrapper {
  display: flex;
  position: relative;

  & + & {
    margin-top: 20px;
  }

  .user-content {
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .user-role {
    margin-top: 6px;
  }

  .user-name {
    font-weight: 500;
    font-size: 14px;
  }

  .user-role-select {
    position: absolute;
    right: 0;
  }
}
</style>
