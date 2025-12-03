<script setup>
import Default from './default.vue'
</script>

# DropdownPanel 下拉面板

根据内容自动调整大小的“下拉面板”，锚定到触发元素附近，无遮罩。支持外部点击关闭、自定义关闭按钮，且可通过 v-model 控制显示/隐藏。

## 基础用法

<Preview comp-name="DropdownPanel" demo-name="default">
  <Default />
</Preview>

## Props

| 属性 | 描述 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| modelValue | 是否显示（v-model） | boolean | false |
| triggerEl | 触发元素（用于定位） | HTMLElement \| null | -- |
| placement | 面板位置 | 'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' | bottom-start |
| offsetX | X 轴偏移 | number | 0 |
| offsetY | Y 轴偏移 | number | 4 |
| zIndex | 面板层级 | number | 1000 |
| maxWidth | 面板最大宽度 | string \| number | auto |
| maxHeight | 面板最大高度 | string \| number | 50vh |
| fitWidth | 宽度是否适配触发元素 | boolean | true |

## Slots

| 插槽名 | 说明 |
| ---- | ---- |
| default | 面板内容 |
