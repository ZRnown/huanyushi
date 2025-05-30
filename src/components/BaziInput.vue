<template>
    <div class="bazi-bg">
        <div class="bazi-main">
            <div class="bazi-panel">
                <h2 class="bazi-title">八字输入</h2>
                <div class="bazi-tabs">
                    <button v-for="tab in tabs" :key="tab.value" :class="['bazi-tab', { active: tab.value === inputType }]"
                        @click="inputType = tab.value">{{ tab.label }}</button>
                </div>
                <div class="bazi-form">
                    <template v-if="inputType === 'ai'">
                        <label>请输入任意文字让AI识别：</label>
                        <textarea v-model="aiText" class="ai-textarea" rows="4"
                            placeholder="请输入出生信息、地点、性别、姓名等，格式不限"></textarea>
                        <div class="bazi-examples">
                            <div class="bazi-example-title">Example:</div>
                            <div class="bazi-example">1989/12/13 21:00, new york, female, Sweet</div>
                            <div class="bazi-example">1997年二月十九 12:00, 上海, 女, 丽丽</div>
                            <div class="bazi-example">丙戌 甲午 己未 庚午, 男, 董王</div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="bazi-form-col">
                            <input type="text" v-model="userName" class="bazi-extra-input" placeholder="姓名（可选）" />
                            <div class="bazi-gender">
                                <span>性别：</span>
                                <label><input type="radio" value="男" v-model="gender" /> 男</label>
                                <label><input type="radio" value="女" v-model="gender" /> 女</label>
                            </div>
                            <div class="bazi-date-row">
                                <div class="bazi-date-picker long" @click="showDatePicker = true"
                                    v-if="inputType === 'solar'">
                                    <span class="calendar-icon">📅</span>
                                    <span v-if="solarDisplay">{{ solarDisplay }}</span>
                                    <span v-else class="placeholder">请选择出生时间（公历）</span>
                                </div>
                                <div class="bazi-date-picker long" @click="showDatePicker = true"
                                    v-if="inputType === 'lunar'">
                                    <span class="calendar-icon">📅</span>
                                    <span v-if="lunarDisplay">{{ lunarDisplay }}</span>
                                    <span v-else class="placeholder">请选择出生时间（农历）</span>
                                </div>
                                <div class="bazi-date-picker long" v-else-if="inputType === 'bazi'" @click="showBaziPicker = true">
                                    <span class="calendar-icon">📅</span>
                                    <span v-if="baziYear && baziMonth && baziDay && baziHour">
                                        {{ baziYear }}年 {{ baziMonth }}月 {{ baziDay }}日 {{ baziHour }}时
                                    </span>
                                    <span v-else class="placeholder">请选择四柱八字</span>
                                </div>
                            </div>
                            <input type="text" v-model="address" class="bazi-extra-input" placeholder="出生地（可选）" />
                        </div>
                        <div v-if="showDatePicker && inputType === 'solar'" class="date-picker-modal">
                            <div class="date-picker-panel">
                                <h2 class="bazi-picker-title">选择公历生日</h2>
                                <div class="bazi-picker-columns" style="gap: 18px;">
                                    <GufengWheelPicker :items="solarYears" v-model="solarYear" unit="年" style="flex:1;" />
                                    <GufengWheelPicker :items="solarMonths" v-model="solarMonth" unit="月" style="flex:1;" />
                                    <GufengWheelPicker :items="solarDays" v-model="solarDay" unit="日" style="flex:1;" />
                                    <GufengWheelPicker :items="solarHours" v-model="solarHour" unit="时" style="flex:1;" />
                                    <GufengWheelPicker :items="solarMinutes" v-model="solarMinute" unit="分" style="flex:1;" />
                                </div>
                                <div class="bazi-picker-actions">
                                    <button @click="showDatePicker = false">取消</button>
                                    <button @click="onSolarConfirm">确认</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="showDatePicker && inputType === 'lunar'" class="date-picker-modal">
                            <div class="date-picker-panel">
                                <h2 class="bazi-picker-title">选择农历生日</h2>
                                <div class="bazi-picker-columns" style="gap: 18px;">
                                    <GufengWheelPicker :items="lunarYears" v-model="lunarYear" unit="年" style="flex:1;" />
                                    <GufengWheelPicker :items="lunarMonths" v-model="lunarMonth" unit="月" style="flex:1;" />
                                    <GufengWheelPicker :items="lunarDays" v-model="lunarDay" unit="日" style="flex:1;" />
                                    <GufengWheelPicker :items="lunarHours" v-model="lunarHour" unit="时" style="flex:1;" />
                                    <GufengWheelPicker :items="lunarMinutes" v-model="lunarMinute" unit="分" style="flex:1;" />
                                </div>
                                <div class="bazi-picker-actions">
                                    <button @click="showDatePicker = false">取消</button>
                                    <button @click="onLunarConfirm">确认</button>
                                </div>
                            </div>
                        </div>
                        <div v-if="showBaziPicker" class="bazi-picker-modal">
                          <div class="bazi-picker-panel">
                            <h2 class="bazi-picker-title">选择四柱八字</h2>
                            <div class="bazi-picker-columns" style="gap: 18px;">
                              <GufengWheelPicker :items="ganzhiList" v-model="baziYear" unit="年" style="flex:1;" />
                              <GufengWheelPicker :items="ganzhiList" v-model="baziMonth" unit="月" style="flex:1;" />
                              <GufengWheelPicker :items="ganzhiList" v-model="baziDay" unit="日" style="flex:1;" />
                              <GufengWheelPicker :items="ganzhiList" v-model="baziHour" unit="时" style="flex:1;" />
                            </div>
                            <div class="bazi-picker-actions">
                              <button @click="showBaziPicker = false">取消</button>
                              <button @click="onBaziConfirm">确认</button>
                            </div>
                          </div>
                        </div>
                    </template>
                    <button class="bazi-btn" @click="onAnalyze">开始分析</button>
                </div>
            </div>
            <div class="bazi-disclaimer">
                <span class="disclaimer-icon">&#9432;</span>
                平台所有产品拒绝向未成年人提供服务，仅供娱乐和参考。
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
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

