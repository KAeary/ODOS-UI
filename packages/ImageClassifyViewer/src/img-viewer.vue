<script setup lang="ts">
import { ref } from 'vue'
import type { ImageItem } from './index.vue'
import { Image } from 'ant-design-vue'
interface Props {
  data: ImageItem
}
const props = defineProps<Props>()
const imageViewVisible = ref(false)
const setImageViewVisible = (value: boolean) => {
  imageViewVisible.value = value
}
const imageViewHandle = () => {
  setImageViewVisible(true)
}
</script>

<template>
  <div class="odos-ImageClassifyViewer-img-viewer">
    <div class="odos-ImageClassifyViewer-img-viewer-img">
      <div class="odos-ImageClassifyViewer-img-viewer-img-img" @click="imageViewHandle">
        <img :src="data.thumbnailImageUrl" alt="" />
        <div :style="{ position: 'absolute', top: '1000px', left: '1000px', zIndex: -10, display: 'none' }">
          <Image
            v-if="imageViewVisible"
            width="80%"
            :preview="{
              visible: imageViewVisible,
              onVisibleChange: setImageViewVisible
            }"
            :src="data.imageUrl"
          />
        </div>
      </div>
      <p>{{ data.ljCreateDatetime }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.odos-ImageClassifyViewer-img-viewer {
  width: 146px;
  height: 118px;
  .odos-ImageClassifyViewer-img-viewer-img {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .odos-ImageClassifyViewer-img-viewer-img-img {
      border-radius: 12px;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #e5e6eb;
      width: 100%;
      height: 97px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    img {
      //   width: 100%;
      max-width: 146px;
      max-height: 97px;
      // border-radius: 12px;
      object-fit: contain;
    }
    p {
      font-family: Alibaba PuHuiTi 3;
      font-size: 12px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: normal;
      /* 文字/2级 */
      color: #4e5969;
      margin: 0;
      padding: 0;
      text-align: center;
      width: 100%;
      height: 22px;
      box-sizing: border-box;
      line-height: 22px;
    }
  }
}
</style>
