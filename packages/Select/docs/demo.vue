<template>
  <odos-select
    placeholder="请进行选择"
    :options="[
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4' },
      { value: '5', label: '5' }
    ]"
    multiple
    mutex
    :mutex-option-value="['1', '2']"
    v-model:value="selectValue"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectValue = ref()
</script>
