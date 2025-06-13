<template>
  <div class="tab-content">
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
.tab-content {
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.section-title {
  font-size: 1.5rem;
  color: #314a43;
  margin-bottom: 1.5rem;
  font-weight: bold;
  text-align: center;
}
.analysis-card {
  background: #fff;
  border: 1px solid #e9c46a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.card-title {
  font-size: 1.3rem;
  color: #314a43;
  margin-bottom: 1rem;
  font-weight: bold;
  border-bottom: 1px solid #e9c46a;
  padding-bottom: 0.5rem;
}
.yin-yang-stats {
  margin-bottom: 1rem;
}
.yin-yang-bar {
  display: flex;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.yang-part {
  background: #c77f6a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.yin-part {
  background: #2c3e50;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}
.analysis-content {
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
}
.wuxing-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  background: #f9f5e8;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.summary-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.summary-label {
  color: #666;
  min-width: 80px;
}
.summary-value {
  font-weight: bold;
}
.summary-value.weak { color: #ffc107; }
.summary-value.strong { color: #28a745; }
.summary-value.favorite { color: #c77f6a; }
.shengxiao-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9f5e8;
  border-radius: 8px;
}
.shengxiao-icon {
  font-size: 2.5rem;
}
.shengxiao-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #314a43;
}
.trait-item {
  margin-bottom: 0.5rem;
}
.trait-title {
  font-weight: bold;
  color: #c77f6a;
}
.geju-name, .geju-quality {
  font-size: 1.1rem;
  font-weight: bold;
  color: #c77f6a;
  margin-bottom: 0.5rem;
}
</style> 