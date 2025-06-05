<template>
  <div class="tab-content">
    <div class="chart-header">
      <h2 class="chart-title">八字命盘</h2>
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
          <span class="info-value gender" :class="baziData.gender">
            {{ baziData.gender === 'male' ? '乾造 (男)' : '坤造 (女)' }}
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
        <div class="row-label">纳音</div>
        <div class="pillar-cell" v-for="(pillar, index) in baziData.pillars" :key="`nayin-${index}`">
          <span class="nayin">{{ pillar.nayin }}</span>
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
    <!-- 阴阳分析 -->
    <div class="analysis-section">
      <h3 class="section-title">阴阳分析</h3>
      <p class="analysis-text">{{ baziData.yinYangAnalysis.description }}</p>
    </div>

    <!-- 五行分析 -->
    <div class="analysis-section">
      <h3 class="section-title">五行分析</h3>
      <p class="analysis-text">{{ baziData.wuxingAnalysis }}</p>
    </div>

    <!-- 十神分析 -->
    <div class="analysis-section">
      <h3 class="section-title">十神分析</h3>
      <p class="analysis-text">{{ baziData.shishenAnalysis.description }}</p>
    </div>

    <!-- 生肖信息 -->
    <div class="analysis-section shengxiao-section">
      <h3 class="section-title">生肖信息</h3>
      <div class="shengxiao-header">
          <span class="shengxiao-char">{{ baziData.shengxiao.icon }}</span>
          <span class="shengxiao-name">{{ baziData.shengxiao.name }}</span>
          <!-- 如果需要显示"己土之虎"这样的组合，需要baziData提供或计算 -->
          <span class="shengxiao-element">({{ baziData.rizhu.char }}{{ baziData.rizhu.element }}之{{ baziData.shengxiao.name }})</span>
      </div>
      <ul class="shengxiao-traits">
          <li v-for="(trait, index) in baziData.shengxiao.traits" :key="index" class="trait-item">
              <span class="trait-title">[{{ trait.title }}]</span>
              <span class="trait-description">{{ trait.description }}</span>
          </li>
      </ul>
    </div>

    <!-- 格局分析 -->
    <div class="analysis-section geju-section">
        <h3 class="section-title">格局分析</h3>
        <div class="geju-header">
            <span class="geju-name">{{ baziData.geju.name }}</span>
            <span class="geju-quality">{{ baziData.geju.quality }}</span>
        </div>
        <p class="analysis-text">{{ baziData.geju.description }}</p>
    </div>

  </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({ baziData: Object })
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
</style> 