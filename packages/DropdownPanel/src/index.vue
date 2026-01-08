<template>
  <span ref="slotTriggerRef"><slot name="trigger" /></span>
  <teleport to="body">
    <div
      v-if="visible"
      class="odos-autopopup-panel"
      ref="panelRef"
      :style="panelStyle"
      role="dialog"
      aria-modal="false"
      @click.stop
    >
      <div class="odos-autopopup-content">
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, watch, ref, nextTick, type ComponentPublicInstance } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'close'): void
}>()

const props = defineProps<{
  modelValue?: boolean
  // 支持传入原生元素或Vue组件实例（从其$el解析）
  triggerEl?: HTMLElement | (ComponentPublicInstance & { $el?: HTMLElement }) | null
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  offsetX?: number
  offsetY?: number
  zIndex?: number
  maxWidth?: string | number
  maxHeight?: string | number
  fitWidth?: boolean
  trigger?: 'hover' | 'click'
  hoverCloseDelay?: number
}>()
// 受控模式下，visible 由 modelValue 控制；非受控模式下，visible 由 innerVisible 控制
const controlled = computed(() => !!props.modelValue)
// 非受控模式下，visible 由 innerVisible 控制
const innerVisible = ref(false)
// visible 由 controlled 模式和 innerVisible 控制
const visible = computed(() => {
  if (controlled.value) {
    return !!props.modelValue
  } else {
    return innerVisible.value
  }
})
// setVisible 方法根据 controlled 模式来更新 visible 值
const setVisible = (v: boolean) => {
  if (controlled.value) {
    emit('update:modelValue', v)
  } else {
    innerVisible.value = v
  }
}
// z-index 由 props.zIndex 控制，默认值为 1000
const zIndex = computed(() => props.zIndex ?? 1000)
// panelStyle 由 zIndex 控制
const panelStyle = ref<Record<string, string>>({
  zIndex: String(zIndex.value)
})
// placement 由 props.placement 控制，默认值为 'bottom-start'
const placement = computed(() => props.placement ?? 'bottom-start')
// offsetX 由 props.offsetX 控制，默认值为 0
const offsetX = computed(() => props.offsetX ?? 0)
// offsetY 由 props.offsetY 控制，默认值为 4
const offsetY = computed(() => props.offsetY ?? 4)
// fitWidth 由 props.fitWidth 控制，默认值为 true
const fitWidth = computed(() => props.fitWidth ?? true)
// triggerMode 由 props.trigger 控制，默认值为 'click'
const triggerMode = computed(() => props.trigger ?? 'click')
// slotTriggerRef 指向触发插槽元素
const slotTriggerRef = ref<HTMLElement | null>(null)
// panelRef 指向面板元素
const panelRef = ref<HTMLElement | null>(null)
// isTriggerHover 表示触发元素是否悬停
const isTriggerHover = ref(false)
// isPanelHover 表示面板元素是否悬停
const isPanelHover = ref(false)
// getTriggerEl 方法返回触发元素，先检查 props.triggerEl，再检查 slotTriggerRef
const getTriggerEl = (): HTMLElement | null => {
  const el = props.triggerEl
  if (el) {
    if (el instanceof HTMLElement) return el
    if ('$el' in el && el.$el && el.$el instanceof HTMLElement) return el.$el
  }
  return slotTriggerRef.value
}
// updatePosition 方法根据 placement、offsetX、offsetY、maxWidth、maxHeight 等属性更新面板位置
const updatePosition = () => {
  const trigger = getTriggerEl()
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: String(zIndex.value),
    maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth || 'auto',
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight || '50vh'
  }
  if (trigger) {
    // 计算触发元素的位置和尺寸
    const rect = trigger.getBoundingClientRect()
    // 计算面板元素的宽度
    const width = fitWidth.value ? rect.width : undefined
    // 计算面板元素的位置
    const xStart = rect.left + offsetX.value
    // 计算面板元素的右侧位置
    const xEnd = rect.right + offsetX.value
    // 计算面板元素的底部位置
    const yBottom = rect.bottom + offsetY.value
    // 计算面板元素的顶部位置
    const yTop = rect.top - offsetY.value
    // 根据 placement 计算面板元素的位置
    switch (placement.value) {
      case 'bottom-start':
        style.left = `${Math.round(xStart)}px`
        style.top = `${Math.round(yBottom)}px`
        break
      case 'bottom-end':
        style.left = `${Math.round(xEnd)}px`
        style.transform = 'translateX(-100%)'
        style.top = `${Math.round(yBottom)}px`
        break
      case 'top-start':
        style.left = `${Math.round(xStart)}px`
        style.top = `${Math.round(yTop)}px`
        style.transform = 'translateY(-100%)'
        break
      case 'top-end':
        style.left = `${Math.round(xEnd)}px`
        style.top = `${Math.round(yTop)}px`
        style.transform = 'translate(-100%, -100%)'
        break
    }
    if (width) style.minWidth = `${Math.round(width)}px`
  } else {
    // 如果没有触发元素，将面板元素定位到页面中心
    style.left = '50%'
    style.top = '50%'
    style.transform = 'translate(-50%, 0)'
  }
  panelStyle.value = style
}
// close 方法关闭面板，设置 visible 为 false 并触发 close 事件
const close = () => {
  setVisible(false)
  emit('close')
}
// onKeydown 方法处理键盘事件，当按下 ESC 键时关闭面板
const onKeydown = () => {
  if (!visible.value) {
    return
  }
}
// checkHoverClose 方法检查是否悬停关闭面板
let cleanupListeners: (() => void) | null = null
// checkHoverClose 方法检查是否悬停关闭面板
const checkHoverClose = () => {
  if (triggerMode.value === 'hover' && !isTriggerHover.value && !isPanelHover.value) {
    close()
  }
}
// setupTriggerListeners 方法设置触发元素的事件监听器
const hoverCloseDelay = typeof props.hoverCloseDelay === 'number' ? props.hoverCloseDelay : 300
const setupTriggerListeners = () => {
  if (cleanupListeners) {
    cleanupListeners()
    cleanupListeners = null
  }
  if (props.triggerEl) return
  const el = slotTriggerRef.value
  if (!el) return
  if (triggerMode.value === 'click') {
    const onClick = () => setVisible(!visible.value)
    el.addEventListener('click', onClick)
    cleanupListeners = () => {
      el.removeEventListener('click', onClick)
    }
  } else {
    const onEnterTrigger = () => {
      isTriggerHover.value = true
      setVisible(true)
    }
    const onLeaveTrigger = () => {
      isTriggerHover.value = false
      setTimeout(checkHoverClose, hoverCloseDelay)
    }
    el.addEventListener('mouseenter', onEnterTrigger)
    el.addEventListener('mouseleave', onLeaveTrigger)
    const panel = panelRef.value
    const onEnterPanel = () => {
      isPanelHover.value = true
    }
    const onLeavePanel = () => {
      isPanelHover.value = false
      setTimeout(checkHoverClose, hoverCloseDelay)
    }
    if (panel) {
      panel.addEventListener('mouseenter', onEnterPanel)
      panel.addEventListener('mouseleave', onLeavePanel)
    }
    cleanupListeners = () => {
      el.removeEventListener('mouseenter', onEnterTrigger)
      el.removeEventListener('mouseleave', onLeaveTrigger)
      if (panel) {
        panel.removeEventListener('mouseenter', onEnterPanel)
        panel.removeEventListener('mouseleave', onLeavePanel)
      }
    }
  }
}
// onMounted 方法在组件挂载时设置事件监听器
onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onViewport)
  window.addEventListener('scroll', onViewport, true)
  document.addEventListener('pointerdown', onPointerDown, true)
  setupTriggerListeners()
})
// onBeforeUnmount 方法在组件卸载前移除事件监听器
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onViewport)
  window.removeEventListener('scroll', onViewport, true)
  document.removeEventListener('pointerdown', onPointerDown, true)
  if (cleanupListeners) cleanupListeners()
})

// expose close method
defineExpose({ close })
// onViewport 方法在视口变化时更新面板位置
const onViewport = () => {
  if (visible.value) updatePosition()
}
// onPointerDown 方法在指针按下时检查是否点击了触发元素或面板元素
const onPointerDown = (e: Event) => {
  if (!visible.value) return
  const target = e.target as Node | null
  const panel = document.querySelector('.odos-autopopup-panel')
  const trigger = getTriggerEl()
  if (panel && !panel.contains(target as Node) && trigger && !trigger.contains(target as Node)) {
    close()
  }
}

watch(
  () => visible.value,
  async (v) => {
    if (v) {
      await nextTick()
      updatePosition()
      if (triggerMode.value === 'hover') setupTriggerListeners()
    }
  }
)

watch(
  () => props.triggerEl,
  () => {
    if (visible.value) updatePosition()
    setupTriggerListeners()
  }
)

watch(slotTriggerRef, () => {
  if (visible.value) updatePosition()
  setupTriggerListeners()
})

watch([panelRef, triggerMode], () => {
  setupTriggerListeners()
})
</script>

<style scoped lang="scss">
.odos-autopopup-panel {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  overflow: auto;
  border: 1px solid #e5e6eb;
}
</style>
