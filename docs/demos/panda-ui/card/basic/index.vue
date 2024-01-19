<template>
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
        <Select v-model:value="value" :options="options"></Select>
      </div>
    </CardBody>
    <CardFooter>
      <Button type="ghost">Cancel</Button>
      <Button>Deploy</Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<number>(1)

const options = [
  {
    label: 'Vue',
    value: 'vue'
  },
  {
    label: 'React',
    value: 'react'
  },
  {
    label: 'Vanila',
    value: 'vanila'
  }
]
</script>
