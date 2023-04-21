# Bole-ui

## TODO:

- [ ] 完善打包构建脚本
- [x] 增加基于 `vitepress` 的文档，确定目录结构
- [ ] 增加 `hooks`、`utils`
- [ ] 组件增加自定义前缀功能，全局样式功能

## 构建脚本

- [x] 打包所有组件，支持 es 和 cjs
- [x] 根据 components 目录自动导出所有组件，并提供 vue use install 函数
- [x] 组件全局的类型支持，自动生成`index.d.ts`文件
- [ ] 自动生成 docs 模版，自动添加 `markdown` 文件
- [ ] 自动生成 Demo vue 文件 ，生成 params table
- [x] 自动读取 index.ts 文件，为所有组件生成`d.ts`文件
- [x] 自动完善组件类型支持
