---
title: 创建新的文档
page: true
description: 创建新的文档
---

## 开始

关于`Panda UI`的所有文档均在`bole-design/web/docs`目录下

### 启动项目

您有以下两种方式可以启动文档项目

- 在`web`目录下运行`pnpm run serve:docs`命令启动
- 在`docs`目录下运行`pnpm run serve`命令启动

### 头部导航

如果您需要新增一个`头部导航`，您可以在`web/docs/.vitepress/config/nav.ts`中添加

比如您想在`Panda UI`项目下新增`测试`的导航栏

![image](/panda-ui/docs/1.png)

:::warning

getProjectLink的第一个参数一定要与项目名称保存一致

:::

然后您需要在对应的目录中新增一个markdown文件

### 侧边栏

您可以注意到文档结构有三部分，分别是

- 左侧侧边栏
- 中间内容部分
- 右侧导航条

您可以在`web/docs/.vitepress/config/sidebar.ts`中添加您想要的侧边栏

:::warning

添加时需要添加到对应的项目中去

:::

### 新增文档

在文档项目里，所有的文档markdown均在`web/docs/projects`目录下

该目录下的文件名则对应不同的项目，且路径以文件夹划分

如上我们已经为`Panda UI`添加了一个头部标题为`测试`，对应的目录为`/contribute/start`，

现在我们需要项目目录下，新增一个markdown文件，路径与上方配置保持一致

![image](/panda-ui/docs/markdown.png)

接下来在markdown编写即可，如果您有更高级的定制需求，可查看 [Markdown插件](/projects/panda-ui/contribute/mk-plugin)

### 右侧导航

右侧的导航栏可根据markdown标题自动生成，无需多余配置
