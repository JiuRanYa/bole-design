---
title: icon
lang: en-US
---

# 新增图片展示

您需要先将图片新增至 `CDN` 上

如果您希望在 docs 中展示相应的图标,应该遵循以下步骤

## 1. 初始化 json

把新增的图片放到对应的文件夹中，并初始化 `json`

`docs` 中的 `svg` 图标均通过 `json` 统一请求，避免了多次请求图片的问题, `json` 根据文件目录生成

```shell

pnpm run bootstrap:icons

```

## 2. 新增 md

您还需要在 docs/projects/panda-ui/cdn 中增加您的分类，该目录下每个文件夹为一个大类，如果您不是新增一个大类，那么不需要进行此步

如果要新增一个大类图标，需要创建`type.md`文件，并将 `markdown` 中的 `title` 改为大类名称

```markdown
---
title: regular         #--->  修改这里的title和文件夹名称保持一致
page: true
---
```

:::warning

该名称必须和 `public/icon` 中的文件名保持一致

:::
