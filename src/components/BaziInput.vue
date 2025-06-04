<template>
  <div class="bazi-container">
    <div class="bazi-panel">
      <h2 class="bazi-title">八字分析</h2>
      
      <!-- 标签页 -->
      <div class="bazi-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.value" 
          :class="['bazi-tab', { active: tab.value === inputType }]"
          @click="inputType = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 表单内容 -->
      <div class="bazi-form">
        <template v-if="inputType === 'ai'">
          <div class="form-group">
            <div class="input-wrapper">
              <textarea 
                v-model="aiText" 
                class="ai-textarea" 
                rows="4"
                placeholder="请输入您的出生信息，如：1998年7月23日7点28分，江苏，女，若冰"
              ></textarea>
              <div class="input-decoration"></div>
            </div>
            <div class="bazi-examples">
              <div class="examples-title">示例格式</div>
              <div class="example-list">
                <div class="bazi-example">1989/12/13 21:00, new york, female, Sweet</div>
                <div class="bazi-example">1997年二月十九 12:00, 上海, 女, 丽丽</div>
                <div class="bazi-example">丙戌 甲午 己未 庚午, 男, 董王</div>
              </div>
            </div>
          </div>
        </template>
        
        <template v-else>
          <div class="form-group">
            <!-- 姓名输入 -->
            <div class="input-group">
              <div class="input-wrapper">
                <div class="input-icon">👤</div>
                <input 
                  type="text" 
                  v-model="userName" 
                  class="form-input" 
                  placeholder="请输入姓名（可选）" 
                />
                <div class="input-decoration"></div>
              </div>
            </div>

            <!-- 日期选择 -->
            <div class="input-group">
              <div class="input-wrapper">
                <div class="input-icon">📅</div>
                <div class="date-selector" @click="showDatePicker = true">
                  <div class="date-display">
                    <span v-if="getDisplayDate()" class="date-text">{{ getDisplayDate() }}</span>
                    <span v-else class="date-placeholder">{{ getDatePlaceholder() }}</span>
                  </div>
                </div>
                <div class="input-decoration"></div>
              </div>
            </div>

            <!-- 出生地输入 -->
            <div class="input-group">
              <div class="input-wrapper">
                <div class="input-icon">📍</div>
                <input 
                  type="text" 
                  v-model="address" 
                  class="form-input" 
                  placeholder="请输入出生地（可选）" 
                />
                <div class="input-decoration"></div>
              </div>
            </div>

            <!-- 性别选择 - 阴阳鱼设计 -->
            <div class="input-group">
              <div class="gender-section">
                <div class="gender-label">
                  <span class="label-icon">⚊</span>
                  <span class="label-text">性别选择</span>
                </div>
                <div class="yinyang-container">
                  <div class="yinyang-wrapper" @click="toggleGender">
                    <div class="yinyang-circle" :class="{ 'rotate-to-female': gender === '女' }">
                      <!-- 阴阳鱼主体 -->
                      <div class="yinyang-main">
                        <div class="yang-half"></div>
                        <div class="yin-half"></div>
                        <div class="yang-dot"></div>
                        <div class="yin-dot"></div>
                      </div>
                      <!-- 装饰粒子 -->
                      <div class="particle" v-for="i in 8" :key="i" :style="getParticleStyle(i)"></div>
                    </div>
                    <!-- 性别标签 -->
                    <div class="gender-labels">
                      <div class="gender-label-item yang-label" :class="{ active: gender === '男' }">
                        <span class="label-symbol">乾</span>
                        <span class="label-name">男</span>
                      </div>
                      <div class="gender-label-item yin-label" :class="{ active: gender === '女' }">
                        <span class="label-symbol">坤</span>
                        <span class="label-name">女</span>
                      </div>
                    </div>
                  </div>
                  <!-- 选择提示 -->
                  <div class="gender-hint">
                    <span class="hint-text">点击阴阳鱼选择性别</span>
                    <div class="hint-arrow">↑</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 日期选择器模态框 -->
          <div v-if="showDatePicker" class="date-picker-modal" @click.self="showDatePicker = false">
            <div class="date-picker-panel">
              <h3 class="picker-title">{{ getPickerTitle() }}</h3>
              
              <div class="picker-content">
                <div class="picker-columns">
                  <template v-if="inputType === 'solar'">
                    <GufengWheelPicker :items="solarYears" v-model="solarYear" unit="年" />
                    <GufengWheelPicker :items="solarMonths" v-model="solarMonth" unit="月" />
                    <GufengWheelPicker :items="solarDays" v-model="solarDay" unit="日" />
                    <GufengWheelPicker :items="solarHours" v-model="solarHour" unit="时" />
                    <GufengWheelPicker :items="solarMinutes" v-model="solarMinute" unit="分" />
                  </template>
                  <template v-else-if="inputType === 'lunar'">
                    <GufengWheelPicker :items="lunarYears" v-model="lunarYear" unit="年" />
                    <GufengWheelPicker :items="lunarMonths" v-model="lunarMonth" unit="月" />
                    <GufengWheelPicker :items="lunarDays" v-model="lunarDay" unit="日" />
                    <GufengWheelPicker :items="lunarHours" v-model="lunarHour" unit="时" />
                    <GufengWheelPicker :items="lunarMinutes" v-model="lunarMinute" unit="分" />
                  </template>
                  <template v-else-if="inputType === 'bazi'">
                    <GufengWheelPicker :items="ganzhiList" v-model="baziYear" unit="年" />
                    <GufengWheelPicker :items="ganzhiList" v-model="baziMonth" unit="月" />
                    <GufengWheelPicker :items="ganzhiList" v-model="baziDay" unit="日" />
                    <GufengWheelPicker :items="ganzhiList" v-model="baziHour" unit="时" />
                  </template>
                </div>
              </div>

              <div class="picker-actions">
                <button @click="onCancel" class="action-btn cancel-btn">取消</button>
                <button @click="onConfirm" class="action-btn confirm-btn">
                  <span class="btn-text">确认</span>
                  <div class="btn-seal">✓</div>
                </button>
              </div>
            </div>
          </div>
        </template>

        <!-- 分析按钮 -->
        <div class="analyze-section">
          <button 
            class="analyze-btn"
            :class="{ disabled: analyzeDisabled }"
            :disabled="analyzeDisabled"
            @click="onAnalyze"
          >
            <div class="btn-background"></div>
            <div class="btn-content">
              <span class="btn-text">开始分析</span>
              <div class="btn-ornament">
                <div class="ornament-symbol">卜</div>
              </div>
            </div>
            <div class="btn-glow"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- 免责声明 -->
    <div class="bazi-disclaimer">
      <span class="disclaimer-icon">⚠</span>
      <span class="disclaimer-text">平台所有产品拒绝向未成年人提供服务，仅供娱乐和参考</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import GufengWheelPicker from './GufengWheelPicker.vue'

