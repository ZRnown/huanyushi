<template>
  <div class="bazi-container">
    <!-- Header Section with Name and Birth Info -->
    <div class="bazi-header">
      <h1 class="bazi-name">{{ baziData.userName }}</h1>
      <div class="bazi-divider">
        <div class="divider-ornament"></div>
      </div>
      <div class="birth-details">
        <div class="birth-detail">
          <span class="detail-label">阴历</span>
          <span class="detail-value">{{ baziData.lunarDate }}</span>
        </div>
        <div class="birth-detail">
          <span class="detail-label">阳历</span>
          <span class="detail-value">{{ baziData.solarDate }}</span>
        </div>
        <div class="birth-detail">
          <span class="detail-label">性别</span>
          <span class="detail-value gender" :class="baziData.genderClass">
            {{ baziData.gender }}
          </span>
        </div>
      </div>
    </div>

    <!-- Main BaZi Chart -->
    <div class="bazi-chart">
      <div class="chart-header">
        <div class="header-cell">日期</div>
        <div class="header-cell">年柱</div>
        <div class="header-cell">月柱</div>
        <div class="header-cell">日柱</div>
        <div class="header-cell">时柱</div>
      </div>
      
      <!-- 主星行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>主星</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`zhuxing-${index}`">
          <span class="tiangan-relation">{{ pillar.tiangan.relation }}</span>
        </div>
      </div>
      
      <!-- 天干行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>天干</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`tiangan-${index}`">
          <span class="tiangan" :class="pillar.tiangan.element">{{ pillar.tiangan.char }}</span>
        </div>
      </div>
      
      <!-- 地支行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>地支</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`dizhi-${index}`">
          <span class="dizhi" :class="pillar.dizhi.element">{{ pillar.dizhi.char }}</span>
        </div>
      </div>
      
      <!-- 藏干行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>藏干</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`canggan-row-${index}`">
          <div class="canggan-container">
            <div v-for="(canggan, cgIndex) in pillar.canggan" :key="`canggan-row-item-${cgIndex}`" class="canggan-item">
              <span class="canggan-char" :class="canggan.element">{{ canggan.char }}</span>
              <span class="canggan-relation">{{ canggan.relation }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 星运行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>星运</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`xinyun-${index}`">
          <span class="xinyun">{{ pillar.xinyun }}</span>
        </div>
      </div>
      
      <!-- 自坐行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>自坐</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`zizuo-${index}`">
          <span class="zizuo">{{ pillar.zizuo }}</span>
        </div>
      </div>
      
      <!-- 空亡行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>空亡</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`kongwang-${index}`">
          <span class="kongwang">{{ pillar.kongwang }}</span>
        </div>
      </div>
      
      <!-- 纳音行 -->
      <div class="chart-row">
        <div class="row-label">
          <span>纳音</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`nayin-${index}`">
          <span class="nayin">{{ pillar.nayin }}</span>
        </div>
      </div>
      
      <!-- 神煞行 -->
      <div class="chart-row shensha-row">
        <div class="row-label">
          <span>神煞</span>
        </div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`shensha-${index}`">
          <div class="shensha-list">
            <div v-for="(shensha, sIndex) in pillar.shensha" :key="`shensha-item-${sIndex}`" class="shensha-item">
              {{ shensha }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 大运流年信息区块 -->
    <div class="fortune-section">
      <div class="fortune-header">
        <div class="fortune-title">大运流年</div>
        <div class="fortune-divider"></div>
      </div>
      
      <!-- 头部信息 -->
      <div class="fortune-info">
        <div class="fortune-info-item">
          <span class="info-icon">起</span>
          <span>出生后{{ dayunInfo.startYear }}年{{ dayunInfo.startMonth }}月{{ dayunInfo.startDay }}天{{ dayunInfo.startHour || '' }}时起运</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">交</span>
          <span>{{ dayunInfo.jiaoyun }}</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">空</span>
          <span>{{ dayunInfo.kongwang }}</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">岁</span>
          <span>{{ liunianList[selectedLiunianIndex] && liunianList[selectedLiunianIndex].age ? liunianList[selectedLiunianIndex].age : 1 }}岁</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">令</span>
          <span>司令:{{ dayunInfo.siling }}</span>
        </div>
      </div>
      
      <!-- 大运 -->
      <div class="fortune-scroll-container">
        <div class="fortune-scroll-label">大运</div>
        <div class="fortune-scroll">
          <div
            v-for="(yun, idx) in dayunList"
            :key="yun.startYear"
            class="fortune-item dayun-item"
            :class="{ 'fortune-item-selected': idx === selectedDayunIndex }"
            @click="selectDayun(idx)"
          >
            <div class="fortune-item-main">{{ yun.gan }}{{ yun.zhi }}</div>
            <div class="fortune-item-sub">{{ yun.startYear }}年/{{ yun.startAge }}岁</div>
          </div>
        </div>
      </div>
      
      <!-- 流年 -->
      <div class="fortune-scroll-container">
        <div class="fortune-scroll-label">流年</div>
        <div class="fortune-scroll">
          <div
            v-for="(nian, idx) in liunianList"
            :key="nian.year"
            class="fortune-item liunian-item"
            :class="{ 'fortune-item-selected': idx === selectedLiunianIndex }"
            @click="selectLiunian(idx)"
          >
            <div class="fortune-item-main">{{ nian.gan }}{{ nian.zhi }}</div>
            <div class="fortune-item-sub">{{ nian.year }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ref, computed } from 'vue'
import { Lunar, EightChar } from 'lunar-javascript'

const props = defineProps({ baziData: Object })
console.log(props);

// 大运流年相关
const dayunInfo = ref({
  startYear: 0,
  startMonth: 0,
  startDay: 0,
  jiaoyun: '逢丁、壬年 寒露后23天 交大运', // 示例
  kongwang: '寅卯空亡（日）', // 示例
  firstAge: 1,
  siling: '丙'
})
const dayunList = ref([])
const liunianList = ref([])
const selectedDayunIndex = ref(1)
const selectedLiunianIndex = ref(0)

function calcDayun() {
  // 用props.baziData生成八字对象
  let d
  if (props.baziData && props.baziData.pillars && props.baziData.pillars.length === 4) {
    // 尝试用四柱八字生成
    try {
      d = EightChar.fromGanZhi(
        props.baziData.pillars[0].tiangan.char + props.baziData.pillars[0].dizhi.char,
        props.baziData.pillars[1].tiangan.char + props.baziData.pillars[1].dizhi.char,
        props.baziData.pillars[2].tiangan.char + props.baziData.pillars[2].dizhi.char,
        props.baziData.pillars[3].tiangan.char + props.baziData.pillars[3].dizhi.char
      )
    } catch (e) {
      d = Lunar.fromDate(new Date()).getEightChar()
    }
  } else {
    d = Lunar.fromDate(new Date()).getEightChar()
  }
  const gender = props.baziData.gender && props.baziData.gender.includes('男') ? 1 : 0
  const yun = d.getYun(gender)
  dayunInfo.value.startYear = yun.getStartYear()
  dayunInfo.value.startMonth = yun.getStartMonth()
  dayunInfo.value.startDay = yun.getStartDay()
  dayunInfo.value.firstAge = yun.getDaYun()[0].getStartAge()
  // dayunInfo.value.siling = ... // 可补充司令等

  // 大运
  dayunList.value = yun.getDaYun().map(daYun => {
    const ganZhi = daYun.getGanZhi()
    return {
      startYear: daYun.getStartYear(),
      startAge: daYun.getStartAge(),
      gan: ganZhi.substr(0, 1),
      zhi: ganZhi.substr(1, 1),
      ganShiShen: '', // 可用d.getDayGan()等推算
      zhiShiShen: ''
    }
  })

  // 流年（以当前选中大运为例）
  const liuNianArr = yun.getDaYun()[selectedDayunIndex.value]?.getLiuNian() || []
  liunianList.value = liuNianArr.map(liuNian => {
    const ganZhi = liuNian.getGanZhi()
    return {
      year: liuNian.getYear(),
      ganzhi: ganZhi,
      gan: ganZhi.substr(0, 1),
      zhi: ganZhi.substr(1, 1),
      ganShiShen: '',
      zhiShiShen: '',
      age: liuNian.getAge()
    }
  })
}

function selectDayun(idx) {
  selectedDayunIndex.value = idx
  calcDayun()
}

function selectLiunian(idx) {
  selectedLiunianIndex.value = idx
}

calcDayun()
</script>

<style>
/* 古风大气配色与布局 */
.bazi-container {
  font-family: "SimSun", "宋体", serif;
  color: #3a2921;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(139, 101, 67, 0.1);
  max-width: 1000px;
  margin: 0 auto;
  animation: fadeIn 0.5s ease;
  background-image: 
    linear-gradient(rgba(249, 243, 233, 0.9), rgba(249, 243, 233, 0.9)),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50 L60 40 L50 30 L40 40 Z' fill='none' stroke='%23d9c7b3' stroke-width='0.5'/%3E%3C/svg%3E");
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 头部样式 */
.bazi-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.bazi-name {
  font-size: 2.5rem;
  color: #8b6543;
  font-weight: bold;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
  text-shadow: 1px 1px 2px rgba(139, 101, 67, 0.2);
}

.bazi-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  width: 80%;
  max-width: 400px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a77c, transparent);
  position: relative;
}

.divider-ornament {
  position: absolute;
  width: 40px;
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='20' viewBox='0 0 40 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0 L30 10 L20 20 L10 10 Z' fill='none' stroke='%23c9a77c' stroke-width='1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
}

.birth-details {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 1.5rem;
}

.birth-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-label {
  color: #8b6543;
  font-size: 1.1rem;
  font-weight: bold;
  background: #f0e6d6;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
}

.detail-value {
  color: #3a2921;
  font-weight: 600;
  font-size: 1.1rem;
}

.gender.male {
  color: #8b4513;
}

.gender.female {
  color: #9c4668;
}

/* 八字表格样式 */
.bazi-chart {
  background: #f5efe5;
  border: 1px solid #d9c7b3;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  box-shadow: 0 2px 10px rgba(139, 101, 67, 0.1);
}

.chart-header {
  display: grid;
  grid-template-columns: 100px repeat(4, 1fr);
  background: #d4b58c;
  color: #3a2921;
}

.header-cell {
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  /* border-right: 1px solid rgba(139, 101, 67, 0.2); */
}

.header-cell:last-child {
  border-right: none;
}


.chart-row {
  display: grid;
  grid-template-columns: 100px repeat(4, 1fr);
  /* border-bottom: 1px solid #d9c7b3; */
}

.chart-row:last-child {
  border-bottom: none;
}

.row-label {
  padding: 1rem 0.5rem;
  text-align: center;
  font-weight: bold;
  color: #8b6543;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;  /* border-right: 1px solid #d9c7b3; */
}
.chart-row:nth-child(odd) .row-label {
  background-color: #f9f5ef;
}
.pillar-cell {
  padding: 1rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-right: 1px solid #d9c7b3; */
  min-height: 60px;
}

.pillar-cell:last-child {
  border-right: none;
}

.chart-row:nth-child(odd) .pillar-cell {
  background-color: #f9f5ef;
}

/* 天干地支样式 */
.tiangan, .dizhi {
  font-size: 2.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.tiangan-relation {
  font-size: 1.1rem;
  color: #8b6543;
  font-weight: bold;
}

/* 五行颜色 */
.wood { color: #08e92f; }
.fire { color: #d30505; }
.earth { color: #8b6d03; }
.metal { color: #ef9106; }
.water { color: #2e83f6; }

/* 藏干样式 */
.canggan-container {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.canggan-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.canggan-char {
  font-weight: bold;
  font-size: 1.2rem;
}

.canggan-relation {
  font-size: 0.9rem;
  color: #8b6543;
}

/* 其他信息样式 */
.xinyun, .zizuo, .kongwang, .nayin {
  font-size: 1.1rem;
  color: #3a2921;
  font-weight: bold;
}

/* 神煞样式 */
.shensha-row .pillar-cell {
  padding: 0.8rem 0.5rem;
}

.shensha-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}

.shensha-item {
  font-size: 0.9rem;
  color: #8b6543;
  text-align: center;
  font-weight: bold;
  background: #f0e6d6;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}

/* 大运流年区域样式 */
.fortune-section {
  background: #f5efe5;
  border: 1px solid #d9c7b3;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(139, 101, 67, 0.1);
}

.fortune-header {
  margin-bottom: 1.5rem;
  position: relative;
}

.fortune-title {
  font-size: 1.5rem;
  color: #8b6543;
  font-weight: bold;
  text-align: center;
  letter-spacing: 0.1em;
}

.fortune-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #c9a77c, transparent);
  margin: 0.8rem auto;
}

.fortune-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f9f5ef;
  border-radius: 6px;
  border: 1px dashed #d9c7b3;
}

.fortune-info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3a2921;
  font-size: 1rem;
}

.info-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  background: #c9a77c;
  color: #fff;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
}

/* 大运流年滚动区域 */
.fortune-scroll-container {
  margin-bottom: 1.5rem;
  position: relative;
}

.fortune-scroll-container:last-child {
  margin-bottom: 0;
}

.fortune-scroll-label {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  background: #8b6543;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px 0 0 4px;
  font-weight: bold;
  z-index: 1;
  width: 2rem;
  text-align: center;
  writing-mode: vertical-lr;
  letter-spacing: 0.1em;
}

.fortune-scroll {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  width: 100%;
  padding-left: 3rem;
}

.fortune-item {
  background: #fff;
  border: 1px solid #d9c7b3;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0;
  margin: 0;
  border-right: none;
}

.fortune-item:last-child {
  border-right: 1px solid #d9c7b3;
}

.fortune-item-selected {
  background: #f0e6d6;
}

.fortune-item-main {
  font-size: 1.1rem;
  color: #3a2921;
  font-weight: bold;
}

.fortune-item-sub {
  font-size: 0.9rem;
  color: #8b6543;
}

.liunian-item {
  padding: 0.4rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .bazi-container {
    padding: 1.5rem 1rem;
  }
  
  .bazi-name {
    font-size: 2rem;
  }
  
  .chart-header, .chart-row {
    grid-template-columns: 80px repeat(4, 1fr);
  }
  
  .header-cell, .row-label, .pillar-cell {
    padding: 0.8rem 0.3rem;
  }
  
  .tiangan, .dizhi {
    font-size: 1.8rem;
  }
  
  .fortune-info {
    padding: 0.8rem;
    gap: 0.8rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .birth-details {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .chart-header, .chart-row {
    grid-template-columns: 70px repeat(4, 1fr);
  }
  
  .tiangan, .dizhi {
    font-size: 1.5rem;
  }
  
  .fortune-scroll-label {
    width: 1.5rem;
    font-size: 0.9rem;
  }
  
  .fortune-scroll {
    padding-left: 2.5rem;
  }
}
</style>
