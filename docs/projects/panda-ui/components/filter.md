---
title: Filter
lang: zh-CN
---

# Filter

<script setup>
const demos = import.meta.globEager('../../../demos/panda-ui/filter/*/*.vue')
</script>

## 基础用法

通过`ruleOptions`设置筛选可选项目，通过`v-model`进行双向绑定

:::demo

filter/basic

:::

当在`operator`中设置`isBetween: true`:

- 对于`inputType`为`input`的选项， 面板将会渲染两个输入框。
- 对于`inputType`为`date`的选项，板将会默认渲染`type`为`range`的`DatePicker`组件。

**注意，`isBetween` 字段只对以上两种 `inputType` 生效。**

## 筛选器默认值

通过`rules`可以给筛选器设置默认规则。

:::demo

filter/default

:::

## 筛选器下拉项目设置校验规则

通过在`ruleOptions`的项目中设置`validationSchema`字段可以添加校验规则。其中`validationSchema`需要符合`yup`的设置规则，可参考：[Yup](https://www.npmjs.com/package/yup)

**注意：校验规则仅当`inputType`为`input`和`multiInput`时才生效。如果没有传入`validationSchema`，则不会进行任何校验。**

:::demo

filter/validation

:::

## 支持多层嵌套的可选项

通过`parentField`可以设置可选项的父选项，其中父选项的`inputType`必须为`custom`。

同时，一个`inputType`为`custom`的子选项也可以设置为其他子项的父选项，构成多层嵌套。

:::demo

filter/nested

:::

## 默认打开筛选面板

通过`visible`可以设置初次渲染时，筛选面板为可见状态

:::demo

filter/visible

:::

## 筛选器只读状态

通过`readonly`可以设置筛选器为只读状态。此时不能新增筛选规则，也不能触发任何事件。

:::demo

filter/readonly

:::
**请注意，当 `readonly=true` 时，即使将 `visible` 属性设置为 `true`，筛选面板也不会打开。**

## 自定义筛选项目和筛选按钮

可以通过 rule 插槽来自定义筛选项目，filter 插槽来自定义筛选按钮

:::demo

filter/custom

:::

## Filter 参数

| 名称        | 类型           | 说明                     | 默认值 | 始于 |
| ----------- | -------------- | ------------------------ | ------ | ---- |
| rules       | `RuleData[]`   | 筛选器绑定的值           | -      | -    |
| ruleOptions | `RuleOption[]` | 需传入的筛选器可选项列表 | []     | -    |

## 类型

```ts
 enum InputType {
  INPUT = 'input',
  MULTIINPUT = 'multiInput',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  DATE = 'date',
  CUSTOM = 'custom',
  BOOLEAN = 'boolean'
}

type Operator = {
  label: string
  value: string
  isBetween?: boolean
}

type Choice = {
  val: string
  label: string
}

type RuleData = {
  field: string
  label: string
  operator: Operator
  value: string | number | boolean | any[]
  inputType: InputType
} & {
  [key: string]: any
}

type RuleOption = {
  field: string
  label: string
  inputType: InputType
  operators?: Operator[]
  choices?: Choice[]
  options?: RuleOption[]
  parentField?: string
} & {
  [key: string]: any
}
```