const tabs = [
  { label: 'AI识别', value: 'ai' },
  { label: '公历生日', value: 'solar' },
  { label: '农历生日', value: 'lunar' },
  { label: '四柱八字', value: 'bazi' }
]

const inputType = ref('ai')
const aiText = ref('')
const userName = ref('')
const address = ref('')
const gender = ref('男')
const showDatePicker = ref(false)

// 获取当前北京时间
function getBeijingNow() {
  const now = new Date()
  const bjOffset = 8 * 60
  const localOffset = now.getTimezoneOffset()
  const diff = bjOffset + localOffset
  return new Date(now.getTime() + diff * 60 * 1000)
}

const now = getBeijingNow()
const solarYears = Array.from({ length: now.getFullYear() - 1900 + 1 }, (_, i) => 1900 + i)
const solarMonths = Array.from({ length: 12 }, (_, i) => i + 1)
const solarHours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const solarMinutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

const solarYear = ref(now.getFullYear())
const solarMonth = ref(now.getMonth() + 1)
const solarDay = ref(now.getDate())
const solarHour = ref(now.getHours().toString().padStart(2, '0'))
const solarMinute = ref(now.getMinutes().toString().padStart(2, '0'))
const solarDisplay = ref('')
const solarDays = ref([])

const lunarYears = Array.from({ length: now.getFullYear() - 1900 + 1 }, (_, i) => 1900 + i)
const lunarMonths = Array.from({ length: 12 }, (_, i) => i + 1)
const lunarHours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'))
const lunarMinutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'))

const lunarYear = ref(now.getFullYear())
const lunarMonth = ref(now.getMonth() + 1)
const lunarDay = ref(now.getDate())
const lunarHour = ref(now.getHours().toString().padStart(2, '0'))
const lunarMinute = ref(now.getMinutes().toString().padStart(2, '0'))
const lunarDisplay = ref('')
const lunarDays = ref([])