// 日期选择器相关
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
const solarYears = Array.from({ length: now.getFullYear() }, (_, i) => i + 1)
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

const lunarYears = Array.from({ length: now.getFullYear() }, (_, i) => i + 1)
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

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate()
}
// 初始化天数
solarDays.value = Array.from({ length: getDaysInMonth(solarYear.value, solarMonth.value) }, (_, i) => i + 1)
lunarDays.value = Array.from({ length: getDaysInMonth(lunarYear.value, lunarMonth.value) }, (_, i) => i + 1)
// 监听公历年月变化
watch([solarYear, solarMonth], ([y, m]) => {
  const days = getDaysInMonth(y, m)
  solarDays.value = Array.from({ length: days }, (_, i) => i + 1)
  if (solarDay.value > days) solarDay.value = days
})
// 监听农历年月变化（此处仍用公历算法，后续如需农历闰月等可扩展）
watch([lunarYear, lunarMonth], ([y, m]) => {
  const days = getDaysInMonth(y, m)
  lunarDays.value = Array.from({ length: days }, (_, i) => i + 1)
  if (lunarDay.value > days) lunarDay.value = days
})

function onSolarConfirm() {
  solarDisplay.value = `${solarYear.value}年${solarMonth.value}月${solarDay.value}日 ${solarHour.value}:${solarMinute.value}`
  showDatePicker.value = false
}
function onLunarConfirm() {
  lunarDisplay.value = `${lunarYear.value}年${lunarMonth.value}月${lunarDay.value}日 ${lunarHour.value}:${lunarMinute.value}`
  showDatePicker.value = false
}

// 四柱八字弹窗相关
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
function onBaziConfirm() {
  showBaziPicker.value = false
}

function onAnalyze() {
    // 这里只做占位，后续可实现分析逻辑
    alert('分析功能暂未开放，后续上线！')
}
</script>

