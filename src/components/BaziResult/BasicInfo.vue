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
          <span>{{ baziData.qiyun }}</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">交</span>
          <span>逢癸、戊年 小寒后5天 交大运</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">空</span>
          <span>{{ baziData.pillars[2].kongwang }}空亡（日）</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">岁</span>
          <span>{{ baziData.dayun[selectedDayunIndex]?.getLiuNian?.()[selectedLiunianIndex]?.getAge?.() || 1 }}岁</span>
        </div>
        <div class="fortune-info-item">
          <span class="info-icon">令</span>
          <span>司令:丙</span>
        </div>
      </div>
      
      <!-- 大运 -->
      <div class="fortune-scroll-container">
        <div class="fortune-scroll-label dayun-label">
          <div class="label-text">大运</div>
          <div class="label-ornament"></div>
        </div>
        <div class="fortune-scroll">
          <div
            v-for="(daYun, idx) in baziData.dayun"
            :key="daYun.getStartYear()"
            class="fortune-item dayun-item"
            :class="{ 'fortune-item-selected': idx === selectedDayunIndex }"
            @click="selectDayun(idx)"
          >
            <div class="fortune-item-main">
              <template v-if="daYun.getGanZhi()">
                <span :class="getGanClass(daYun.getGanZhi()[0])">{{ daYun.getGanZhi()[0] }}</span>
                <span :class="getZhiClass(daYun.getGanZhi()[1])">{{ daYun.getGanZhi()[1] }}</span>
              </template>
              <template v-else>
                <span style="font-size:1.1em;color:#b26259;">小运</span>
              </template>
            </div>
            <div class="fortune-item-sub">{{ daYun.getStartYear() }}</div>
            <div class="fortune-item-sub">{{ daYun.getStartAge() }}岁</div>
          </div>
        </div>
      </div>
      
      <!-- 流年 -->
      <div class="fortune-scroll-container">
        <div class="fortune-scroll-label liunian-label">
          <div class="label-text">流年</div>
          <div class="label-ornament"></div>
        </div>
        <div class="fortune-scroll">
          <div
            v-for="(liuNian, idx) in baziData.dayun[selectedDayunIndex].getLiuNian()"
            :key="liuNian.getYear()"
            class="fortune-item liunian-item"
            :class="{ 'fortune-item-selected': idx === selectedLiunianIndex }"
            @click="selectLiunian(idx)"
          >
            <div class="fortune-item-main">
              <span :class="getGanClass(liuNian.getGanZhi()[0])">{{ liuNian.getGanZhi()[0] }}</span>
              <span :class="getZhiClass(liuNian.getGanZhi()[1])">{{ liuNian.getGanZhi()[1] }}</span>
            </div>
            <div class="fortune-item-sub">{{ liuNian.getYear() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ref } from 'vue'

const props = defineProps({ baziData: Object })
// 只保留选中索引和切换逻辑
const selectedDayunIndex = ref(1)
const selectedLiunianIndex = ref(0)

// 五行映射表
const tianElementMap = {
  '甲':'wood','乙':'wood','丙':'fire','丁':'fire','戊':'earth','己':'earth','庚':'metal','辛':'metal','壬':'water','癸':'water'
}
const diElementMap = {
  '子':'water','丑':'earth','寅':'wood','卯':'wood','辰':'earth','巳':'fire','午':'fire','未':'earth','申':'metal','酉':'metal','戌':'earth','亥':'water'
}

function getGanClass(gan) {
  return tianElementMap[gan] || ''
}
function getZhiClass(zhi) {
  return diElementMap[zhi] || ''
}

function selectDayun(idx) {
  selectedDayunIndex.value = idx
  selectedLiunianIndex.value = 0 // 切换大运时重置流年选中
}

function selectLiunian(idx) {
  selectedLiunianIndex.value = idx
}
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
.wood { color: #0fca2e; }
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

/* 大运流年滚动区域 - 美化版 */
.fortune-scroll-container {
  margin-bottom: 1.5rem;
  position: relative;
  border: 1px solid #d9c7b3;
  border-radius: 8px;
  overflow: hidden;
}

.fortune-scroll-container:last-child {
  margin-bottom: 0;
}

/* 美化的标签样式 */
.fortune-scroll-label {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3rem;
  background: linear-gradient(to right, #8b6543, #a17d5d);
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 2px 0 8px rgba(139, 101, 67, 0.2);
}

.label-text {
  writing-mode: vertical-lr;
  letter-spacing: 0.2em;
  font-weight: bold;
  font-size: 1.2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
}

.label-ornament {
  width: 1.5rem;
  height: 1.5rem;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2 L14 6 L18 7 L15 10 L16 14 L12 12 L8 14 L9 10 L6 7 L10 6 Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.8;
}

/* 大运标签特殊样式 */
.dayun-label {
  background: linear-gradient(to right, #8b6543, #a17d5d);
}

/* 流年标签特殊样式 */
.liunian-label {
  background: linear-gradient(to right, #a15c41, #b87a5f);
}

.fortune-scroll {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  width: 100%;
  padding-left: 3rem;
  background: #fff;
}

.fortune-item {
  background: #fff;
  border: 1px solid #d9c7b3;
  padding: 0.8rem 0.5rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0;
  margin: 0;
  border-right: none;
  border-top: none;
  border-bottom: none;
  transition: all 0.3s ease;
  position: relative;
}

.fortune-item:last-child {
  border-right: none;
}

.fortune-item:hover {
  background: #f9f5ef;
}

.fortune-item-selected {
  background: #f0e6d6;
}

.fortune-item-selected::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  width: 80%;
  height: 3px;
  background: #8b6543;
  border-radius: 1.5px;
}

.fortune-item-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  writing-mode: initial;
  text-orientation: initial;
  letter-spacing: 0.1em;
  font-size: 1.2rem;
  color: #3a2921;
  font-weight: bold;
  line-height: 1.2;
  min-height: 2.5em;
}

.fortune-item-sub {
  font-size: 0.9rem;
  color: #8b6543;
  margin-top: 0.3rem;
}

.liunian-item {
  padding: 0.6rem 0.4rem;
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
  
  .fortune-scroll-label {
    width: 2.5rem;
  }
  
  .label-text {
    font-size: 1rem;
  }
  
  .fortune-scroll {
    padding-left: 2.5rem;
  }
  
  .fortune-item-main {
    font-size: 1.1rem;
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
    width: 2rem;
  }
  
  .label-text {
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }
  
  .label-ornament {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  .fortune-scroll {
    padding-left: 2rem;
    grid-template-columns: repeat(5, 1fr);
  }
  
  .fortune-item-main {
    font-size: 1rem;
  }
  
  .fortune-item-sub {
    font-size: 0.8rem;
  }
}
</style>