const showBaziPicker = ref(false)
const baziYear = ref('')
const baziMonth = ref('')
const baziDay = ref('')
const baziHour = ref('')

const ganzhiList = [
  '甲子','乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉',
  '甲戌','乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛巳','壬午','癸未',
  '甲申','乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳',
  '甲午','乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸卯',
  '甲辰','乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑',
  '甲寅','乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥'
]

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}

// 初始化天数
solarDays.value = Array.from({ length: getDaysInMonth(solarYear.value, solarMonth.value) }, (_, i) => i + 1)
lunarDays.value = Array.from({ length: getDaysInMonth(lunarYear.value, lunarMonth.value) }, (_, i) => i + 1)

// 监听年月变化
watch([solarYear, solarMonth], ([y, m]) => {
  const days = getDaysInMonth(y, m)
  solarDays.value = Array.from({ length: days }, (_, i) => i + 1)
  if (solarDay.value > days) solarDay.value = days
})

watch([lunarYear, lunarMonth], ([y, m]) => {
  const days = getDaysInMonth(y, m)
  lunarDays.value = Array.from({ length: days }, (_, i) => i + 1)
  if (lunarDay.value > days) lunarDay.value = days
})

// 辅助函数
const getDateLabel = () => {
  const labels = {
    solar: '公历生日',
    lunar: '农历生日',
    bazi: '四柱八字'
  }
  return labels[inputType.value] || '出生时间'
}

const getDatePlaceholder = () => {
  const placeholders = {
    solar: '请选择公历出生时间',
    lunar: '请选择农历出生时间',
    bazi: '请选择四柱八字'
  }
  return placeholders[inputType.value] || '请选择时间'
}

const getDisplayDate = () => {
  if (inputType.value === 'solar') return solarDisplay.value
  if (inputType.value === 'lunar') return lunarDisplay.value
  if (inputType.value === 'bazi') {
    return baziYear.value && baziMonth.value && baziDay.value && baziHour.value
      ? `${baziYear.value}年 ${baziMonth.value}月 ${baziDay.value}日 ${baziHour.value}时`
      : ''
  }
  return ''
}

const getPickerTitle = () => {
  const titles = {
    solar: '选择公历生日',
    lunar: '选择农历生日',
    bazi: '选择四柱八字'
  }
  return titles[inputType.value] || '选择时间'
}

const onConfirm = () => {
  if (inputType.value === 'solar') {
    solarDisplay.value = `${solarYear.value}年${solarMonth.value}月${solarDay.value}日 ${solarHour.value}:${solarMinute.value}`
  } else if (inputType.value === 'lunar') {
    lunarDisplay.value = `${lunarYear.value}年${lunarMonth.value}月${lunarDay.value}日 ${lunarHour.value}:${lunarMinute.value}`
  }
  showDatePicker.value = false
}

const onCancel = () => {
  showDatePicker.value = false
}

const onAnalyze = () => {
  alert('分析功能正在开发中，敬请期待！')
}

const analyzeDisabled = computed(() => {
  if (inputType.value === 'ai') {
    return !aiText.value.trim()
  }
  if (inputType.value === 'solar') {
    return !solarDisplay.value
  }
  if (inputType.value === 'lunar') {
    return !lunarDisplay.value
  }
  if (inputType.value === 'bazi') {
    return !(baziYear.value && baziMonth.value && baziDay.value && baziHour.value)
  }
  return true
})

const toggleGender = () => {
  gender.value = gender.value === '男' ? '女' : '男'
}

const getParticleStyle = (index) => {
  const angle = (index * 45) * Math.PI / 180
  const radius = 60
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  return {
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    animationDelay: `${index * 0.2}s`
  }
}
</script>

<style scoped>
.bazi-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Noto Serif SC', 'STSong', 'SimSun', '霞鹜文楷', serif;
}

.bazi-panel {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e9c46a;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 10px 30px rgba(49, 74, 67, 0.1);
}

.bazi-title {
  font-size: 2.2rem;
  color: #b03a2e;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.1em;
}

/* 标签页 */
.bazi-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.bazi-tab {
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  color: #314a43;
  cursor: pointer;
  transition: all 0.3s ease;
}

.bazi-tab.active {
  color: #b03a2e;
  border-bottom: 2px solid #e9c46a;
  font-weight: bold;
}

.bazi-tab:hover:not(.active) {
  color: #c77f6a;
}

/* 表单区域 */
.bazi-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #314a43;
  pointer-events: none;
  z-index: 2;
}

