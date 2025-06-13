<template>
  <div class="tab-content">
    <div class="chart-header">
      <h2 class="chart-title">{{ baziData.userName }}</h2>
      <div class="birth-info">
        <div class="info-item">
          <span class="info-label">阴历：</span>
          <span class="info-value">{{ baziData.lunarDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">阳历：</span>
          <span class="info-value">{{ baziData.solarDate }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">性别：</span>
          <span class="info-value gender" :class="baziData.genderClass">
            {{ baziData.gender }}
          </span>
        </div>
      </div>
    </div>
    <!-- 主要八字表格 -->
    <div class="bazi-table">
      <div class="table-header">
        <div class="header-cell"></div>
        <div class="header-cell">年柱</div>
        <div class="header-cell">月柱</div>
        <div class="header-cell">日柱</div>
        <div class="header-cell">时柱</div>
      </div>
      <!-- 新增主星行 -->
      <div class="table-row">
        <div class="row-label">主星</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`zhuxing-${index}`">
            <span class="tiangan-relation">{{ pillar.tiangan.relation }}</span>
        </div>
      </div>
      <div class="table-row">
        <div class="row-label">天干</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`tiangan-${index}`">
          <div class="tiangan-content">
            <span class="tiangan" :class="pillar.tiangan.element">{{ pillar.tiangan.char }}</span>
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="row-label">地支</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`dizhi-${index}`">
          <div class="dizhi-content">
            <span class="dizhi" :class="pillar.dizhi.element">{{ pillar.dizhi.char }}</span>
          </div>
        </div>
      </div>
      <!-- 新增藏干行 -->
      <div class="table-row">
        <div class="row-label">藏干</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`canggan-row-${index}`">
          <div class="dizhi-canggan">
            <div v-for="(canggan, cgIndex) in pillar.canggan" :key="`canggan-row-item-${cgIndex}`" class="canggan-item">
              <span class="canggan-char" :class="canggan.element">{{ canggan.char }}</span>
              <span class="canggan-relation">{{ canggan.relation }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="table-row">
        <div class="row-label">星运</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`xinyun-${index}`">
          <span class="xinyun">{{ pillar.xinyun }}</span>
        </div>
      </div>
      <div class="table-row">
        <div class="row-label">自坐</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`zizuo-${index}`">
          <span class="zizuo">{{ pillar.zizuo }}</span>
        </div>
      </div>
      <div class="table-row">
        <div class="row-label">空亡</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`kongwang-${index}`">
          <span class="kongwang">{{ pillar.kongwang }}</span>
        </div>
      </div>
      <div class="table-row">
        <div class="row-label">纳音</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`nayin-${index}`">
          <span class="nayin">{{ pillar.nayin }}</span>
        </div>
      </div>
      <div class="table-row shensha-row">
        <div class="row-label">神煞</div>
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
    <div class="fortune-pan-simple">
      <!-- 头部信息 -->
      <div class="fortune-info-row">
        <div class="fortune-info-item">起运：出生后{{ dayunInfo.startYear }}年{{ dayunInfo.startMonth }}月{{ dayunInfo.startDay }}天{{ dayunInfo.startHour || '' }}时起运</div>
        <div class="fortune-info-item">交运：{{ dayunInfo.jiaoyun }}</div>
        <div class="fortune-info-item">{{ dayunInfo.kongwang }}</div>
        <div class="fortune-info-item">{{ dayunInfo.firstAge }}岁</div>
        <div class="fortune-info-item">司令:{{ dayunInfo.siling }}</div>
      </div>
      <!-- 大运 -->
      <div class="fortune-yun-items fortune-yun-row fortune-scroll-x">
        <div
          v-for="(yun, idx) in dayunList"
          :key="yun.startYear"
          class="fortune-yun-item"
          :class="{ 'fortune-yun-item-selected': idx === selectedDayunIndex }"
          @click="selectDayun(idx)"
        >
          <div class="fortune-yun-main">{{ yun.gan }}{{ yun.zhi }}</div>
          <div class="fortune-yun-sub">{{ yun.startYear }}年/{{ yun.startAge }}岁</div>
        </div>
      </div>
      <!-- 流年 -->
      <div class="fortune-yun-items fortune-yun-row fortune-liunian-row fortune-scroll-x">
        <div
          v-for="(nian, idx) in liunianList"
          :key="nian.year"
          class="fortune-yun-item fortune-liunian-item"
          :class="{ 'fortune-yun-item-selected': idx === selectedLiunianIndex }"
          @click="selectLiunian(idx)"
        >
          <div class="fortune-yun-main">{{ nian.gan }}{{ nian.zhi }}</div>
          <div class="fortune-yun-sub">{{ nian.year }}</div>
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
      zhiShiShen: ''
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
/* 复制自BaziResult.vue的相关样式 */
.tab-content {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.chart-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e9c46a;
}
.chart-title {
  font-size: 2rem;
  color: #314a43;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}
.birth-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.info-label {
  color: #666;
  font-size: 1rem;
}
.info-value {
  color: #314a43;
  font-weight: 600;
  font-size: 1rem;
}
.info-value.gender.male {
  color: #c77f6a;
}
.info-value.gender.female {
  color: #2c3e50;
}
.bazi-table {
  background: #fdfcf6;
  border: 0.5px solid #e9c46a;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
}
.table-header {
  display: grid;
  grid-template-columns: 120px repeat(4, 1fr);
  background: #c77f6a;
  color: #fff;
}
.header-cell {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
}
.header-cell:last-child {
  border-right: none;
}
.table-row {
  display: grid;
  grid-template-columns: 120px repeat(4, 1fr);
}
.bazi-table .table-row:nth-of-type(odd) {
  background-color: #fbf7ef; /* 奇数行背景色 */
}
.row-label {
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  color: #314a43;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.pillar-cell {
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pillar-cell:last-child {
  border-right: none;
}
.tiangan-content, .dizhi-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
}
.tiangan, .dizhi {
  font-size: 2rem;
  font-weight: bold;
}
.tiangan-relation, .canggan-relation {
  font-size: 1rem;
  color: #314a43;
  font-weight: bold;
}
.wood { color: #53c694; }
.fire { color: #d30505; }
.earth { color: #a15c41; }
.metal { color: #ecc058; }
.water { color: #2e83f6; }
.dizhi-canggan {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.5rem;
}
.canggan-item {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}
.canggan-char {
  font-weight: bold;
  font-size: 16px;
}
.nayin, .xinyun, .zizuo, .kongwang {
  font-size: 1rem;
  color: #314a43;
  font-weight: bold;
}
.shensha-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.shensha-item {
  font-size: 0.9rem;
  color: #314a43;
  text-align: center;
  font-weight: bold;
}
.analysis-section {
  background: #fff;
  border: 1px solid #e9c46a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}
.section-title {
  font-size: 1.5rem;
  color: #314a43;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.analysis-text {
  color: #666;
  font-size: 1rem;
}
.shengxiao-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.shengxiao-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.shengxiao-char {
  font-size: 2rem;
  font-weight: bold;
}
.shengxiao-name {
  font-size: 1.5rem;
  font-weight: bold;
}
.shengxiao-element {
  font-size: 0.9rem;
  color: #666;
}
.shengxiao-traits {
  list-style: none;
  padding-left: 0;
}
.trait-item {
  margin-bottom: 0.5rem;
}
.trait-title {
  font-weight: bold;
}
.trait-description {
  margin-left: 1rem;
}
.geju-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.geju-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.geju-name {
  font-size: 1.5rem;
  font-weight: bold;
}
.geju-quality {
  font-size: 0.9rem;
  color: #666;
}
.shensha-row .row-label {
  align-items: flex-start;
  padding-top: 1rem;
}
.shensha-row .pillar-cell {
  align-items: center;
  justify-content: flex-start;
  padding-top: 1rem;
}
.shensha-row .shensha-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.fortune-pan-simple {
  margin: 1.5rem 0 0 0;
  background: #f9f5e8;
  border-radius: 14px;
  box-shadow: 0 2px 12px #e9c46a22;
  padding: 1.2rem 1rem 1.2rem 1rem;
}
.fortune-info-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2.2rem;
  margin-bottom: 0.7rem;
  font-size: 1rem;
  color: #b03a2e;
  align-items: center;
}
.fortune-info-item {
  white-space: nowrap;
}
.fortune-yun-row {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
  overflow-x: auto;
}
.fortune-scroll-x {
  overflow-x: auto !important;
  scrollbar-color: #e9c46a #f9f5e8;
  scrollbar-width: thin;
}
.fortune-scroll-x::-webkit-scrollbar {
  height: 8px;
  background: #f9f5e8;
}
.fortune-scroll-x::-webkit-scrollbar-thumb {
  background: #e9c46a;
  border-radius: 6px;
}
.fortune-scroll-x::-webkit-scrollbar-track {
  background: #f9f5e8;
  border-radius: 6px;
}
.fortune-yun-item {
  background: #fff;
  border: 1.5px solid #e9c46a;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  min-width: 70px;
  text-align: center;
  box-shadow: 0 1px 4px #e9c46a22;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
  font-size: 1.1rem;
}
.fortune-yun-item-selected {
  border-color: #c77f6a;
  box-shadow: 0 2px 8px #c77f6a33;
  background: #fdf6ec;
}
.fortune-yun-main {
  font-size: 1.15rem;
  color: #314a43;
  font-weight: bold;
  margin-bottom: 2px;
}
.fortune-yun-sub {
  font-size: 0.92rem;
  color: #b03a2e;
}
.fortune-liunian-row {
  margin-bottom: 0;
}
.fortune-liunian-item {
  min-width: 60px;
  padding: 0.4rem 0.7rem;
  font-size: 1rem;
}
</style> 