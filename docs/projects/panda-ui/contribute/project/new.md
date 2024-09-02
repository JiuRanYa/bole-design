---
title: 新增项目
page: true
description: Panda UI文档新增项目
---

## 新增项目

接下来我们尝试`Panda UI`文档中新增一个支持项目，名称为`测试项目`

首先在`web/docs/projects`下，创建一个名称是`您想支持的项目`的文件夹，并在项目文件夹下新建一个`index.md`，内容如下

```markdown

---
title: 测试项目
page: true
lang: zh-CN
---

<ClientOnly>
  <TestHomepage />
</ClientOnly>

```

其中`<TestHomepage />`是一个组件

所以我们需要创建一个`TestHomepage`组件，来书写`测试项目`的首页

接下来在`docs/.vitepress/vitepress/components/`下,
新建`测试项目/test-homepage.vue`，在此来编写您想要支持项目的首页样式

## 将项目新增到支持项目中

完成以上工作后，您已经可以支持一个新的项目在Panda UI了

但是由于鉴权问题，您需要在Panda UI支持项目的列表里加上您的项目名

在`docs/.vitepress/configs/projects`中，将您项目的详细信息添加到列表中去

```ts
export const SUPPORT_PROJECTS = [
  {
    title: '测试项目',
    desc: '这是一个测试项目，用于演示如何新增支持项目',
    icon: 'https://d1cse7lsiayene.cloudfront.net/bole-design/projects/design.png',
    showcase: 'https://d1cse7lsiayene.cloudfront.net/bole-design/projects/design-home.jpg',
    link: 'https://design.spinxbi.com/projects/panda-ui/'
  },
]

export const supportProjects = ['测试项目']
```

到此，您已经为Panda UI支持了全新的项目

您可以访问`/projects/panda-ui/`路由来查看`TestHomepage`页面

如果您想为新项目新增导航和侧边栏，请查看 [配置头部导航](/projects/panda-ui/contribute/docs.html#头部导航)