.form-input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(233, 196, 106, 0.3);
  border-radius: 12px;
  background: #fff;
  color: #314a43;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
  text-align: left;
}

.ai-textarea {
  width: 100%;
  min-height: 120px;
  resize: vertical;
  padding: 1.2rem 1rem 1.2rem 1rem;
  border: 2px solid rgba(233, 196, 106, 0.3);
  border-radius: 12px;
  background: #fff;
  color: #314a43;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
  text-align: left;
}

.form-input:focus, .ai-textarea:focus {
  border-color: #e9c46a;
  box-shadow: 0 0 0 4px rgba(233, 196, 106, 0.15);
  transform: translateY(-2px);
}

.form-input::placeholder, .ai-textarea::placeholder {
  color: #999;
  font-style: italic;
  text-align: left;
}

.input-decoration {
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #e9c46a, transparent);
  border-radius: 2px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.form-input:focus + .input-decoration,
.ai-textarea:focus + .input-decoration {
  opacity: 1;
}

/* 示例区域 */
.bazi-examples {
  background: rgba(233, 196, 106, 0.05);
  border: 1px solid rgba(233, 196, 106, 0.2);
  border-radius: 8px;
  padding: 1rem;
}

.examples-title {
  font-size: 1rem;
  color: #b03a2e;
  font-weight: 600;
  margin-bottom: 0.8rem;
}

.example-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bazi-example {
  background: rgba(255, 251, 230, 0.8);
  border-left: 3px solid #e9c46a;
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  color: #314a43;
  font-size: 0.95rem;
}

/* 性别选择 - 阴阳鱼设计 */
.gender-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(233, 196, 106, 0.05);
  border: 1px solid rgba(233, 196, 106, 0.2);
  border-radius: 16px;
  position: relative;
  overflow: hidden;
}
.gender-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #dc3545, transparent);
}
.gender-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.label-icon {
  font-size: 1.2rem;
  color: #dc3545;
}
.label-text {
  font-size: 1.1rem;
  color: #314a43;
  font-weight: 600;
}
.yinyang-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.yinyang-wrapper {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.yinyang-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  overflow: visible;
}
.yinyang-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(220, 53, 69, 0.3);
}
.yinyang-circle.rotate-to-female {
  transform: rotate(180deg);
}
.yinyang-circle.rotate-to-female:hover {
  transform: rotate(180deg) scale(1.1);
}
.yinyang-main {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background: #fff;
  border: 3px solid #dc3545;
}
.yang-half {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 100px 0 0 100px;
}
.yin-half {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: #2c3e50;
  border-radius: 0 100px 100px 0;
}
.yang-half::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: #2c3e50;
  border-radius: 50%;
  transform: translateX(50%);
}
.yin-half::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  transform: translateX(-50%);
}
.yang-dot {
  position: absolute;
  top: 25%;
  right: 25%;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
  transform: translate(50%, -50%);
  z-index: 2;
}
.yin-dot {
  position: absolute;
  bottom: 25%;
  left: 25%;
  width: 12px;
  height: 12px;
  background: #2c3e50;
  border-radius: 50%;
  transform: translate(-50%, 50%);
  z-index: 2;
}
.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #dc3545;
  border-radius: 50%;
  animation: particleFloat 3s infinite ease-in-out;
  opacity: 0.7;
}
@keyframes particleFloat {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10px) scale(1.2);
    opacity: 1;
  }
}
.gender-labels {
  display: flex;
  gap: 2rem;
  margin-top: 0.5rem;
}
.gender-label-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
}
.gender-label-item.active {
  background: rgba(220, 53, 69, 0.1);
  transform: scale(1.05);
}
.yang-label.active {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
.yin-label.active {
  background: rgba(44, 62, 80, 0.1);
  box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
}
.label-symbol {
  font-size: 1.2rem;
  font-weight: bold;
  color: #314a43;
}
.yang-label.active .label-symbol {
  color: #dc3545;
}
.yin-label.active .label-symbol {
  color: #2c3e50;
}
.label-name {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}
.gender-label-item.active .label-name {
  color: #314a43;
  font-weight: 600;
}
.gender-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  opacity: 0.7;
}
.hint-text {
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
}
.hint-arrow {
  font-size: 1rem;
  color: #dc3545;
  animation: arrowBounce 2s infinite ease-in-out;
}
@keyframes arrowBounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* 日期选择样式与input统一 */
.date-selector {
  width: 100%;
}
.date-display {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid rgba(233, 196, 106, 0.3);
  border-radius: 12px;
  background: #fff;
  color: #314a43;
  font-size: 1.1rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
  text-align: left;
  min-height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.date-selector:focus-within .date-display,
.date-display:focus {
  border-color: #e9c46a;
  box-shadow: 0 0 0 4px rgba(233, 196, 106, 0.15);
  transform: translateY(-2px);
}

.date-text, .date-placeholder {
  color: #314a43;
  font-size: 1.1rem;
  text-align: left;
}
.date-placeholder {
  color: #999;
  font-style: italic;
}

/* 日期选择器模态框 */
.date-picker-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.date-picker-panel {
  background: #fffbe6;
  border: 2px solid #e9c46a;
  border-radius: 16px;
  padding: 2rem;
  max-width: 90vw;
  box-shadow: 0 20px 60px rgba(49, 74, 67, 0.2);
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateY(-20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

.picker-title {
  font-size: 1.4rem;
  color: #b03a2e;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.picker-content {
  margin-bottom: 1.5rem;
}

.picker-columns {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

/* 操作按钮 */
.picker-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.action-btn {
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-family: inherit;
}

.cancel-btn {
  background: #e5e5e5;
  color: #666;
}

.cancel-btn:hover {
  background: #d0d0d0;
}

.confirm-btn {
  background: #c77f6a;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-right: 1rem;
}

.confirm-btn:hover {
  background: #d9998a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(199, 127, 106, 0.3);
}

.btn-seal {
  width: 24px;
  height: 24px;
  background: #fff;
  color: #b03a2e;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}

.confirm-btn:hover .btn-seal {
  transform: rotate(5deg);
}

/* 分析按钮 */
.analyze-section {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.analyze-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.3s ease;
  overflow: hidden;
}

.analyze-btn.disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #c77f6a 0%, #d9998a 100%);
  border-radius: 30px;
  box-shadow: 0 6px 20px rgba(199, 127, 106, 0.3);
  transition: all 0.3s ease;
}

.analyze-btn:hover:not(.disabled) .btn-background {
  background: linear-gradient(135deg, #d9998a 0%, #e6b5a8 100%);
  box-shadow: 0 8px 25px rgba(199, 127, 106, 0.4);
}

.analyze-btn.disabled .btn-background {
  background: #e5e5e5;
  box-shadow: none;
}

.btn-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
  z-index: 2;
}

.btn-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 0.05em;
}

.analyze-btn.disabled .btn-text {
  color: #999;
}

.btn-ornament {
  width: 32px;
  height: 32px;
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: rotate(-5deg);
  transition: transform 0.3s ease;
}

.analyze-btn:hover:not(.disabled) .btn-ornament {
  transform: rotate(5deg);
}

.analyze-btn.disabled .btn-ornament {
  background: #f0f0f0;
  box-shadow: none;
}

.ornament-symbol {
  font-size: 1.2rem;
  color: #b03a2e;
  font-weight: bold;
}

.analyze-btn.disabled .ornament-symbol {
  color: #ccc;
}

.btn-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.6s ease;
}

.analyze-btn:active:not(.disabled) .btn-glow {
  width: 150px;
  height: 150px;
}

.analyze-btn:hover:not(.disabled) {
  transform: translateY(-3px);
}

.analyze-btn:active:not(.disabled) {
  transform: translateY(-1px);
}

/* 免责声明 */
.bazi-disclaimer {
  margin-top: 1.5rem;
  color: #666;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.disclaimer-icon {
  color: #e9c46a;
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .bazi-panel {
    padding: 2rem 1.5rem;
  }
  
  .bazi-title {
    font-size: 1.8rem;
  }
  
  .picker-columns {
    gap: 0.5rem;
  }
  
  .yinyang-circle {
    width: 80px;
    height: 80px;
  }
  
  .gender-labels {
    gap: 1.5rem;
  }
  
  .particle {
    display: none;
  }
}

@media (max-width: 480px) {
  .bazi-panel {
    padding: 1.5rem 1rem;
  }
  
  .bazi-title {
    font-size: 1.6rem;
  }
  
  .bazi-tabs {
    flex-wrap: wrap;
  }
  
  .picker-columns {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-content {
    padding: 0.7rem 1.5rem;
  }
  
  .btn-text {
    font-size: 1.1rem;
  }
}
</style>
