<template>
  <div class="gufeng-wheel-picker">
    <button class="gufeng-picker-btn" @click="selectFirstItem" aria-label="滚到最上">
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
      <div
        class="gufeng-picker-list"
        :style="{ transform: `translateY(${translateY}px)` }"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          class="gufeng-picker-item"
          :class="{ selected: selectedIndex === index }"
          @click="selectItem(index)"
        >
          {{ item }}{{ unit }}
        </div>
      </div>
      <div class="gufeng-picker-highlight"></div>
    </div>
    <button class="gufeng-picker-btn" @click="selectLastItem" aria-label="滚到最下">
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
const itemHeight = ref(36)
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
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.gufeng-picker-btn {
  width: 100%;
  height: 32px;
  background: none;
  border: none;
  color: #b03a2e;
  font-size: 1.2em;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.18s;
}
.gufeng-picker-btn-icon {
  font-size: 1.2em;
  color: #e9c46a;
}
.gufeng-picker-container {
  height: 216px; /* 36*6 */
  width: 100%;
  overflow: hidden;
  position: relative;
  background: #fffbe6;
  border-radius: 12px;
  border: 1.5px solid #e9c46a;
  box-shadow: 0 2px 12px #e9c46a22;
  margin: 2px 0;
  user-select: none;
}
.gufeng-picker-list {
  transition: transform 0.18s cubic-bezier(.4,0,.2,1);
}
.gufeng-picker-item {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.08rem;
  color: #7c4a02;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
  cursor: pointer;
  transition: color 0.18s, background 0.18s;
  border-radius: 8px;
  margin: 0;
  background: none;
}
.gufeng-picker-item.selected {
  color: #b9452d;
  font-weight: normal;
  background: none;
  box-shadow: none;
}
.gufeng-picker-highlight {
  position: absolute;
  left: 0; right: 0;
  top: 90px; /* (216-36)/2 */
  height: 36px;
  border-top: 1.5px solid #e9c46a;
  border-bottom: 1.5px solid #e9c46a;
  pointer-events: none;
  z-index: 2;
}
</style> 