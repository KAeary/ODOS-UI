<template>
  <div class="drawer-wrapper" v-if="props.open">
    <!-- 蒙层 -->
    <div class="drawer-mask" @click="cancel" v-if="maskClosable" />
    <div class="drawer-mask" v-else></div>

    <!-- 抽屉容器 -->
    <div class="drawer-container">
      <!-- 标题栏 -->
      <div class="drawer-header" :class="headerClass">
        <slot name="header">
          <div class="header-title">{{ title }}</div>
        </slot>
        <template v-if="closeIcon">
          <div class="header-close-icon" @click="cancel">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18"
                stroke="#ffffff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#ffffff"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </template>
      </div>

      <!-- 内容区域 -->
      <div
        class="drawer-body"
        :class="bodyClass"
        :style="bodyStyle as unknown as Record<string, string | number>"
      >
        <slot />
      </div>

      <!-- 底部按钮 -->
      <div class="drawer-footer">
        <slot name="footer">
          <Button @click="cancel">取消</Button>
          <Button type="primary" @click="ok">确认</Button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'packages/Button/src/index.vue'
import type { HTMLAttributes, ReservedProps } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
  maskClosable?: boolean
  closeIcon?: boolean
  headerClass?: string
  bodyClass?: string
  bodyStyle?: HTMLAttributes & ReservedProps & Record<string, unknown>
}>()

// 事件函数
const emit = defineEmits<{
  (e: 'cancel' | 'ok'): void
  (e: 'update:open', val: boolean): void
}>()

// 取消
const cancel = () => {
  emit('cancel')
  emit('update:open', false)
}

// 确认
const ok = () => {
  emit('ok')
  emit('update:open', false)
}
</script>

<style scoped lang="scss">
@mixin option-item {
  width: 100%;
  min-height: 34px;
  display: flex;
  align-items: center;
  padding: 7px 16px;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;
  /* 线条/深色 */
  border: 0.5px solid #c9cdd4;
}

.drawer-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;

  * {
    box-sizing: border-box;
  }

  .drawer-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1001;
  }

  .drawer-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    z-index: 1002;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    .drawer-header {
      flex-shrink: 0;
      padding: 12px 16px;
      border-bottom: 1px solid #e5e6eb;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-title {
        font-family: 'PingFang SC';
        font-size: 16px;
        font-weight: 500;
        color: #1d2129;
      }

      .header-close-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        cursor: pointer;
        background-color: #4e5969;
        border-radius: 50%;
      }
    }

    .drawer-body {
      min-width: 300px;
      padding: 16px;
      overflow-y: scroll;

      /* 自定义滚动条样式 */
      &::-webkit-scrollbar {
        width: 2px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
      }

      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 3px;

        &:hover {
          background: #a8a8a8;
        }
      }
    }

    .drawer-footer {
      height: 60px;
      padding: 12px 16px;
      border-top: 1px solid #e5e6eb;
      display: flex;
      justify-content: flex-end;
      gap: 16px;
    }
  }
}
</style>
