<template>
  <div class="gufeng-wheel-picker">
    <button class="gufeng-picker-btn top-btn" @click="selectFirstItem" aria-label="滚到最上">
      <span class="gufeng-picker-btn-icon">▲</span>
    </button>
    <div
      class="gufeng-picker-container"
      ref="pickerContainer"
      @wheel="handleWheel"
      @mousedown="startDrag"
      @mousemove="handleDrag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
      @touchstart="startDragTouch"
      @touchmove="handleDragTouch"
      @touchend="endDrag"
    >
      <div class="picker-decoration top-decoration"></div>
      <div
        class="gufeng-picker-list"
        :style="{ transform: `translateY(${translateY}px)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="gufeng-picker-item"
          :class="{ 
            selected: selectedIndex === index,
            'near-selected': Math.abs(selectedIndex - index) === 1
          }"
          @click="selectItem(index)"
        >
          <span class="item-text">{{ item }}</span>
          <span class="item-unit">{{ unit }}</span>
        </div>
      </div>
      <div class="gufeng-picker-highlight">
        <div class="highlight-border top-border"></div>
        <div class="highlight-border bottom-border"></div>
        <div class="highlight-background"></div>
      </div>
      <div class="picker-decoration bottom-decoration"></div>
    </div>
    <button class="gufeng-picker-btn bottom-btn" @click="selectLastItem" aria-label="滚到最下">
      <span class="gufeng-picker-btn-icon">▼</span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick, defineProps, defineEmits } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: [String, Number], default: null },
  unit: { type: String, default: '' },
})

const emits = defineEmits(['update:modelValue', 'selected-change'])

const pickerContainer = ref(null)
const selectedIndex = ref(props.items.indexOf(props.modelValue) !== -1 ? props.items.indexOf(props.modelValue) : 0)
const translateY = ref(0)
const isDragging = ref(false)
const startY = ref(0)
const startTranslateY = ref(0)
const itemHeight = ref(40)
const containerHeight = ref(0)

watch(
  () => props.modelValue,
  (newValue) => {
    console.log('GufengWheelPicker: modelValue changed to', newValue, 'from', props.modelValue);
    const newIndex = props.items.indexOf(newValue)
    if (newIndex !== -1 && newIndex !== selectedIndex.value) {
      selectItem(newIndex)
    }
  },
  { immediate: true }
)

const selectItem = (index) => {
  if (index < 0 || index >= props.items.length) return
  selectedIndex.value = index
  emits('update:modelValue', props.items[index])
  emits('selected-change', props.items[index])
  const centerOffset = (containerHeight.value - itemHeight.value) / 2
  translateY.value = centerOffset - index * itemHeight.value
  console.log('GufengWheelPicker: selectedItem', props.items[index], 'at index', index, 'translateY', translateY.value);
}

const handleWheel = (event) => {
  event.preventDefault()
  const delta = Math.sign(event.deltaY)
  let newIndex = selectedIndex.value + delta
  newIndex = Math.max(0, Math.min(newIndex, props.items.length - 1))
  if (newIndex !== selectedIndex.value) {
    selectItem(newIndex)
  }
}

const startDrag = (event) => {
  isDragging.value = true
  startY.value = event.clientY
  startTranslateY.value = translateY.value
}

const handleDrag = (event) => {
  if (isDragging.value) {
    translateY.value = startTranslateY.value + (event.clientY - startY.value)
  }
}

const endDrag = () => {
  if (isDragging.value) {
    isDragging.value = false
    const centerOffset = (containerHeight.value - itemHeight.value) / 2
    const index = Math.round((centerOffset - translateY.value) / itemHeight.value)
    selectItem(index)
  }
}

// 触屏支持
const startDragTouch = (event) => {
  isDragging.value = true
  startY.value = event.touches[0].clientY
  startTranslateY.value = translateY.value
}

const handleDragTouch = (event) => {
  if (isDragging.value) {
    translateY.value = startTranslateY.value + (event.touches[0].clientY - startY.value)
  }
}

const selectFirstItem = () => selectItem(0)
const selectLastItem = () => selectItem(props.items.length - 1)

const updateItemHeight = () => {
  if (pickerContainer.value) {
    const firstItem = pickerContainer.value.querySelector('.gufeng-picker-item')
    if (firstItem) {
      itemHeight.value = firstItem.offsetHeight
    }
    containerHeight.value = pickerContainer.value.offsetHeight
    console.log('GufengWheelPicker: updateItemHeight called. itemHeight:', itemHeight.value, 'containerHeight:', containerHeight.value);
  }
}

