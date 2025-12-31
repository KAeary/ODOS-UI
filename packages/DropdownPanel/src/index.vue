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
  modelValue: boolean
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
}>()

const visible = computed(() => props.modelValue)
const zIndex = computed(() => props.zIndex ?? 1000)

const panelStyle = ref<Record<string, string>>({})
const placement = computed(() => props.placement ?? 'bottom-start')
const offsetX = computed(() => props.offsetX ?? 0)
const offsetY = computed(() => props.offsetY ?? 4)
const fitWidth = computed(() => props.fitWidth ?? true)
const triggerMode = computed(() => props.trigger ?? 'click')

const slotTriggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const isTriggerHover = ref(false)
const isPanelHover = ref(false)

const getTriggerEl = (): HTMLElement | null => {
  const el = props.triggerEl
  if (el) {
    if (el instanceof HTMLElement) return el
    if ('$el' in el && el.$el && el.$el instanceof HTMLElement) return el.$el
  }
  return slotTriggerRef.value
}

const updatePosition = () => {
  const trigger = getTriggerEl()
  const style: Record<string, string> = {
    position: 'fixed',
    zIndex: String(zIndex.value),
    maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth || 'auto',
    maxHeight: typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight || '50vh'
  }
  if (trigger) {
    const rect = trigger.getBoundingClientRect()
    const width = fitWidth.value ? rect.width : undefined
    const xStart = rect.left + offsetX.value
    const xEnd = rect.right + offsetX.value
    const yBottom = rect.bottom + offsetY.value
    const yTop = rect.top - offsetY.value
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
    style.left = '50%'
    style.top = '50%'
    style.transform = 'translate(-50%, 0)'
  }
  panelStyle.value = style
}

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onKeydown = () => {
  if (!visible.value) return
}

let cleanupListeners: (() => void) | null = null
const checkHoverClose = () => {
  if (triggerMode.value === 'hover' && !isTriggerHover.value && !isPanelHover.value) {
    close()
  }
}
const setupTriggerListeners = () => {
  if (cleanupListeners) {
    cleanupListeners()
    cleanupListeners = null
  }
  if (props.triggerEl) return
  const el = slotTriggerRef.value
  if (!el) return
  if (triggerMode.value === 'click') {
    const onClick = () => emit('update:modelValue', !visible.value)
    el.addEventListener('click', onClick)
    cleanupListeners = () => {
      el.removeEventListener('click', onClick)
    }
  } else {
    const onEnterTrigger = () => {
      isTriggerHover.value = true
      emit('update:modelValue', true)
    }
    const onLeaveTrigger = () => {
      isTriggerHover.value = false
      setTimeout(checkHoverClose, 0)
    }
    el.addEventListener('mouseenter', onEnterTrigger)
    el.addEventListener('mouseleave', onLeaveTrigger)
    const panel = panelRef.value
    const onEnterPanel = () => {
      isPanelHover.value = true
    }
    const onLeavePanel = () => {
      isPanelHover.value = false
      setTimeout(checkHoverClose, 0)
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

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onViewport)
  window.addEventListener('scroll', onViewport, true)
  document.addEventListener('pointerdown', onPointerDown, true)
  setupTriggerListeners()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onViewport)
  window.removeEventListener('scroll', onViewport, true)
  document.removeEventListener('pointerdown', onPointerDown, true)
  if (cleanupListeners) cleanupListeners()
})

defineExpose({ close })

const onViewport = () => {
  if (visible.value) updatePosition()
}

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
  () => props.modelValue,
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
