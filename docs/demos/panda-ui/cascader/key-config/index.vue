<script setup lang="ts">
import { ref } from "vue";

const modelValue = ref(["component", "form", "checkbox"]);
const options = [
  {
    id: "guide",
    title: "Guide",
    children: [
      {
        id: "disciplines",
        title: "Disciplines",
        children: [
          {
            id: "consistency",
            title: "Consistency",
          },
          {
            id: "feedback",
            title: "Feedback",
          },
          {
            id: "efficiency",
            title: "Efficiency",
          },
          {
            id: "controllability",
            title: "Controllability",
          },
        ],
      },
    ],
  },
  {
    id: "component",
    title: "Component",
    children: [
      {
        id: "basic",
        title: "Basic",
        children: [
          {
            id: "layout",
            title: "Layout",
          },
          {
            id: "color",
            title: "Color",
          },
          {
            id: "typography",
            title: "Typography",
          },
          {
            id: "icon",
            title: "Icon",
          },
          {
            id: "button",
            title: "Button",
          },
        ],
      },
      {
        id: "form",
        title: "Form",
        children: [
          {
            id: "radio",
            title: "Radio",
          },
          {
            id: "checkbox",
            title: "Checkbox",
          },
          {
            id: "input",
            title: "Input",
          },
          {
            id: "input-number",
            title: "InputNumber",
          },
          {
            id: "select",
            title: "Select",
          },
          {
            id: "cascader",
            title: "Cascader",
          },
          {
            id: "switch",
            title: "Switch",
          },
          {
            id: "slider",
            title: "Slider",
          },
          {
            id: "time-picker",
            title: "TimePicker",
          },
          {
            id: "date-picker",
            title: "DatePicker",
          },
          {
            id: "datetime-picker",
            title: "DateTimePicker",
          },
          {
            id: "upload",
            title: "Upload",
          },
          {
            id: "rate",
            title: "Rate",
          },
          {
            id: "form",
            title: "Form",
          },
        ],
      },
      {
        id: "data",
        title: "Data",
        children: [
          {
            id: "table",
            title: "Table",
          },
          {
            id: "tag",
            title: "Tag",
          },
          {
            id: "progress",
            title: "Progress",
          },
          {
            id: "tree",
            title: "Tree",
          },
          {
            id: "pagination",
            title: "Pagination",
          },
          {
            id: "badge",
            title: "Badge",
          },
        ],
      },
      {
        id: "notice",
        title: "Notice",
        children: [
          {
            id: "alert",
            title: "Alert",
          },
          {
            id: "loading",
            title: "Loading",
          },
          {
            id: "message",
            title: "Message",
          },
          {
            id: "message-box",
            title: "MessageBox",
          },
          {
            id: "notification",
            title: "Notification",
          },
        ],
      },
      {
        id: "navigation",
        title: "Navigation",
        children: [
          {
            id: "menu",
            title: "Menu",
          },
          {
            id: "tabs",
            title: "Tabs",
          },
          {
            id: "breadcrumb",
            title: "Breadcrumb",
          },
          {
            id: "dropdown",
            title: "Dropdown",
          },
          {
            id: "steps",
            title: "Steps",
          },
        ],
      },
      {
        id: "others",
        title: "Others",
        children: [
          {
            id: "dialog",
            title: "Dialog",
          },
          {
            id: "tooltip",
            title: "Tooltip",
          },
          {
            id: "popover",
            title: "Popover",
          },
          {
            id: "card",
            title: "Card",
          },
          {
            id: "carousel",
            title: "Carousel",
          },
          {
            id: "collapse",
            title: "Collapse",
          },
        ],
      },
    ],
  },
  {
    id: "resource",
    title: "Resource",
    children: [
      {
        id: "axure",
        title: "Axure Components",
      },
      {
        id: "sketch",
        title: "Sketch Templates",
      },
      {
        id: "docs",
        title: "Design Documentation",
      },
    ],
  },
  {
    id: "disabled",
    title: "Disabled",
    disabled: true,
    children: [
      {
        id: "disciplines",
        title: "Disciplines",
        children: [
          {
            id: "consistency",
            title: "Consistency",
          },
          {
            id: "feedback",
            title: "Feedback",
          },
          {
            id: "efficiency",
            title: "Efficiency",
          },
          {
            id: "controllability",
            title: "Controllability",
          },
        ],
      },
      {
        id: "navigation",
        title: "Navigation",
        children: [
          {
            id: "side nav",
            title: "Side Navigation",
          },
          {
            id: "top nav",
            title: "Top Navigation",
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <Cascader
    v-model:value="modelValue"
    clearable
    :options="options"
    :visible="true"
    :keyConfig="{ value: 'id', label: 'title' }"
  />

  <br />
  <br />
  当前绑定的值： {{ modelValue }}
</template>

<style lang="scss" scoped>
.bl-cascader {
  width: 400px;
}
.bl-select {
  width: 200px;
}
</style>
