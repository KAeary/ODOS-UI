<template>
  <div>
    <odos-button type="primary" @click="visible = true">打开对话框</odos-button>
    <odos-modal v-model:open="visible" title="自定义标题" :headerClass="'my-modal-header'">
      这里是内容区域。
    </odos-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(false)
</script>

<style scoped lang="scss">
:deep {
  .my-modal-header {
    background: #f7f8fa;
    border-bottom-color: #c9cdd4;
  }
}
</style>