<style scoped>
.bazi-bg {
    min-height: 100vh;
    min-width: 100vw;
    max-width: 100vw;
    max-height: 100vh;
    background: linear-gradient(120deg, #f5f5f0 60%, #e9e7df 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    overflow: hidden;
    box-sizing: border-box;
}

.bazi-main {
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
}

.bazi-panel {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid #e9c46a;
    border-radius: 10px;
    box-shadow: 0 8px 32px rgba(180, 58, 46, 0.08);
    padding: 2rem 1.5rem 1.5rem 1.5rem;
    min-width: 320px;
    max-width: 98vw;
    max-height: 98vh;
    text-align: center;
    position: relative;
    margin: 0 auto;
    overflow: hidden;
    box-sizing: border-box;
}

.bazi-title {
    font-size: 2.2rem;
    color: #b03a2e;
    margin-bottom: 1.2rem;
    letter-spacing: 0.18em;
    text-shadow: 0 2px 12px #e9c46a33;
}

.bazi-tabs {
    display: flex;
    justify-content: center;
    gap: 18px;
    margin-bottom: 1.5rem;
}

.bazi-tab {
    font-family: inherit;
    font-size: 1.08rem;
    color: #314a43;
    background: none;
    border: none;
    border-bottom: 2.5px solid transparent;
    padding: 0.3em 1.2em 0.3em 1.2em;
    cursor: pointer;
    transition: color 0.2s, border 0.2s;
}

.bazi-tab.active {
    color: #b03a2e;
    border-bottom: 2.5px solid #e9c46a;
    font-weight: bold;
}

.bazi-form {
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.1rem;
}

.bazi-form-col {
    display: flex;
    flex-direction: column;
    gap: 1.1em;
    align-items: stretch;
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
}

.bazi-date-row {
    display: flex;
    gap: 0.7em;
    margin: 0.7em 0;
    align-items: center;
    justify-content: center;
}

.bazi-date-picker {
    min-width: 320px;
    max-width: 600px;
    width: 100%;
    padding: 0.6em 1em;
    border: 1.5px solid #e9c46a;
    border-radius: 1.2em;
    background: #fdf6ec;
    color: #7c4a02;
    font-size: 1.1rem;
    cursor: pointer;
    text-align: left;
    transition: border 0.2s;
    display: flex;
    align-items: center;
}

.bazi-date-picker.long {
    min-width: 420px;
    max-width: 600px;
}

.bazi-date-picker:hover {
    border-color: #b03a2e;
}

.bazi-date-picker .placeholder {
    color: #b3b3b3;
    font-size: 1.1rem;
    font-weight: normal;
    letter-spacing: 0.02em;
    text-align: left;
}

.calendar-icon {
    font-size: 1.3em;
    margin-right: 0.7em;
    color: #e9c46a;
}

.bazi-bazi-input {
    border: none;
    background: transparent;
    outline: none;
    font-size: 1.1rem;
    color: #7c4a02;
    width: 90%;
}

.bazi-bazi-input::placeholder {
    color: #b3b3b3;
}

.date-picker-modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.18);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.date-picker-panel {
    background: #fffbe6;
    border: 2px solid #e9c46a;
    border-radius: 18px;
    padding: 1.5em 2em;
    min-width: 520px;
    max-width: 700px;
    box-shadow: 0 8px 32px rgba(180, 58, 46, 0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.picker-row {
    display: flex;
    gap: 1em;
    margin-bottom: 1.2em;
}

.picker-row select {
    font-size: 1.1rem;
    padding: 0.3em 1em;
    border-radius: 8px;
    border: 1.5px solid #e9c46a;
    background: #fdf6ec;
    color: #7c4a02;
    outline: none;
    transition: border 0.2s;
}

.picker-row select:focus {
    border-color: #b03a2e;
}

.picker-actions {
    display: flex;
    gap: 1.5em;
}

.picker-actions button {
    font-size: 1.08rem;
    padding: 0.4em 1.5em;
    border-radius: 1.2em;
    border: none;
    background: linear-gradient(90deg, #e9c46a 0%, #fffbe6 100%);
    color: #7c4a02;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
}

.picker-actions button:hover {
    background: linear-gradient(90deg, #fffbe6 0%, #e9c46a 100%);
    color: #b03a2e;
}

.bazi-gender {
    display: flex;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.2em;
}

.bazi-extra-input {
    padding: 0.4em 1.2em;
    background: #fdf6ec;
    color: #7c4a02;
    outline: none;
    transition: border 0.2s;
    margin-bottom: 0.2em;
}

.bazi-extra-input:focus {
    border-color: #b03a2e;
}

.bazi-btn {
    margin-top: 1.2em;
    padding: 0.7em 2.5em;
    background: linear-gradient(90deg, #e9c46a 0%, #fffbe6 100%);
    color: #7c4a02;
    border: none;
    border-radius: 2em;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 1;
    box-shadow: 0 2px 12px rgba(180, 58, 46, 0.08);
    transition: background 0.2s, color 0.2s;
}

.bazi-btn:hover {
    background: linear-gradient(90deg, #fffbe6 0%, #e9c46a 100%);
    color: #b03a2e;
}

.bazi-tip {
    color: #b03a2e;
    font-size: 0.98rem;
    margin-top: 0.3em;
}

:global(html),
:global(body) {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    background: none;
    overflow: hidden;
}

.ai-textarea {
    width: 100%;
    min-width: 220px;
    max-width: 420px;
    min-height: 72px;
    font-size: 1.05rem;
    border-radius: 1.2em;
    border: 2px solid #e9c46a;
    background: #fff;
    color: #314a43;
    padding: 0.8em 1em;
    outline: none;
    transition: border 0.2s, box-shadow 0.2s;
    resize: none;
    box-shadow: 0 2px 8px 0 rgba(180,58,46,0.07);
    margin-bottom: 0.5em;
}

.ai-textarea:focus,
.ai-textarea:hover {
    border-color: #b03a2e;
    box-shadow: 0 6px 24px 0 rgba(176, 58, 46, 0.13);
}

.bazi-examples {
    margin-top: 0.5em;
    font-family:  'STSong', serif;
    text-align: left;
    width: 100%;
    max-width: 420px;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0.2em;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
}

.bazi-example-title {
    color: #b03a2e;
    font-size: 1.02rem;
    margin-bottom: 0.2em;
}

.bazi-example {
    color: #314a43;
    font-size: 1.01rem;
    background: #fffbe6;
    border-radius: 6px;
    padding: 0.2em 0.7em;
    margin-bottom: 0.1em;
    display: block;
    width: fit-content;
}

.bazi-disclaimer {
    width: 100vw;
    text-align: center;
    margin-top: 2.2em;
    color: #888;
    font-size: 0.92rem;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0.04em;
    font-family: inherit;
}

.disclaimer-icon {
    display: inline-block;
    font-size: 1.1em;
    color: #e9c46a;
    margin-right: 0.5em;
    font-weight: bold;
}

.bazi-picker-modal {
  position: fixed; left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18); z-index: 1000;
  display: flex; align-items: center; justify-content: center;
}
.bazi-picker-panel {
  background: #fffbe6;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(180, 58, 46, 0.12);
  padding: 2em 2.5em 1.5em 2.5em;
  min-width: 380px;
  animation: fadeIn 0.22s;
}
.bazi-picker-title {
  font-size: 1.18rem;
  color: #b03a2e;
  text-align: center;
  margin-bottom: 1em;
  letter-spacing: 0.12em;
}
.bazi-picker-columns {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2em;
  margin: 1.2em 0;
}
.bazi-picker-col {
  max-height: 200px; overflow-y: scroll; scroll-snap-type: y mandatory;
  background: #fdf6ec;
  border-radius: 10px;
  box-shadow: 0 2px 8px #e9c46a22;
  padding: 0.3em 0.1em;
}
.bazi-picker-item {
  height: 34px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; scroll-snap-align: center;
  color: #7c4a02; font-size: 1.08rem;
  border-radius: 8px; margin: 2px 0;
  transition: background 0.18s, color 0.18s;
}
.bazi-picker-item.active, .bazi-picker-item:hover {
  background: linear-gradient(90deg, #fffbe6 0%, #e9c46a 100%);
  color: #b03a2e;
}
.bazi-picker-actions {
  display: flex; justify-content: space-between; margin-top: 1.2em;
}
.bazi-picker-actions button {
  font-size: 1.08rem; padding: 0.4em 1.5em; border-radius: 1.2em;
  border: none; background: linear-gradient(90deg, #e9c46a 0%, #fffbe6 100%);
  color: #7c4a02; cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.bazi-picker-actions button:hover {
  background: linear-gradient(90deg, #fffbe6 0%, #e9c46a 100%);
  color: #b03a2e;
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>