onMounted(() => {
  console.log('GufengWheelPicker: onMounted called.');
  nextTick(() => {
    updateItemHeight()
    selectItem(selectedIndex.value)
  })
})
</script>

<style scoped>
.gufeng-wheel-picker {
  position: relative;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gufeng-picker-btn {
  width: 100%;
  height: 36px;
  background: linear-gradient(135deg, #8b6543, #a17d5d);
  border: none;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(139, 101, 67, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.gufeng-picker-btn:hover {
  background: linear-gradient(135deg, #a17d5d, #b89070);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 101, 67, 0.3);
}

.gufeng-picker-btn:active {
  transform: translateY(0);
}

.top-btn {
  margin-bottom: 4px;
  border-radius: 6px 6px 2px 2px;
}

.bottom-btn {
  margin-top: 4px;
  border-radius: 2px 2px 6px 6px;
}

.gufeng-picker-btn-icon {
  font-size: 1.1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.gufeng-picker-container {
  height: 240px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background: linear-gradient(to bottom, #f9f5ef, #f5efe5, #f9f5ef);
  border-radius: 8px;
  border: 1px solid #d9c7b3;
  box-shadow: 
    inset 0 2px 4px rgba(139, 101, 67, 0.1),
    0 2px 12px rgba(139, 101, 67, 0.15);
  user-select: none;
}

.picker-decoration {
  position: absolute;
  left: 0;
  right: 0;
  height: 20px;
  z-index: 3;
  pointer-events: none;
}

.top-decoration {
  top: 0;
  background: linear-gradient(to bottom, 
    rgba(249, 245, 239, 0.9) 0%, 
    rgba(249, 245, 239, 0.7) 50%, 
    transparent 100%);
  border-radius: 8px 8px 0 0;
}

.bottom-decoration {
  bottom: 0;
  background: linear-gradient(to top, 
    rgba(249, 245, 239, 0.9) 0%, 
    rgba(249, 245, 239, 0.7) 50%, 
    transparent 100%);
  border-radius: 0 0 8px 8px;
}

.gufeng-picker-list {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 20px 0;
}

.gufeng-picker-item {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #8b6543;
  font-family: "SimSun", "宋体", serif;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 6px;
  margin: 0 8px;
  position: relative;
  gap: 0.2rem;
}

.gufeng-picker-item:hover {
  background: rgba(201, 167, 124, 0.1);
}

.gufeng-picker-item.near-selected {
  color: #a17d5d;
  font-size: 1.05rem;
}

.gufeng-picker-item.selected {
  color: #3a2921;
  font-weight: bold;
  font-size: 1.2rem;
  background: rgba(201, 167, 124, 0.15);
  box-shadow: 0 2px 8px rgba(139, 101, 67, 0.1);
  transform: scale(1.05);
}

.item-text {
  font-weight: inherit;
}

.item-unit {
  font-size: 0.9em;
  opacity: 0.8;
  margin-left: 0.1rem;
}

.gufeng-picker-highlight {
  position: absolute;
  left: 8px;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  pointer-events: none;
  z-index: 2;
  border-radius: 6px;
}

.highlight-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(201, 167, 124, 0.08) 0%, 
    rgba(139, 101, 67, 0.05) 50%, 
    rgba(201, 167, 124, 0.08) 100%);
  border-radius: 6px;
}

.highlight-border {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(201, 167, 124, 0.6) 20%, 
    rgba(139, 101, 67, 0.8) 50%, 
    rgba(201, 167, 124, 0.6) 80%, 
    transparent 100%);
}

.top-border {
  top: 0;
}

.bottom-border {
  bottom: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .gufeng-wheel-picker {
    width: 70px;
  }
  
  .gufeng-picker-container {
    height: 200px;
  }
  
  .gufeng-picker-item {
    height: 35px;
    font-size: 1rem;
  }
  
  .gufeng-picker-item.selected {
    font-size: 1.1rem;
  }
  
  .gufeng-picker-btn {
    height: 32px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .gufeng-wheel-picker {
    width: 60px;
  }
  
  .gufeng-picker-container {
    height: 180px;
  }
  
  .gufeng-picker-item {
    height: 30px;
    font-size: 0.9rem;
    margin: 0 4px;
  }
  
  .gufeng-picker-item.selected {
    font-size: 1rem;
  }
  
  .gufeng-picker-btn {
    height: 28px;
    font-size: 0.8rem;
  }
  
  .highlight-border {
    height: 0.5px;
  }
}
</style>
